function main(config) {
  // 1. 定义代理组 (proxy-groups)
  config["proxy-groups"] = [
    {
      name: "🚀 节点选择"，
      type: "select"，
      proxies: ["♻️ 自动选择"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "🌐 其他"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Static.png"，
    }，
    {
      name: "🔁 手动切换"，
      type: "select"，
      "include-all": true， // 匹配所有代理 (.*)
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Vpn.png"，
    }，
    {
      name: "♻️ 自动选择"，
      type: "url-test"，
      "include-all": true，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 50，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Auto.png"，
    }，
    {
      name: "⭕ 其他"，
      type: "select"，
      proxies: ["🚀 节点选择"， "♻️ 自动选择"， "DIRECT"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Final.png"，
    }，
    {
      name: "🕹 Game"，
      type: "select"，
      proxies: ["🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Roundrobin.png"，
    }，
    {
      name: "📲 Telegram"，
      type: "select"，
      proxies: ["🚀 节点选择"， "♻️ 自动选择"， "🇸🇬 新加坡"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Telegram.png"，
    }，
    {
      name: "🎵 Spotify"，
      type: "select"，
      proxies: ["🚀 节点选择"， "♻️ 自动选择"， "🇸🇬 新加坡"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Spotify.png"，
    }，
    {
      name: "📹 YouTube"，
      type: "select"，
      proxies: ["🚀 节点选择"， "♻️ 自动选择"， "🇸🇬 新加坡"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/YouTube.png"，
    }，
    {
      name: "🎶 TikTok"，
      type: "select"，
      proxies: ["🚀 节点选择"， "♻️ 自动选择"， "🇸🇬 新加坡"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/TikTok.png"，
    }，
    {
      name: "📺 巴哈姆特"，
      type: "select"，
      proxies: ["🇨🇳 台湾"， "🇭🇰 香港"， "🚀 节点选择"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Bahamut.png"，
    }，
    {
      name: "📺 哔哩哔哩"，
      type: "select"，
      proxies: ["DIRECT"， "🇨🇳 台湾"， "🇭🇰 香港"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Bili.png"，
    }，
    {
      name: "🌍 国外媒体"，
      type: "select"，
      proxies: ["🚀 节点选择"， "♻️ 自动选择"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Streaming.png"，
    }，
    {
      name: "🐼 国内媒体"，
      type: "select"，
      proxies: ["DIRECT"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/StreamingCN.png"，
    }，
    {
      name: "Ⓜ️ Bing"，
      type: "select"，
      proxies: ["DIRECT"， "🚀 节点选择"， "🇺🇲 美国"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇰🇷 韩国"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Bing.png"，
    }，
    {
      name: "Ⓜ️ 微软"，
      type: "select"，
      proxies: ["DIRECT"， "🚀 节点选择"， "🇺🇲 美国"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇰🇷 韩国"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Microsoft.png"，
    }，
    {
      name: "🍎 Apple"，
      type: "select"，
      proxies: ["DIRECT"， "🚀 节点选择"， "🇺🇲 美国"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇰🇷 韩国"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Apple.png"，
    }，
    {
      name: "🎮 游戏平台"，
      type: "select"，
      proxies: ["DIRECT"， "🚀 节点选择"， "🇺🇲 美国"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇰🇷 韩国"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/GAME.png"，
    }，
    {
      name: "📍 IP测试"，
      type: "select"，
      proxies: ["♻️ 自动选择"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇺🇲 美国"， "🇰🇷 韩国"， "🔁 手动切换"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Speedtest.png"，
    }，
    {
      name: "📢 谷歌FCM"，
      type: "select"，
      proxies: ["DIRECT"， "🚀 节点选择"， "🇺🇲 美国"， "🇭🇰 香港"， "🇨🇳 台湾"， "🇸🇬 新加坡"， "🇯🇵 日本"， "🇰🇷 韩国"， "🔁 手动切换"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Google.png"，
    }，
    {
      name: "🔗 直连"，
      type: "select"，
      proxies: ["DIRECT"， "🚀 节点选择"， "♻️ 自动选择"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/nanoPort.png"，
    }，
    {
      name: "⛔ 拦截"，
      type: "select"，
      proxies: ["REJECT"， "DIRECT"]，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Adblock.png"，
    }，
    {
      name: "🇭🇰 香港"，
      type: "url-test"，
      filter: "(港|HK|hk|Hong Kong|HongKong|hongkong)"，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 50，
      "include-all": true，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/HK.png"，
    }，
    {
      name: "🇯🇵 日本"，
      type: "url-test"，
      filter: "(日本|东京|東京都|大阪|泉日|埼玉|[^-]日|JP|Japan)"，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 50，
      "include-all": true，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/JP.png"，
    }，
    {
      name: "🇺🇲 美国"，
      type: "url-test"，
      filter: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|SFO|NYC|Oregon|United States)"，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 150，
      "include-all": true，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/US.png"，
    }，
    {
      name: "🇨🇳 台湾"，
      type: "url-test"，
      filter: "(台|新北|彰化|TW|Taiwan)"，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 50，
      "include-all": true，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/TW.png"，
    }，
    {
      name: "🇸🇬 新加坡"，
      type: "url-test"，
      filter: "(新加坡|坡|狮城|SG|Singapore)"，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 50，
      "include-all": true，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/SG.png"，
    }，
    {
      name: "🇰🇷 韩国"，
      type: "url-test"，
      filter: "(KR|Korea|KOR|首尔|韩|韓)"，
      url: "http://www.gstatic.com/generate_204"，
      interval: 300，
      tolerance: 50，
      "include-all": true，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/KR.png"，
    }，
    {
      name: "🌐 其他"，
      type: "select"，
      "include-all": true，
      "exclude-filter": "^(?!.*(港|HK|hk|Hong Kong|HongKong|hongkong|日本|东京|日|JP|Japan|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|SFO|NYC|Oregon|United States|台|中华民国|TW|Taiwan|新加坡|坡|狮城|SG|Singapore|KR|Korea|KOR|首尔|韩|韓)).*$"，
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Global.png"，
    }，
  ];

  // 2. 初始化并定义规则提供者 (rule-providers)
  if (!config["rule-providers"]) {
    config["rule-providers"] = {};
  }
  config["rule-providers"] = Object。assign(config["rule-providers"]， {
    Game: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Game.yaml"，#
      path: "./ruleset/Game.yaml"，
      behavior: "classical"，
      interval: 86400，
      format: "yaml"，
      type: "http"，
    }，
    Proxy: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Proxy.yaml"，#
      path: "./ruleset/Proxy.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Direct: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Direct.yaml"，#
      path: "./ruleset/Direct.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    LocalAreaNetwork: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/LocalAreaNetwork.yaml"，
      path: "./ruleset/LocalAreaNetwork.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    UnBan: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/UnBan.yaml"，
      path: "./ruleset/UnBan.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    拒绝: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Reject.yaml"，#
      path: "./ruleset/Reject.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Adblock4limbo: {
      url: "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Adblock4limbo.yaml"，#
      path: "./ruleset/Adblock4limbo.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    BanAD: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/BanAD.yaml"，
      path: "./ruleset/BanAD.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    BanProgramAD: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/BanProgramAD.yaml"，
      path: "./ruleset/BanProgramAD.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    GoogleFCM: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/GoogleFCM.yaml"，
      path: "./ruleset/GoogleFCM.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    GoogleCN: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/GoogleCN.yaml"，
      path: "./ruleset/GoogleCN.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    SteamCN: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/SteamCN.yaml"，
      path: "./ruleset/SteamCN.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Bing: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml"，
      path: "./ruleset/Bing.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Microsoft: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml"，
      path: "./ruleset/Microsoft.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Apple: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.yaml"，
      path: "./ruleset/Apple.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    TikTok: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.yaml"，
      path: "./ruleset/TikTok.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Telegram: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.yaml"，
      path: "./ruleset/Telegram.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Epic: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Epic/Epic.yaml"，
      path: "./ruleset/Epic.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    EA: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/EA/EA.yaml"，
      path: "./ruleset/EA.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Sony: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Sony/Sony.yaml"，
      path: "./ruleset/Sony.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Steam: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml"，
      path: "./ruleset/Steam.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Nintendo: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Nintendo/Nintendo.yaml"，
      path: "./ruleset/Nintendo.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Spotify: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml"，
      path: "./ruleset/Spotify.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    YouTube: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml"，
      path: "./ruleset/YouTube.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Bahamut: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bahamut/Bahamut.yaml"，
      path: "./ruleset/Bahamut.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    BiliBiliIntl: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBiliIntl/BiliBiliIntl.yaml"，
      path: "./ruleset/BiliBiliIntl.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Bilibili: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBili/BiliBili.yaml"，
      path: "./ruleset/Bilibili.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    ChinaMedia: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia.yaml"，
      path: "./ruleset/ChinaMedia.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    GlobalMedia: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GlobalMedia/GlobalMedia.yaml"，
      path: "./ruleset/GlobalMedia.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    Check: {
      url: "https://raw.githubusercontent.com/liandu2024/clash/main/Check.list"，
      path: "./ruleset/Check.list"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    ProxyBlackmatrix: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy.yaml"，
      path: "./ruleset/ProxyBlackmatrix.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    ChinaDomain: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/ChinaDomain.yaml"，
      path: "./ruleset/ChinaDomain.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    ChinaCompanyIp: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/ChinaCompanyIp.yaml"，
      path: "./ruleset/ChinaCompanyIp.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
    下载: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Download.yaml"，
      path: "./ruleset/Download.yaml"，
      behavior: "classical"，
      interval: 86400，
      type: "http"，
    }，
  });

  // 3. 定义规则 (rules)
  config["rules"] = [
    "RULE-SET,Game,🕹 Game"，
    "RULE-SET,Proxy,🚀 节点选择"，
    "RULE-SET,Direct,🔗 直连"，
    "RULE-SET,LocalAreaNetwork,🔗 直连"，
    "RULE-SET,UnBan,🔗 直连"，
    "RULE-SET,Reject,⛔ 拦截"，
    "RULE-SET,Adblock4limbo,⛔ 拦截"，
    "RULE-SET,BanAD,⛔ 拦截"，
    "RULE-SET,BanProgramAD,⛔ 拦截"，
    "RULE-SET,GoogleFCM,📢 谷歌FCM"，
    "RULE-SET,GoogleCN,🔗 直连"，
    "RULE-SET,SteamCN,🔗 直连"，
    "RULE-SET,Bing,Ⓜ️ Bing"，
    "RULE-SET,Microsoft,Ⓜ️ 微软"，
    "RULE-SET,Apple,🍎 Apple"，
    "RULE-SET,TikTok,🎶 TikTok"，
    "RULE-SET,Telegram,📲 Telegram"，
    "RULE-SET,Epic,🎮 游戏平台"，
    "RULE-SET,EA,🎮 游戏平台"，
    "RULE-SET,Sony,🎮 游戏平台"，
    "RULE-SET,Steam,🎮 游戏平台"，
    "RULE-SET,Nintendo,🎮 游戏平台"，
    "RULE-SET,Spotify,🎵 Spotify"，
    "RULE-SET,YouTube,📹 YouTube"，
    "RULE-SET,Bahamut,📺 巴哈姆特"，
    "RULE-SET,BiliBiliIntl,📺 哔哩哔哩"，
    "RULE-SET,Bilibili,📺 哔哩哔哩"，
    "RULE-SET,ChinaMedia,🐼 国内媒体"，
    "RULE-SET,GlobalMedia,🌍 国外媒体"，
    "RULE-SET,Check,📍 IP测试"，
    "RULE-SET,ProxyBlackmatrix,🚀 节点选择"，
    "RULE-SET,ChinaDomain,🔗 直连"，
    "RULE-SET,ChinaCompanyIp,🔗 直连"，
    "RULE-SET,Download,🔗 直连"，
    "GEOIP,CN,🔗 直连"，
    "MATCH,⭕ 其他"，
  ];

  return config;
}
