---
{
  "title": "Hadoop & Spark: from environment to data queries",
  "cn": "大数据环境构建与航班数据分析",
  "tags": [
    "Hadoop",
    "Spark",
    "Python"
  ],
  "category": "Cloud Computing & Big Data",
  "year": "2024",
  "readTime": "2 min",
  "summary": "Notes on the Hadoop lab and a PySpark flight-data exercise: filtering, aggregation, and query plans.",
  "source": "My Hadoop lab report and spark.py course exercise, 2024.",
  "published": "2026-10-28",
  "status": "archive-note"
}
---

## 01 / Two connected exercises

<p>My course archive contains a Hadoop lab report and a separate PySpark exercise on flight records. This draft connects the environment work with a concrete data-processing task, while keeping the two sources distinct.</p><p>The older Hadoop report uses the legacy Word format. Its detailed installation procedure still needs conversion and a separate editorial pass, so it is not reproduced as a current setup guide here.</p>

## 02 / The Spark exercise

<p>The saved script creates a Spark session, loads a flight CSV, lists distinct origin and destination countries, aggregates route counts, filters domestic routes, and inspects the physical execution plan.</p><div class="article-table-wrap"><table class="article-table"><thead><tr><th scope="col">Operation</th><th scope="col">Purpose</th></tr></thead><tbody><tr><td>select + distinct</td><td>Inspect unique countries.</td></tr><tr><td>groupBy + sum</td><td>Aggregate counts by origin and destination.</td></tr><tr><td>filter</td><td>Select domestic flights or a destination country.</td></tr><tr><td>orderBy</td><td>Sort records or aggregated routes.</td></tr><tr><td>explain</td><td>Inspect the physical execution plan.</td></tr></tbody></table></div>

## 03 / A typed version of the data query

<p>The archived script reads CSV fields without an explicit schema. The following edited example makes the count column numeric before aggregation. It is an editorial improvement, and has not been executed against the original dataset for this article.</p>

```python
from pyspark.sql import SparkSession, functions as F

spark = SparkSession.builder.appName("Flight Analysis").getOrCreate()

flights = (
    spark.read.option("header", True).csv("Flights.csv")
    .withColumn("count", F.col("count").cast("long"))
)

# Inspect invalid counts / 先检查类型转换失败的数据
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



## 04 / Verification before interpretation

<p>Check the input schema, missing values, and meaning of the count column before interpreting route totals. A query plan explains the execution structure; it is not, by itself, a benchmark.</p><p>The source CSV is not bundled for this article, and the snippet’s output is not fabricated. A reproducible release needs the dataset source, a small fixture, runtime versions, and saved results.</p>
