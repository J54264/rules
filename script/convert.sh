#!/bin/bash

# 定义基础 URL 和本地目录
BASE_URL="http://127.0.0.1:8080"
LOCAL_DIR="./proxy"
OUTPUT_DIR="$LOCAL_DIR/providers"

# 切换到 proxy 目录
cd "$LOCAL_DIR" || exit

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 函数：下载并保存文件（强制覆盖）
download_and_save() {
    local output_file=$1
    local url=$2

    if wget -q --no-proxy -O "$output_file" "$url"; then
        echo "Generated and saved $output_file:"
        cat "$output_file"
    else
        echo "Error downloading $url, creating empty file" >&2
        echo "payload: []" > "$output_file"  # 如果下载失败，生成空文件
    fi
}

# 1. 处理所有 .list 文件，转换为 .yaml 并强制保存
find . -maxdepth 1 -name "*.list" | while read -r file; do
    RAW_URL="$BASE_URL/${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)
    BASENAME=$(basename "$file" .list)
    OUTPUT_FILE_DOMAIN_YAML="$OUTPUT_DIR/${BASENAME}_domain.yaml"
    OUTPUT_FILE_IP_YAML="$OUTPUT_DIR/${BASENAME}_ip.yaml"

    # 直接保存，不检查内容是否有效
    download_and_save "$OUTPUT_FILE_DOMAIN_YAML" "http://127.0.0.1:25500/getruleset?type=3&url=$RAW_URL_BASE64"
    download_and_save "$OUTPUT_FILE_IP_YAML" "http://127.0.0.1:25500/getruleset?type=4&url=$RAW_URL_BASE64"
done

# 2. 将 .yaml 文件转换为 .mrs（强制覆盖）
find "$OUTPUT_DIR" -name "*.yaml" | while read -r file; do
    if [[ "$file" == *_domain.yaml ]]; then
        param="domain"
    elif [[ "$file" == *_ip.yaml ]]; then
        param="ipcidr"
    else
        echo "未识别的文件类型: $file"
        continue
    fi
    output_file="${file%.yaml}.mrs"
    /usr/bin/mihomo convert-ruleset "$param" yaml "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "文件 $file 转换成功为 $output_file"
    else
        echo "文件 $file 转换失败，创建空文件"
        touch "$output_file"  # 如果转换失败，生成空文件
    fi
done

# 可选择删除临时文件（如果不需要调试）
# rm -f "$OUTPUT_DIR"/temp_*.yaml 2>/dev/null || true
