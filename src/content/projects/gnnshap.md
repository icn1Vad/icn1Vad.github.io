---
{
  "title": "GNNShap-to-Cancer",
  "subtitle": "Adapting graph explanations to cancer-related gene data.",
  "cn": "本科毕业论文 · 图神经网络可解释性",
  "type": "Undergraduate thesis",
  "period": "2025",
  "role": "Data adaptation & explanation experiments",
  "tags": [
    "PyTorch",
    "PyG",
    "Graph ML"
  ],
  "summary": "Dataset adaptation and Shapley-based explanation experiments, with attention to practical constraints.",
  "links": [
    [
      "Research adaptation",
      "https://github.com/icn1Vad/GNNShap-to-Cancer"
    ]
  ],
  "order": 3
}
---

## Research context

<p>My undergraduate thesis explored GNNShap-based explanations for cancer-related gene-set prediction. This work builds on existing graph-learning and explanation methods; GNNShap itself is the upstream authors’ research.</p>

## Data and model alignment

<p>I adapted CGMega / MCF7 graph data for PyTorch and PyG workflows, including label conversion, training and validation masks, and model-input alignment. These steps make the relationship between graph data, prediction targets, and the explanation pipeline explicit.</p>

## Explanation experiments

<p>I ran GNNShap sampling and weighted least-squares explanation experiments, producing adaptation code, explanation results, and run logs. The investigation included sampling scale, GPU-memory limits, and solver failures.</p><p lang="zh">实验记录需要保留限制与异常，避免把“得到解释结果”直接等同于“证明解释可靠”。</p>

## Attribution & limitations

<p>The repository documentation distinguishes the upstream GNNShap method from my dataset adaptations and thesis experiments. The upstream README and citation are retained, with a separate adaptation guide explaining the available artifacts and reproduction limits.</p><p>No publication, medical utility, or performance improvement is claimed here.</p>
