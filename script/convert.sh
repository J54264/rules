#!/bin/bash

RULES_DIR="./proxy/providers"
BASE_URL="http://127.0.0.1:8080"

process_rule() {
  local file=$1
  local name=$(basename "$file" .list)
  
  # 域名规则
  wget -q -O "${RULES_DIR}/${name}_domain.yaml" \
    "http://127.0.0.1:25500/getruleset?type=3&url=$(echo -n "${BASE_URL}/${file}" | base64)"
  grep -E '^payload:' -v "${RULES_DIR}/${name}_domain.yaml" > "${RULES_DIR}/${name}_domain.txt"
  /usr/bin/mihomo convert-ruleset domain text \
    "${RULES_DIR}/${name}_domain.txt" \
    "${RULES_DIR}/${name}_domain.mrs"

  # IP规则 
  wget -q -O "${RULES_DIR}/${name}_ip.yaml" \
    "http://127.0.0.1:25500/getruleset?type=4&url=$(echo -n "${BASE_URL}/${file}" | base64)"
  grep -E '^payload:' -v "${RULES_DIR}/${name}_ip.yaml" > "${RULES_DIR}/${name}_ip.txt"
  /usr/bin/mihomo convert-ruleset ipcidr text \
    "${RULES_DIR}/${name}_ip.txt" \
    "${RULES_DIR}/${name}_ip.mrs"

  # 清理中间文件
  rm -f "${RULES_DIR}/${name}_domain.yaml" "${RULES_DIR}/${name}_ip.yaml"
}

export -f process_rule
find "${RULES_DIR}" -name "*.list" -exec bash -c 'process_rule "$@"' _ {} \;
