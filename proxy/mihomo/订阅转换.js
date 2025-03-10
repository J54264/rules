function main(config) {
  // 1. 定义代理组 (proxy-groups)
  config["proxy-groups"] = [
    {
      name: "✈节点选择",
      type: "select",
      proxies: ["♾自动选择", "🔯故障转移", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Static.png",
    },
    {
      name: "🔁手动切换",
      type: "select",
      "include-all": true, // 匹配所有代理 (.*)
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Static.png",
    },
    {
      name: "♾自动选择",
      type: "url-test",
      "include-all": true,
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Urltest.png",
    },
    {
      name: "🔯故障转移",
      type: "fallback",
      "include-all": true,
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Fallback.png",
    },
    {
      name: "🕹Game",
      type: "select",
      proxies: ["🔁手动切换", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Game.png",
    },
    {
      name: "📃Telegram",
      type: "select",
      proxies: ["✈节点选择", "♾自动选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Telegram.png",
    },
    {
      name: "🎞YouTube",
      type: "select",
      proxies: ["✈节点选择", "♾自动选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/YouTube.png",
    },
    {
      name: "🎵Spotify",
      type: "select",
      proxies: ["✈节点选择", "♾自动选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Spotify.png",
    },
    {
      name: "🎞Bahamut",
      type: "select",
      proxies: ["✈节点选择", "♾自动选择", "香港", "台湾", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Bahamut.png",
    },
    {
      name: "🅱Bili",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Bili.png",
    },
    {
      name: "🌏国外",
      type: "select",
      proxies: ["✈节点选择", "♾自动选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Global.png",
    },
    {
      name: "🐼国内",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/CN.png",
    },
    {
      name: "ⓂBing",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Bing.png",
    },
    {
      name: "ⓂOneDrive",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/OneDrive.png",
    },
    {
      name: "Ⓜ微软",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Microsoft.png",
    },
    {
      name: "🍎苹果",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Apple.png",
    },
    {
      name: "🎮游戏",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Game.png",
    },
    {
      name: "🔗直连",
      type: "select",
      proxies: ["DIRECT", "✈节点选择", "♾自动选择"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Direct.png",
    },
    {
      name: "⛔拦截",
      type: "select",
      proxies: ["REJECT", "DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Reject.png",
    },
    {
      name: "⭕其他",
      type: "select",
      proxies: ["✈节点选择", "♾自动选择", "DIRECT", "香港", "台湾", "新加坡", "日本", "美国", "🌐 全球", "🔁手动切换"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Final.png",
    },
    {
      name: "香港",
      type: "url-test",
      filter: "(港|HK|Hong)",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      "include-all": true,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/HK.png",
    },
    {
      name: "日本",
      type: "url-test",
      filter: "(日本|东京|東京都|大阪|泉日|埼玉|[^-]日|JP|Japan)",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      "include-all": true,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/JP.png",
    },
    {
      name: "美国",
      type: "url-test",
      filter: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|SFO|NYC|Oregon|United States)",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 150,
      "include-all": true,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/US.png",
    },
    {
      name: "台湾",
      type: "url-test",
      filter: "(台|新北|彰化|中华民国|TW|Taiwan)",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      "include-all": true,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/TW.png",
    },
    {
      name: "新加坡",
      type: "url-test",
      filter: "(新加坡|坡|狮城|SG|Singapore)",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      "include-all": true,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/SG.png",
    },
    {
      name: "韩国",
      type: "url-test",
      filter: "(KR|Seoul|KOR|서울|首尔|韩|韓)",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      "include-all": true,
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/KR.png",
    },
    {
      name: "🌐 全球",
      type: "select",
      "include-all": true,
      "exclude-filter": "(港|HK|Hong|日本|东京[^-]日|JP|Japan|美|US|SFO|NYC|Oregon|United States|台|中华民国|TW|Taiwan|新加坡|坡|狮城|SG|Singapore)",
      proxies: ["DIRECT"],
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Global.png",
    },
  ];

  // 2. 初始化并定义规则提供者 (rule-providers)
  if (!config["rule-providers"]) {
    config["rule-providers"] = {};
  }
  config["rule-providers"] = Object.assign(config["rule-providers"], {
    Game: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Game.list",
      path: "./ruleset/Game.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Proxy: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Proxy.list",
      path: "./ruleset/Proxy.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Direct: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Direct.list",
      path: "./ruleset/Direct.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Reject: {
      url: "https://raw.githubusercontent.com/J54264/rules/main/proxy/Reject.list",
      path: "./ruleset/Reject.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Adblock4limbo: {
      url: "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Adblock4limbo.list",
      path: "./ruleset/Adblock4limbo.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Lan: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Lan/Lan.list",
      path: "./ruleset/Lan.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    DirectBlackmatrix: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Direct/Direct.list",
      path: "./ruleset/DirectBlackmatrix.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    BanAD: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
      path: "./ruleset/BanAD.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    BanProgramAD: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list",
      path: "./ruleset/BanProgramAD.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    GoogleCN: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/GoogleCN.list",
      path: "./ruleset/GoogleCN.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    SteamCN: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/SteamCN/SteamCN.list",
      path: "./ruleset/SteamCN.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Bing: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Bing.list",
      path: "./ruleset/Bing.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    OneDrive: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/OneDrive.list",
      path: "./ruleset/OneDrive.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Microsoft: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Microsoft.list",
      path: "./ruleset/Microsoft.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Apple: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.list",
      path: "./ruleset/Apple.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Telegram: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.list",
      path: "./ruleset/Telegram.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    GameBlackmatrix: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list",
      path: "./ruleset/GameBlackmatrix.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Spotify: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list",
      path: "./ruleset/Spotify.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    YouTube: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.list",
      path: "./ruleset/YouTube.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Bahamut: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bahamut/Bahamut.list",
      path: "./ruleset/Bahamut.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    BilibiliHMT: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list",
      path: "./ruleset/BilibiliHMT.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ChinaMedia: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaMedia.list",
      path: "./ruleset/ChinaMedia.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ProxyMedia: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list",
      path: "./ruleset/ProxyMedia.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ProxyGFWlist: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list",
      path: "./ruleset/ProxyGFWlist.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ChinaDomain: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list",
      path: "./ruleset/ChinaDomain.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ChinaCompanyIp: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list",
      path: "./ruleset/ChinaCompanyIp.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Download: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list",
      path: "./ruleset/Download.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
  });

  // 3. 定义规则 (rules)
  config["rules"] = [
    "RULE-SET,Game,🕹Game",
    "RULE-SET,Proxy,✈节点选择",
    "RULE-SET,Direct,🔗直连",
    "RULE-SET,Reject,⛔拦截",
    "RULE-SET,Adblock4limbo,⛔拦截",
    "RULE-SET,Lan,🔗直连",
    "RULE-SET,DirectBlackmatrix,🔗直连",
    "RULE-SET,BanAD,⛔拦截",
    "RULE-SET,BanProgramAD,⛔拦截",
    "RULE-SET,GoogleCN,🔗直连",
    "RULE-SET,SteamCN,🔗直连",
    "RULE-SET,Bing,ⓂBing",
    "RULE-SET,OneDrive,ⓂOneDrive",
    "RULE-SET,Microsoft,Ⓜ微软",
    "RULE-SET,Apple,🍎苹果",
    "RULE-SET,Telegram,📃Telegram",
    "RULE-SET,GameBlackmatrix,🎮游戏",
    "RULE-SET,Spotify,🎵Spotify",
    "RULE-SET,YouTube,🎞YouTube",
    "RULE-SET,Bahamut,🎞Bahamut",
    "RULE-SET,BilibiliHMT,🅱Bili",
    "RULE-SET,ChinaMedia,🐼国内",
    "RULE-SET,ProxyMedia,🌏国外",
    "RULE-SET,ProxyGFWlist,✈节点选择",
    "RULE-SET,ChinaDomain,🔗直连",
    "RULE-SET,ChinaCompanyIp,🔗直连",
    "RULE-SET,Download,🔗直连",
    "GEOIP,CN,🔗直连",
    "MATCH,⭕其他",
  ];

  return config;
}
