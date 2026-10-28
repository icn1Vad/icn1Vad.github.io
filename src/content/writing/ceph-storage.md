---
{
  "title": "Ceph：分布式存储集群搭建与使用",
  "cn": "分布式存储集群搭建与使用",
  "tags": [
    "Ceph",
    "Linux"
  ],
  "category": "云计算与大数据 / Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "2 min",
  "summary": "从独立客户端验证 RBD、CephFS 与 RGW，区分集群状态和实际读写结果。",
  "source": "本人兰州大学 2024 年云计算课程实验报告。",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## Lab Setup <span class="heading-cn">环境与目标</span>

我搭建了三节点 Ceph 集群，并通过独立客户端练习块、文件和对象存储。原始环境为 Ubuntu 22.04 Server，每台集群节点与客户端均配置 4 vCPU、16 GiB 内存。

这篇笔记整理自当年的报告与截图，保留原始实验背景。本次没有重新运行环境，也不将历史配置作为今天的安装建议。

## Client Verification <span class="heading-cn">客户端验证</span>

先确认主机名、网络和集群状态，再分别配置 RBD、CephFS 与 RGW。三个接口共享集群，但客户端配置与验证过程不同。

```bash
# 查看集群与存储资源，命令为检查示例
ceph -s
ceph health detail
ceph osd tree
ceph osd pool ls
ceph fs ls
rbd ls --pool <your-pool>
```

原报告记录了块镜像访问、快照与克隆、CephFS 客户端访问、对象文件传输，以及 iSCSI multipath 和 NFS-Ganesha 扩展练习。其中快照操作与对象传输有成功记录；这些证据只覆盖对应实验流程。

## Review <span class="heading-cn">复盘</span>

集群面板显示正常只是起点。更完整的检查应从客户端写入已知内容，再读回比较；数据一致性、故障恢复和性能需要独立实验。后续复现也需要重新核对软件版本、部署工具和安全配置。
