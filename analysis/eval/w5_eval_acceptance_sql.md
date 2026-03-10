# W5 Acceptance SQL Templates

日期：2026-03-09  
用途：P0 验收时统一口径，按窗口验证质量/成本/安全/回灌闭环

## 1) Trace 完整率（P0-02）

```sql
SELECT
  DATE_TRUNC('hour', event_time) AS hour_bucket,
  COUNT(*) AS total_events,
  SUM(CASE WHEN trace_id IS NOT NULL THEN 1 ELSE 0 END) AS traced_events,
  ROUND(SUM(CASE WHEN trace_id IS NOT NULL THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 4) AS trace_coverage
FROM prod_events
WHERE event_time >= NOW() - INTERVAL '24 hours'
GROUP BY 1
ORDER BY 1 DESC;
```

目标：`trace_coverage >= 0.99`

## 2) PR Gate 质量阈值（P0-06）

```sql
SELECT
  build_id,
  AVG(task_success) AS task_success_rate,
  AVG(factuality_score) AS factuality_score,
  AVG(prompt_injection_pass::int) AS prompt_injection_pass_rate,
  SUM(cost_usd) / NULLIF(SUM(task_success::int), 0) AS cost_per_success
FROM eval_results
WHERE build_id = :build_id
GROUP BY build_id;
```

目标：
- `task_success_rate >= 0.90`
- `factuality_score >= 0.85`
- `prompt_injection_pass_rate >= 0.95`

## 3) 生产错误率与延迟（P0-07, P0-09）

```sql
SELECT
  DATE_TRUNC('minute', event_time) AS minute_bucket,
  COUNT(*) AS total_requests,
  SUM(CASE WHEN is_error THEN 1 ELSE 0 END) AS error_requests,
  ROUND(SUM(CASE WHEN is_error THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 4) AS error_rate,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency_ms
FROM runtime_requests
WHERE event_time >= NOW() - INTERVAL '30 minutes'
GROUP BY 1
ORDER BY 1 DESC;
```

告警/回滚：
- `error_rate > 0.03`（5 分钟窗口）
- `p95_latency_ms > baseline * 1.20`（连续 2 窗口）

## 4) 成本效率（P0-13）

```sql
SELECT
  DATE_TRUNC('hour', event_time) AS hour_bucket,
  SUM(cost_usd) AS total_cost_usd,
  SUM(CASE WHEN task_success THEN 1 ELSE 0 END) AS success_count,
  SUM(cost_usd) / NULLIF(SUM(CASE WHEN task_success THEN 1 ELSE 0 END), 0) AS cost_per_success,
  SUM(input_tokens + output_tokens) / NULLIF(SUM(CASE WHEN task_success THEN 1 ELSE 0 END), 0) AS token_per_success
FROM runtime_requests
WHERE event_time >= NOW() - INTERVAL '7 days'
GROUP BY 1
ORDER BY 1 DESC;
```

目标：`cost_per_success <= baseline * 1.10`

## 5) Sev-1/2 回灌 SLA（P0-10）

```sql
SELECT
  DATE_TRUNC('week', incident_time) AS week_bucket,
  COUNT(*) AS total_sev12,
  SUM(CASE WHEN backfilled_at <= incident_time + INTERVAL '24 hours' THEN 1 ELSE 0 END) AS backfilled_24h,
  ROUND(SUM(CASE WHEN backfilled_at <= incident_time + INTERVAL '24 hours' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 4) AS backfill_sla_rate
FROM incidents
WHERE severity IN ('sev1', 'sev2')
  AND incident_time >= NOW() - INTERVAL '8 weeks'
GROUP BY 1
ORDER BY 1 DESC;
```

目标：`backfill_sla_rate >= 0.95`
