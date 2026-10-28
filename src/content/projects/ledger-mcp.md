---
{
  "title": "ChatGPT Ledger MCP",
  "subtitle": "自然语言记账与 MCP 工具集成",
  "cn": "自然语言记账与 MCP 工具集成",
  "type": "个人开源模板",
  "period": "2026 年",
  "role": "个人工具设计与实现",
  "tags": [
    "TypeScript",
    "MCP",
    "Supabase"
  ],
  "summary": "将自然语言记账请求转成 MCP 工具调用，支持记录查询、修正与本地导出。",
  "links": [
    [
      "开源模板",
      "https://github.com/icn1Vad/chatgpt-ledger-mcp-template"
    ]
  ],
  "order": 2
}
---

## Workflow <span class="heading-cn">从对话到账目</span>

这个模板把 ChatGPT、TypeScript MCP 服务和 Supabase 连接起来：用户用自然语言描述收支，工具将请求写入结构化账本，本地脚本再导出 CSV、Markdown 和月度报告。

## Tool Surface <span class="heading-cn">工具能力</span>

<div class="article-table-wrap"><table class="article-table"><thead><tr><th>能力</th><th>处理方式</th></tr></thead><tbody><tr><td>记录</td><td>新增支出、收入和转账。</td></tr><tr><td>查询</td><td>查看交易记录与月度汇总。</td></tr><tr><td>修正</td><td>更新记录，或用软删除隐藏错误条目。</td></tr><tr><td>导出</td><td>按日期范围同步到本地文件。</td></tr></tbody></table></div>

软删除保留删除时间与原因，普通查询默认隐藏已删除条目。公开模板包含数据结构、部署配置和同步脚本。

## Scope <span class="heading-cn">使用范围</span>

这是可复用的工具模板。示例使用虚构交易，私人账本和真实财务记录保持私有。仓库说明包含工具契约和运行方法，便于在自己的环境中检查与扩展。
