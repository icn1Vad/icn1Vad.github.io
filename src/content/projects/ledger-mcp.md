---
{
  "title": "ChatGPT Ledger MCP",
  "subtitle": "Turn a conversation into a structured personal ledger.",
  "cn": "自然语言记账与 MCP 工具集成",
  "type": "Open-source template",
  "period": "2026",
  "role": "Personal project",
  "tags": [
    "TypeScript",
    "MCP",
    "Supabase"
  ],
  "summary": "A reusable MCP server template for natural-language transactions, storage, and export.",
  "links": [
    [
      "Public template",
      "https://github.com/icn1Vad/chatgpt-ledger-mcp-template"
    ]
  ],
  "order": 2
}
---

## A small, concrete workflow

<p>This template connects a conversational interface with a structured bookkeeping store. Natural-language transaction requests become tool calls, while scripts export the records into CSV, Markdown, and monthly reports.</p>

## The tool surface

<div class="article-table-wrap"><table class="article-table"><thead><tr><th scope="col">Capability</th><th scope="col">Behavior</th></tr></thead><tbody><tr><td>Record</td><td>Add expense, income, or transfer entries.</td></tr><tr><td>Review</td><td>List transactions and produce monthly summaries.</td></tr><tr><td>Correct</td><td>Update a transaction or soft-delete an incorrect entry.</td></tr><tr><td>Export</td><td>Export a date range for local synchronization.</td></tr></tbody></table></div><p>Soft deletion keeps a deletion timestamp and reason while hiding deleted rows from normal queries.</p>

## From language to records

<p>The workflow connects ChatGPT to an MCP server, then to Supabase. Local scripts export the stored transactions and produce reports. The public template includes schema definitions, deployment configuration, and synchronization scripts.</p><div class="code-block"><div class="code-top"><span>text</span><button class="copy-button" type="button" aria-label="Copy text code">Copy</button></div><pre><code>Natural-language request
  → MCP tool call
  → TypeScript server
  → Supabase
  → CSV / Markdown / monthly report</code></pre></div>

## What this repository represents

<p>This is a reusable template, rather than a claim of a hosted service with an uptime guarantee. The private personal ledger is intentionally not linked. Examples use fictional transactions rather than personal financial records.</p>
