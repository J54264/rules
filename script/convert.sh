#!/bin/bash

# Step 1: Define base URL and directories
BASE_URL="http://127.0.0.1:8080/proxy"  # URL for accessing .list files via local server
LOCAL_DIR="./proxy"                    # Directory containing .list files
PROVIDERS_DIR="./tree/main/proxy/providers"  # Output directory for generated files

# Step 2: Create the providers directory if it doesn’t exist
mkdir -p "$PROVIDERS_DIR"

# Step 3: Copy Adblock4limbo.list to the proxy directory for processing
cp ../Adblock4limbo/Adblock4limbo.list "$LOCAL_DIR/"

# Step 4: Change to the proxy directory
cd "$LOCAL_DIR" || exit

# Step 5: Function to download and check converted files
download_and_check() {
    local output_file=$1
    local expected_md5=$2
    local url=$3
    local output_final_file=$4

    if wget -q --no-proxy -O "$output_file" "$url"; then
        if [ "$(md5sum "$output_file" | awk '{print $1}')" = "$expected_md5" ]; then
            rm -f "$output_file"  # Remove if it matches the "empty" MD5
        else
            mv "$output_file" "$output_final_file"  # Move to final location
        fi
    else
        echo "Error downloading $url" >&2
    fi
}

# Step 6: Convert .list files to .yaml for domain and IP
find . -name "*.list" | while read -r file; do
    # Remove './' prefix and construct the local URL
    RAW_URL="$BASE_URL/${file#./}"
    RAW_URL_BASE64=$(echo -n "$RAW_URL" | openssl base64 -A)

    # Define output file paths in providers directory
    filename=$(basename "$file" .list)
    OUTPUT_FILE_DOMAIN_YAML="$PROVIDERS_DIR/${filename}_Domain.yaml"
    OUTPUT_FILE_IP_YAML="$PROVIDERS_DIR/${filename}_IP.yaml"

    # Convert to domain.yaml (type=3) and ip.yaml (type=4)
    download_and_check "temp_domain.yaml" "0c04407cd072968894bd80a426572b13" \
        "http://127.0.0.1:25500/getruleset?type=3&url=$RAW_URL_BASE64" "$OUTPUT_FILE_DOMAIN_YAML"
    download_and_check "temp_ip.yaml" "3d6eaeec428ed84741b4045f4b85eee3" \
        "http://127.0.0.1:25500/getruleset?type=4&url=$RAW_URL_BASE64" "$OUTPUT_FILE_IP_YAML"
done

# Step 7: Convert .yaml files to .mrs for domain rules
find "$PROVIDERS_DIR" -name "*_Domain.yaml" | while read -r file; do
    filename=$(basename "$file" .yaml)
    output_file="$PROVIDERS_DIR/${filename}.mrs"
    /usr/bin/mihomo convert-ruleset domain yaml "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "Converted $file to $output_file successfully"
    else
        echo "Failed to convert $file"
    fi
done

# Step 8: Convert .yaml files to .mrs for IP rules
find "$PROVIDERS_DIR" -name "*_IP.yaml" | while read -r file; do
    filename=$(basename "$file" .yaml)
    output_file="$PROVIDERS_DIR/${filename}.mrs"
    /usr/bin/mihomo convert-ruleset ipcidr yaml "$file" "$output_file"
    if [[ $? -eq 0 ]]; then
        echo "Converted $file to $output_file successfully"
    else
        echo "Failed to convert $file"
    fi
done

# Step 9: Clean up temporary files
rm -f "$LOCAL_DIR/Adblock4limbo.list"  # Remove copied Adblock4limbo.list
