---
{
  "title": "Kubernetes：集群安装、应用部署与服务访问",
  "cn": "集群安装、应用部署与服务访问",
  "tags": [
    "Kubernetes",
    "Linux"
  ],
  "category": "云计算与大数据 / Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "1 min",
  "summary": "沿着 Node、Deployment、Service 和存储声明逐层检查应用是否真正可用。",
  "source": "本人 2024 年 Kubernetes 课程实验报告。",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 原始实验范围

课程报告从集群安装和 kubectl 操作开始，继续练习应用部署、Service、Ingress 和基于 NFS 的持久化存储，保留了配置说明与截图。

当时使用 Ubuntu 22.04 与 Kubernetes 1.26。这是历史实验环境，本次没有重新运行，也不建议直接照搬旧版本配置。

## 按层定位问题

节点就绪、Pod 就绪、外部访问成功和存储可用，是不同的检查项：

1. 查看节点与容器运行时是否正常连接。
2. 查看 Deployment 是否产生预期的就绪 Pod。
3. 检查 Service 的选择器和目标工作负载。
4. 验证客户端访问 NodePort 或 Ingress。
5. 检查 PVC 绑定与应用读写。

## 常用检查命令

```bash
# 以下为检查示例，名称需要替换为自己的资源
kubectl get nodes -o wide
kubectl get deployments,pods,services -n <namespace>
kubectl rollout status deployment/<app> -n <namespace>
kubectl describe pod <pod> -n <namespace>
kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp
kubectl get pvc -n <namespace>
```

复现时可以围绕一个应用、一个 namespace 和一组保存的 manifest 逐层验证。先区分“节点未就绪”“工作负载未就绪”和“服务访问不通”，再收集对应的状态与事件。软件源、运行时和网络组件需要按新环境重新检查。
