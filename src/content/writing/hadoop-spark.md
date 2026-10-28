---
{
  "title": "Hadoop 与 Spark：环境构建和航班数据分析",
  "cn": "大数据环境构建与航班数据分析",
  "tags": [
    "Hadoop",
    "Spark",
    "Python"
  ],
  "category": "云计算与大数据 / Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "2 min",
  "summary": "把 Hadoop 环境实验与 PySpark 航班数据练习串起来，检查类型、聚合与执行计划。",
  "source": "本人 2024 年 Hadoop 实验报告与 spark.py 课程练习。",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 两部分课程实践

这篇笔记对应一份 Hadoop 实验报告和一段独立的 PySpark 航班数据脚本。前者记录环境搭建，后者用数据查询理解过滤、聚合和执行计划。旧版 Word 报告的安装细节仍需单独核对，这里不复述成当前部署指南。

## Spark 脚本做了什么

脚本创建 Spark session、读取航班 CSV、查看出发地和目的地国家、汇总航线数量、筛选国内航线，并用 `explain()` 查看物理执行计划。

原脚本读取 CSV 时没有显式声明字段类型。下面的整理示例先将 `count` 转为整数，并检查转换失败的记录；它没有在本次整理中重新运行。

```python
from pyspark.sql import SparkSession, functions as F

spark = SparkSession.builder.appName("Flight Analysis").getOrCreate()
flights = (
    spark.read.option("header", True).csv("Flights.csv")
    .withColumn("count", F.col("count").cast("long"))
)

# 先检查类型转换失败的数据
flights.filter(F.col("count").isNull()).show()

routes = (
    flights.groupBy("ORIGIN_COUNTRY_NAME", "DEST_COUNTRY_NAME")
    .agg(F.sum("count").alias("total_flights"))
    .orderBy(F.desc("total_flights"))
)
routes.show()
routes.explain()
spark.stop()
```

## 如何解释结果

先核对输入结构、缺失值和 `count` 的含义，再解读航线汇总。执行计划能说明计算结构，但本身不是性能测试。完整复现还需要数据来源、小型样例、运行版本和保存的输出；本文不补写未实际得到的运行结果。
