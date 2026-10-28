---
{
  "title": "OpenStack：云平台搭建与服务验证",
  "cn": "云平台环境搭建与服务验证",
  "tags": [
    "OpenStack",
    "Linux"
  ],
  "category": "云计算与大数据 / Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "1 min",
  "summary": "理解认证、镜像、资源调度、计算和网络服务之间的依赖关系。",
  "source": "本人基于 Ubuntu 22.04 的 OpenStack 课程实验报告，2024 年。",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 从服务配置理解云平台

原始报告记录了 Ubuntu 22.04 环境中的 OpenStack 课程实验，包含 Keystone、Glance 和 Placement 配置。这篇笔记侧重服务职责与验证顺序；本次没有重新运行环境，也不直接复用旧配置文件。

## 一台虚拟机涉及哪些服务

<div class="article-table-wrap"><table class="article-table"><thead><tr><th>服务</th><th>职责</th></tr></thead><tbody><tr><td>Keystone</td><td>身份认证与服务访问。</td></tr><tr><td>Glance</td><td>提供实例使用的镜像。</td></tr><tr><td>Placement</td><td>记录资源清单与分配信息。</td></tr><tr><td>Nova</td><td>管理计算资源与实例生命周期。</td></tr><tr><td>Neutron</td><td>为实例提供网络连接。</td></tr></tbody></table></div>

这个表用于解释工作流，不代表原实验已验证全部服务组合。

## 控制面检查

```bash
# 需要先配置自己的 OpenStack 客户端凭据
openstack service list
openstack endpoint list
openstack image list
openstack hypervisor list
openstack network list
openstack server list
```

先检查认证、服务注册与 endpoint，再确认镜像、计算资源和网络是否可用。随后记录实例创建请求与状态，最后验证客户端访问。完整的启动和连通性结论仍需对照原始截图，不能仅凭控制台安装成功就认定整个平台验证完成。
