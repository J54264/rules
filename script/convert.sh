#!/bin/bash

RULES_DIR="proxy/providers"
SUB_URL="http://127.0.0.1:25500"

convert_to_clash() {
  local source=$1
  local file=$2
  local base_name=$(basename "$file" .list)
  
  # 生成 subconverter 参数
  local encoded_url=$(echo -n "https://raw.githubusercontent.com/${source}/${file}" | openssl base64 -A)
  
  # 转换域名规则 (type=3)
  wget -qO "${RULES_DIR}/${source}/${base_name}_Domain.yaml" "${SUB_URL}/getruleset?type=3&url=${encoded_url}"
  
  # 转换 IP 规则 (type=4)
  wget -qO "${RULES_DIR}/${source}/${base_name}_IP.yaml" "${SUB_URL}/getruleset?type=4&url=${encoded_url}"

  # 使用 Mihomo 生成优化格式
  /usr/bin/mihomo convert-ruleset domain text "${RULES_DIR}/${source}/${base_name}_Domain.yaml" "${RULES_DIR}/${source}/${base_name}.mrs"
  /usr/bin/mihomo convert-ruleset ipcidr text "${RULES_DIR}/${source}/${base_name}_IP.yaml" "${RULES_DIR}/${source}/${base_name}_IP.mrs"
}

# 处理 J54264 规则
find "${RULES_DIR}/J54264" -name "*.list" | while read -r file; do
  convert_to_clash "J54264/rules/proxy" "$(basename "$file")"
done

# 处理 limbopro 规则
find "${RULES_DIR}/limbopro" -name "*.list" | while read -r file; do
  convert_to_clash "limbopro/Adblock4limbo/main" "$(basename "$file")"
done

# 清理中间文件
find "${RULES_DIR}" -name "*.yaml" -delete
