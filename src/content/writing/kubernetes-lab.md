---
{
  "title": "Kubernetes: getting from a node to an application",
  "cn": "集群安装、应用部署与服务访问",
  "tags": [
    "Kubernetes",
    "Linux"
  ],
  "category": "Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "1 min",
  "summary": "A course-lab walkthrough of workloads, services, rollout checks, ingress, and persistent storage.",
  "source": "My Kubernetes course report, 2024.",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 01 / The scope of the lab

<p>My course report covers cluster setup and kubectl operations, then progresses to application deployment, service exposure, ingress, and NFS-backed persistent storage. The archive includes my configuration notes and screenshots.</p><p>The original instructions target Kubernetes 1.26 with an Ubuntu 22.04 lab environment. This is a historical record, not a recommendation to deploy that version today.</p>

## 02 / Keep the layers separate

<div class="article-table-wrap"><table class="article-table"><thead><tr><th scope="col">Layer</th><th scope="col">Question to answer</th></tr></thead><tbody><tr><td>Node and runtime</td><td>Is the node ready, and is the container runtime connected?</td></tr><tr><td>Workload</td><td>Has the Deployment created the expected ready Pods?</td></tr><tr><td>Service</td><td>Does service selection match the intended workload?</td></tr><tr><td>External access</td><td>Can a client reach the NodePort or ingress entry point?</td></tr><tr><td>Storage</td><td>Is the claim bound, and can the application use the volume?</td></tr></tbody></table></div><p>A healthy Pod is only one part of the chain. Network exposure and storage need their own checks.</p>

## 03 / A small inspection routine



```bash
# Infrastructure and workloads
kubectl get nodes -o wide
kubectl get deployments,pods,services -n <namespace>

# Rollout and diagnostic context
kubectl rollout status deployment/<app> -n <namespace>
kubectl describe pod <pod> -n <namespace>
kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp

# Persistent storage / 检查存储声明
kubectl get pvc -n <namespace>
```

<p>The names are placeholders. These examples show what to inspect; they do not claim that a cluster is running on this website.</p>

## 04 / Lessons to carry forward

<p>I would organize a repeatable version of the lab around one application, a declared namespace, a saved manifest set, and an explicit check at each layer. That creates a clearer debugging path than a long sequence of installation commands.</p><p lang="zh">复盘：先区分“节点没就绪”“工作负载没就绪”和“服务访问不通”，再收集对应事件与状态。</p><p>Before a current rerun, update the package sources, supported Kubernetes version, runtime integration, and networking components. Historical credentials and campus-specific configuration are excluded.</p>
