#!/bin/bash

# 定义基础 URL 和本地目录
BASE_URL="http://127.0.0.1:8080"
LOCAL_DIR="./proxy"
OUTPUT_DIR="$LOCAL_DIR/providers"

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
        echo "Generated $output_file:"
        cat "$output_file"
        # 检查文件是否包含有效规则
        if grep -qE "(DOMAIN|IP-CIDR)" "$output_file"; then
            cp "$output_file" "$output_yaml_file"
            echo "Saved to $output_yaml_file"
        else
            echo "Skipping $output_yaml_file: no valid domains or IPs found"
        fi
    else
        echo "Error downloading $url" >&2
    fi
}

# 1. 处理所有 .list 文件，转换为 .yaml
find . -maxdepth 1 -name "*.list" | while read -r file; do
    RAW_URL="$BASE_URL/${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)
    BASENAME=$(basename "$file" .list)
    OUTPUT_FILE_DOMAIN_YAML="$OUTPUT_DIR/${BASENAME}_domain.yaml"
    OUTPUT_FILE_IP_YAML="$OUTPUT_DIR/${BASENAME}_ip.yaml"

    download_and_check "temp_domain_$BASENAME.yaml" "http://127.0.0.1:25500/getruleset?type=3&url=$RAW_URL_BASE64" "$OUTPUT_FILE_DOMAIN_YAML"
    download_and_check "temp_ip_$BASENAME.yaml" "http://127.0.0.1:25500/getruleset?type=4&url=$RAW_URL_BASE64" "$OUTPUT_FILE_IP_YAML"
done

# 2. 将 .yaml 文件转换为 .mrs
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
        echo "文件 $file 转换失败"
        rm -f "$output_file"
    fi
done

# 保留临时文件供调试
echo "Temporary files retained for debugging:"
ls -l temp_*.yaml || echo "No temporary files"
