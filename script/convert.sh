#!/bin/bash

RULES_DIR="./proxy"
OUTPUT_DIR="./proxy/providers"
SUB_URL="http://127.0.0.1:25500"

process_rule() {
  local input_file=$1
  local base_name=$(basename "$input_file" .list)

  # 生成域名规则 (保留YAML)
  domain_url=$(echo -n "http://localhost:8080/${input_file}" | base64)
  wget -q -O "${OUTPUT_DIR}/${base_name}_domain.yaml" \
    "${SUB_URL}/getruleset?type=3&url=${domain_url}"
  
  # 从YAML提取TXT
  grep -Ev '^(payload:|#)' "${OUTPUT_DIR}/${base_name}_domain.yaml" \
    | sed 's/^ *- //' > "${OUTPUT_DIR}/${base_name}_domain.txt"
  
  # 生成MRS
  /usr/bin/mihomo convert-ruleset domain text \
    "${OUTPUT_DIR}/${base_name}_domain.txt" \
    "${OUTPUT_DIR}/${base_name}_domain.mrs"

  # 生成IP规则 (保留YAML)
  ipcidr_url=$(echo -n "http://localhost:8080/${input_file}" | base64)
  wget -q -O "${OUTPUT_DIR}/${base_name}_ip.yaml" \
    "${SUB_URL}/getruleset?type=4&url=${ipcidr_url}"
  
  # 从YAML提取TXT
  grep -Ev '^(payload:|#)' "${OUTPUT_DIR}/${base_name}_ip.yaml" \
    | sed 's/^ *- //' > "${OUTPUT_DIR}/${base_name}_ip.txt"
  
  # 生成MRS
  /usr/bin/mihomo convert-ruleset ipcidr text \
    "${OUTPUT_DIR}/${base_name}_ip.txt" \
    "${OUTPUT_DIR}/${base_name}_ip.mrs"
}

export -f process_rule
find "${RULES_DIR}" -name "*.list" -exec bash -c 'process_rule "$@"' _ {} \;
