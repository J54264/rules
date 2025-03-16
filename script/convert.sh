#!/bin/bash

WORKDIR="./workdir"
OUTPUT_DIR="./output"
SUB_URL="http://127.0.0.1:25500"

# 创建输出目录
mkdir -p $OUTPUT_DIR

# 处理所有.list文件
for list_file in $WORKDIR/*.list; do
    filename=$(basename "$list_file" .list)
    encoded_url=$(echo -n "http://localhost:8080/$filename.list" | base64 -w0)

    # 生成Domain规则
    curl -sS "$SUB_URL/getruleset?type=3&url=$encoded_url" \
        -o "$OUTPUT_DIR/${filename}_domain.yaml"
    
    # 生成IP规则
    curl -sS "$SUB_URL/getruleset?type=4&url=$encoded_url" \
        -o "$OUTPUT_DIR/${filename}_ip.yaml"

    # 转换为MRS格式
    mihomo convert-ruleset domain file \
        "$OUTPUT_DIR/${filename}_domain.yaml" \
        "$OUTPUT_DIR/${filename}_domain.mrs"
    
    mihomo convert-ruleset ipcidr file \
        "$OUTPUT_DIR/${filename}_ip.yaml" \
        "$OUTPUT_DIR/${filename}_ip.mrs"
done

# 清理临时文件
rm -f $WORKDIR/*.list
