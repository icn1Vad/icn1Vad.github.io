---
{
  "title": "ProofSpace",
  "subtitle": "Enterprise document review, built around human verification.",
  "cn": "企业合同与制度审查 Agent",
  "type": "Core project",
  "period": "2026 — ongoing",
  "role": "Co-founder · Product design & full-stack development",
  "tags": [
    "Next.js",
    "Java",
    "Python",
    "AI Agents"
  ],
  "summary": "Product flows, web interfaces, and asynchronous agent execution for contract and policy review.",
  "links": [
    [
      "Frontend repository",
      "https://github.com/icn1Vad/frontframe"
    ],
    [
      "Agent framework",
      "https://github.com/icn1Vad/Aituge-framework"
    ]
  ],
  "order": 1
}
---

## The problem

<p>Enterprise and legal teams need to review confidential contracts against policies and rules. A useful review interface needs to connect each finding back to the document, support human judgment, and handle tasks that take longer than a normal web request.</p><p>ProofSpace is a working product prototype with a private-deployment approach. I work on product design, customer communication, interactive frontend demos, and full-stack development as part of a three-person technical team.</p>

## My contribution

<ul><li><strong>Product flows:</strong> translate document-review scenarios into policy ingestion, entity identification, rule selection, risk review, follow-up questions, and report export.</li><li><strong>Web interactions:</strong> build React / Next.js pages and task lists, integrate server-side pagination, and organize request deduplication, session-scoped caching, background refresh, and failure recovery.</li><li><strong>System integration:</strong> contribute to the boundaries between web interactions, Java business services, and the Python agent framework.</li><li><strong>Product communication:</strong> explain review workflows and demonstrate interactive frontend prototypes to prospective enterprise users.</li></ul>

## A task-based architecture

<p>The system separates web interaction, business state, and agent execution. Task, Run, Event, and Artifact describe the work, its execution attempts, progress, and outputs. Workers execute the longer-running steps.</p><p>The team uses chapter windows, a contract intermediate representation, and source-offset mappings to connect findings with their evidence. Versioned memory and summaries retain task intent, state, and pending work across agent interactions.</p>

## Designing for review

<p>The product flow connects document and risk panels, source highlighting, proposed changes, citation-based questions, and report export. My focus is helping users move from an AI-generated finding to something they can inspect and act on.</p><p lang="zh">设计重点：审查结果需要能定位原文、支持修改对照，并让用户保留最终判断。</p>

## Status & boundaries

<p>The project has a runnable prototype and continues toward modular delivery. This case study describes the product and architecture; it does not claim production adoption, customer counts, benchmark gains, or independent ownership of the team’s entire system.</p><p>Only existing public repositories are linked here. Customer documents, private service code, and real business data are excluded.</p>

The public frontend snapshot defaults to mock adapters. Its documented HTTP ports and interface contracts describe integration boundaries; the two linked repositories do not constitute the complete private deployment.
