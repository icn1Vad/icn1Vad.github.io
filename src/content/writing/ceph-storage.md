---
{
  "title": "One Ceph cluster, three storage interfaces",
  "cn": "分布式存储集群搭建与使用",
  "tags": [
    "Ceph",
    "Linux"
  ],
  "category": "Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "2 min",
  "summary": "A three-node lab, a separate client, and checks across block, file, and object storage.",
  "source": "My Lanzhou University cloud-computing lab report, 2024.",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 01 / What I built

<p>In this lab, I built a Ceph cluster and exercised its block, file, and object-storage interfaces from a separate client. The point was to understand how different storage interfaces sit on top of the same distributed cluster.</p><p>These notes revisit my own 2024 course report. The report includes configuration steps and screenshots of the experiments. This article summarizes the workflow rather than presenting an updated installation recipe.</p><div class="storage-diagram" role="img" aria-label="Three Ceph cluster nodes serve block, file and object storage to a separate client"><div class="diagram-cluster"><div class="diagram-machine">node 01<small>cluster node</small></div><div class="diagram-machine">node 02<small>cluster node</small></div><div class="diagram-machine">node 03<small>cluster node</small></div></div><div class="diagram-bus"></div><div class="diagram-services"><span>RBD · block</span><span>CephFS · file</span><span>RGW · object</span></div><p class="diagram-caption">ONE CLUSTER / THREE STORAGE INTERFACES / A SEPARATE CLIENT</p></div>

## 02 / The lab environment

<div class="article-table-wrap"><table class="article-table"><thead><tr><th scope="col">Component</th><th scope="col">Original lab setup</th></tr></thead><tbody><tr><td>Cluster</td><td>Three Ubuntu 22.04 Server nodes</td></tr><tr><td>Resources</td><td>4 vCPUs and 16 GiB memory per cluster node</td></tr><tr><td>Client</td><td>A separate Ubuntu 22.04 node with the same resources</td></tr><tr><td>Interfaces</td><td>RBD block storage, CephFS, and RGW object storage</td></tr></tbody></table></div><p>The layout separates cluster operation from client-side access. Node names in this article are generic. Original addresses, access keys, and administrative credentials are omitted.</p>

## 03 / From cluster to client

<ol><li><strong>Prepare the nodes.</strong> Establish consistent hostnames and network reachability before configuring the storage services.</li><li><strong>Bring up the cluster.</strong> Use the cluster’s own status and service views to inspect the deployment.</li><li><strong>Configure the storage interfaces.</strong> Treat block, file, and object access as separate client workflows.</li><li><strong>Validate from the client.</strong> Perform client-side operations rather than relying on the management dashboard alone.</li></ol>

```bash
# Inspect cluster state / 查看集群状态
ceph -s
ceph health detail

# Inspect storage resources
ceph osd tree
ceph osd pool ls
ceph fs ls
rbd ls --pool <your-pool>
```

<p>These commands are inspection examples, not captured output from a new run. Resource names depend on the configured lab.</p>

## 04 / What the report records

<div class="article-table-wrap"><table class="article-table"><thead><tr><th scope="col">Interface</th><th scope="col">Recorded exercise</th></tr></thead><tbody><tr><td>Block / RBD</td><td>Client access to block images, snapshots, and clone-related operations.</td></tr><tr><td>File / CephFS</td><td>A separate file-storage client-access exercise.</td></tr><tr><td>Object / RGW</td><td>File transfer between the client and the object-storage service.</td></tr><tr><td>Extensions</td><td>iSCSI multipath and NFS-Ganesha configuration exercises.</td></tr></tbody></table></div><p>The report records successful snapshot operations and object transfers. That is evidence for those lab workflows. It does not establish production availability, fault tolerance under failure, or performance at scale.</p>

## 05 / What I would check next

<p>A useful follow-up would pair each interface with a small, repeatable verification script: write known content, read it back, and compare it. Recovery and fault-injection tests should be treated as separate experiments.</p><p lang="zh">复盘：集群面板显示正常只是起点。客户端读写、数据一致性与故障恢复需要各自的验证记录。</p><p>The original lab predates this website. Installation packages, deployment tools, and security defaults need a fresh check before reproducing it on a current system.</p>
