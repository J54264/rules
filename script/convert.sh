#!/bin/bash

# 定义基础 URL 和本地目录
BASE_URL="http://127.0.0.1:8080"
LOCAL_DIR="./proxy"
OUTPUT_DIR="./proxy/providers"

# 切换到 proxy 目录
cd "$LOCAL_DIR" || exit

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 函数：下载并检查文件
download_and_check() {
    local output_file=$1
    local url=$2
    local output_yaml_file=$3

    # 下载文件
    if wget -q --no-proxy -O "$output_file" "$url"; then
        # 直接复制到目标 YAML 文件
        cp "$output_file" "$output_yaml_file"
    else
        echo "Error downloading $url" >&2
    fi
}

# 1. 处理所有 .list 文件，转换为 .yaml
find . -maxdepth 1 -name "*.list" | while read -r file; do
    # 去掉前缀 "./" 并生成对应的本地 URL
    RAW_URL="$BASE_URL/${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)

    # 生成输出文件路径
    BASENAME=$(basename "$file" .list)
    OUTPUT_FILE_DOMAIN_YAML="$OUTPUT_DIR/${BASENAME}_domain.yaml"
    OUTPUT_FILE_IP_YAML="$OUTPUT_DIR/${BASENAME}_ip.yaml"

    # 下载并转换域名规则 (type=3 表示域名)
    download_and_check "temp_domain.yaml" "http://127.0.0.1:25500/getruleset?type=3&url=$RAW_URL_BASE64" "$OUTPUT_FILE_DOMAIN_YAML"

    # 下载并转换 IP 规则 (type=4 表示 IP)
    download_and_check "temp_ip.yaml" "http://127.0.0.1:25500/getruleset?type=4&url=$RAW_URL_BASE64" "$OUTPUT_FILE_IP_YAML"

    # 清理临时文件
    rm -f temp_domain.yaml temp_ip.yaml
done

# 2. 将 .yaml 文件转换为 .mrs
find "$OUTPUT_DIR" -name "*.yaml" | while read -r file; do
    # 根据文件名判断类型
    if [[ "$file" == *_domain.yaml ]]; then
        param="domain"
    elif [[ "$file" == *_ip.yaml ]]; then
        param="ipcidr"
    else
        echo "未识别的文件类型: $file"
        continue
    fi

    # 生成输出 .mrs 文件路径
    output_file="${file%.yaml}.mrs"

    # 使用 mihomo 转换
    /usr/bin/mihomo convert-ruleset "$param" yaml "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "文件 $file 转换成功为 $output_file"
    else
        echo "文件 $file 转换失败"
    fi
done
