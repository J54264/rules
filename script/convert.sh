#!/bin/bash

BASE_URL="http://127.0.0.1:8080/proxy"  # 本地服务路径，避免与 “Clash” 等特定词汇耦合
LOCAL_DIR="./temp/rules/proxy"  # 临时工作目录

cd "$LOCAL_DIR" || exit

# 函数：下载并检查文件，避免重复生成
download_and_check() {
    local output_file=$1
    local expected_md5=$2
    local url=$3
    local output_text_file=$4

    if wget -q --no-proxy -O "$output_file" "$url"; then
        if [ "$(md5sum "$output_file" | awk '{print $1}')" = "$expected_md5" ]; then
            rm -f "$output_file"  # 如果是无变化的占位文件，删除
        else
            cp "$output_file" "$output_text_file"  # 有变化则保留为 .txt
        fi
    else
        echo "Error downloading $url" >&2
    fi
}

# 步骤 1：将 .list 文件转换为 .yaml 文件（domain 和 ip）
find . -name "*.list" | while read -r file; do
    # 去掉 "./" 前缀并生成 URL
    RAW_URL="$BASE_URL/${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)

    # 生成输出文件路径，去除 “OCD” 词汇
    OUTPUT_FILE_DOMAIN_YAML="${file%.list}_Domain.yaml"
    OUTPUT_FILE_DOMAIN_TEXT="${file%.list}_Domain.txt"
    OUTPUT_FILE_IP_YAML="${file%.list}_IP.yaml"
    OUTPUT_FILE_IP_TEXT="${file%.list}_IP.txt"

    # 下载并转换规则，type=3 为 domain，type=4 为 ip
    download_and_check "$OUTPUT_FILE_DOMAIN_YAML" "0c04407cd072968894bd80a426572b13" "http://127.0.0.1:25500/getruleset?type=3&url=$RAW_URL_BASE64" "$OUTPUT_FILE_DOMAIN_TEXT"
    download_and_check "$OUTPUT_FILE_IP_YAML" "3d6eaeec428ed84741b4045f4b85eee3" "http://127.0.0.1:25500/getruleset?type=4&url=$RAW_URL_BASE64" "$OUTPUT_FILE_IP_TEXT"
done

# 步骤 2：将 .txt 文件转换为 .mrs 文件
find . -name "*_Domain.txt" -o -name "*_IP.txt" | while read -r file; do
    # 移除首行 “payload” （如果存在）
    first_line=$(head -n 1 "$file")
    if [[ "$first_line" == *"payload"* ]]; then
        sed -i '1d' "$file"
    fi
    # 清理单引号、减号和空格
    sed -i "s/'//g; s/-//g; s/[[:space:]]//g" "$file"

    file_dir=$(dirname "$file")
    filename=$(basename "$file" .txt)

    # 判断规则类型
    if [[ "$filename" == *_Domain ]]; then
        param="domain"
    elif [[ "$filename" == *_IP ]]; then
        param="ipcidr"
    else
        echo "Unrecognized file type: $file"
        continue
    fi

    # 生成 .mrs 文件
    output_file="$file_dir/$filename.mrs"
    /usr/bin/mihomo convert-ruleset "$param" text "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "Converted $file to $output_file successfully"
    else
        echo "Failed to convert $file"
    fi
done
