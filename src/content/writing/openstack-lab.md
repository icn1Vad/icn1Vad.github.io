---
{
  "title": "OpenStack: tracing the path to a virtual machine",
  "cn": "云平台环境搭建与服务验证",
  "tags": [
    "OpenStack",
    "Linux"
  ],
  "category": "Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "1 min",
  "summary": "Understanding the roles of identity, images, resource placement, compute, and networking.",
  "source": "My Ubuntu 22.04 OpenStack course report, 2024.",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 01 / A platform made of services

<p>My OpenStack report records an Ubuntu 22.04 course lab and service-by-service configuration. This draft focuses on how those services fit together, rather than republishing a long configuration file.</p><p>The archive includes Keystone, Glance, and Placement setup material. Installation commands and original configuration values still need a version-specific audit before a modern rerun.</p>

## 02 / Follow the responsibilities

<div class="article-table-wrap"><table class="article-table"><thead><tr><th scope="col">Service</th><th scope="col">Role in a VM workflow</th></tr></thead><tbody><tr><td>Keystone</td><td>Identity and service access.</td></tr><tr><td>Glance</td><td>Images used to create instances.</td></tr><tr><td>Placement</td><td>Resource inventory and allocation information.</td></tr><tr><td>Nova</td><td>Compute and instance lifecycle.</td></tr><tr><td>Neutron</td><td>Networking for the instance.</td></tr></tbody></table></div><p>This service map is explanatory context. A service appearing in the map is not a claim that every possible integration or failure mode was tested in the lab.</p>

## 03 / Inspect the control-plane view



```bash
# Requires your own configured OpenStack client credentials
openstack service list
openstack endpoint list
openstack image list
openstack hypervisor list
openstack network list
openstack server list
```

<p>Begin with service registration and endpoints, then inspect the resources needed by the instance workflow. An installed dashboard alone does not verify that an instance can boot or communicate.</p>

## 04 / A useful verification chain

<ol><li>Confirm authenticated client access and the relevant service endpoints.</li><li>Confirm an image, an available compute resource, and an intended network.</li><li>Record the instance request and inspect its resulting state.</li><li>Test client access and preserve the observations with the environment version.</li></ol><p>This is the verification structure for the edited article. The complete boot-and-connect evidence should be checked against the archived screenshots before publication.</p><p lang="zh">整理方向：按服务依赖和验证结果组织内容，避免把安装完成直接写成整个平台验证完成。</p>
