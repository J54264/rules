#!/bin/bash

# 第1步：定义基本 URL 和目录
BASE_URL="http://127.0.0.1:8080/"  # 本地服务器 URL
LOCAL_DIR="./proxy"                # 包含 .list 文件的目录，相对于 ./rules
PROVIDERS_DIR="./tree/main/proxy/providers"  # 输出目录，相对于 ./rules

# 第2步：如果 providers 目录不存在，则创建
mkdir -p "$PROVIDERS_DIR"

# 第3步：将 Adblock4limbo.list 复制到 proxy 目录以便处理
cp ../Adblock4limbo/Adblock4limbo.list "$LOCAL_DIR/"

# 第4步：切换到 proxy 目录
cd "$LOCAL_DIR" || { echo "无法切换到 $LOCAL_DIR"; exit 1; }

# 第5步：下载并检查转换文件的函数
download_and_check() {
    local output_file=$1
    local expected_md5=$2
    local url=$3
    local output_final_file=$4

    if wget -q --no-proxy -O "$output_file" "$url"; then
        if [ "$(md5sum "$output_file" | awk '{print $1}')" = "$expected_md5" ]; then
            rm -f "$output_file"  # 如果 MD5 匹配 "空" 文件，则删除
        else
            mv "$output_file" "$output_final_file"  # 移动到最终位置
        fi
    else
        echo "下载 $url 时出错" >&2
    fi
}

# 第6步：将 .list 文件转换为 domain 和 IP 的 .yaml 文件
find . -name "*.list" | while read -r file; do
    # 去掉 './' 前缀并构建本地 URL
    RAW_URL="$BASE_URL${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)

    # 定义输出文件路径
    filename=$(basename "$file" .list)
    OUTPUT_FILE_DOMAIN_YAML="$PROVIDERS_DIR/${filename}_Domain.yaml"
    OUTPUT_FILE_IP_YAML="$PROVIDERS_DIR/${filename}_IP.yaml"

    # 转换为 domain.yaml (type=3) 和 ip.yaml (type=4)
    download_and_check "temp_domain.yaml" "0c04407cd072968894bd80a426572b13" \
        "http://127.0.0.1:25500/getruleset?type=3&url=$RAW_URL_BASE64" "$OUTPUT_FILE_DOMAIN_YAML"
    download_and_check "temp_ip.yaml" "3d6eaeec428ed84741b4045f4b85eee3" \
        "http://127.0.0.1:25500/getruleset?type=4&url=$RAW_URL_BASE64" "$OUTPUT_FILE_IP_YAML"
done

# 第7步：将 domain .yaml 文件转换为 .mrs
find "$PROVIDERS_DIR" -name "*_Domain.yaml" | while read -r file; do
    filename=$(basename "$file" .yaml)
    output_file="$PROVIDERS_DIR/${filename}.mrs"
    /usr/bin/mihomo convert-ruleset domain yaml "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "成功将 $file 转换为 $output_file"
    else
        echo "转换 $file 失败"
    fi
done

# 第8步：将 IP .yaml 文件转换为 .mrs
find "$PROVIDERS_DIR" -name "*_IP.yaml" | while read -r file; do
    filename=$(basename "$file" .yaml)
    output_file="$PROVIDERS_DIR/${filename}.mrs"
    /usr/bin/mihomo convert-ruleset ipcidr yaml "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "成功将 $file 转换为 $output_file"
    else
        echo "转换 $file 失败"
    fi
done

# 第9步：清理临时文件
rm -f "$LOCAL_DIR/Adblock4limbo.list"  # 删除复制的 Adblock4limbo.list
