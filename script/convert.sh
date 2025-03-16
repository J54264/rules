#!/bin/bash

BASE_URL="http://127.0.0.1:25690"  # 使用正确端口 [[8]]
LOCAL_DIR="./temp/rules/proxy"
cd "$LOCAL_DIR" || exit

download_and_check() {
    local output_file="$1"
    local url="$2"
    # 移除MD5校验，保留所有文件 [[4]][[7]]
    if wget -q --no-proxy -O "$output_file" "$url"; then
        cp "$output_file" "${output_file%.yaml}.txt"  # 直接生成.txt文件
    else
        echo "Error downloading $url" >&2
        exit 1
    fi
}

# 步骤1：转换.list为.yaml和.txt
find . -name "*.list" | while read -r file; do
    RAW_URL="$BASE_URL/${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)

    # 生成域名规则（type=3）
    DOMAIN_YAML="${file%.list}_Domain.yaml"
    DOMAIN_URL="$BASE_URL/getruleset?type=3&url=$RAW_URL_BASE64"
    download_and_check "$DOMAIN_YAML" "$DOMAIN_URL"

    # 生成IP规则（type=4）
    IP_YAML="${file%.list}_IP.yaml"
    IP_URL="$BASE_URL/getruleset?type=4&url=$RAW_URL_BASE64"
    download_and_check "$IP_YAML" "$IP_URL"
done

# 步骤2：转换.txt为.mrs
find . -name "*_Domain.txt" -o -name "*_IP.txt" | while read -r file; do
    # 清理文件
    sed -i '1d;s/[[:space:]'\''-]//g' "$file"  # 删除首行和特殊字符 [[5]]

    # 判断规则类型
    if [[ "$file" == *_Domain.txt ]]; then
        param="domain"
    elif [[ "$file" == *_IP.txt ]]; then
        param="ipcidr"
    else
        echo "Unrecognized file: $file" >&2
        continue
    fi

    # 转换为.mrs文件
    output_file="${file%.txt}.mrs"
    /usr/bin/mihomo convert-ruleset "$param" text "$file" "$output_file" || {
        echo "Failed to convert $file" >&2
        exit 1
    }
done
