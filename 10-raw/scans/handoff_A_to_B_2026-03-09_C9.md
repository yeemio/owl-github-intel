# Handoff A -> B (2026-03-09 C9)

Theme: 全轨道（agent / mcp / rag / gateway / eval / security）+ C8 digest「下轮 5 个未知」至少 2 条深挖

## A Window Hard Metric Status

- source_count ≥ 45: PASS（46 evidence rows，≥45 唯一 URL）
- hard_evidence_count ≥ 15 (issue/PR/release): PASS（38）
- claims ≥ 18（六轨 ≥12 + C8 未知 2 条各 ≥3）: PASS（18）

## 六轨与 C8 未知对应关系（标清）

### 六轨（12 条 claim）

| 轨道 | claim_id | 简要主张 |
|------|----------|----------|
| agent | C9-A01 | OpenAI Agents handoff/to_input_list 及非 OpenAI 兼容性断裂 |
| agent | C9-A02 | LangGraph checkpoint 反序列化与 Redis 持久化问题 |
| mcp | C9-A03 | MCP 工具返回类型 array vs string 破坏 Claude Code（-32602） |
| mcp | C9-A04 | MCP Memory JSON 解析错误导致全工具链失败 |
| rag | C9-A05 | Qdrant 升级与快照恢复内部错误与 CVE 信号 |
| rag | C9-A06 | Qdrant 存储变体与副本恢复行为 |
| gateway | C9-A07 | LiteLLM proxy 迁移/schema 静默 500 与 Langfuse 中断 |
| gateway | C9-A08 | Bedrock/Vertex 翻译与计费错误 |
| eval | C9-A09 | DeepEval 小版本破坏 Gemini/Azure 与指标迁移 |
| eval | C9-A10 | Langfuse 评测与自托管 LLM-as-judge/trace 稳定性 |
| security | C9-A11 | NeMo Guardrails 主版本 streaming/reasoning 迁移成本 |
| security | C9-A12 | Guardrails 规则与运行时行为需配置版本与回放 |

### C8 未知深挖（6 条 claim）

| C8 未知 | claim_id | 简要主张 |
|---------|----------|----------|
| **#2 Jina vs Firecrawl parity** | C9-A13 | Jina 对 Thales 等失败、Firecrawl 成功，需同条件公平基准 |
| **#2 Jina vs Firecrawl parity** | C9-A14 | 缺乏同 URL 同时刻对照与可复现用例，影响 fallback 策略 |
| **#2 Jina vs Firecrawl parity** | C9-A15 | 公平基准需明确 URL/超时/请求头/时间窗口以支撑 P2→P1 |
| **#4 Firecrawl adoption signal** | C9-A16 | 功能存在（Skill/MCP/CLI）与采纳证据应区分以定优先级 |
| **#4 Firecrawl adoption signal** | C9-A17 | 采纳信号需第三方引用/集成文档而非仅 star 或 release 列表 |
| **#4 Firecrawl adoption signal** | C9-A18 | 区分功能存在与采纳证据后可细化 P2→P1 触发条件 |

## Claims To Challenge（全 18 条）

- **C9-A01**–**C9-A12**：见上表六轨。
- **C9-A13**–**C9-A15**：C8 未知 #2（Jina vs Firecrawl parity）。
- **C9-A16**–**C9-A18**：C8 未知 #4（Firecrawl adoption signal）。

## Priority Attack Targets

1. **C9-A02**：LangGraph 多条 issue（7066/7094/6987/7017）是否均属「checkpoint/持久化」同一类，还是混杂不同根因。
2. **C9-A13 / C9-A14**：Jina #1229 仅用户自述「Firecrawl 可成功」是否构成同条件对比；是否有可复现用例或官方回应。
3. **C9-A16 / C9-A17**：「功能存在 vs 采纳证据」是否可操作定义（如第三方文档清单、集成数阈值）。
4. **C9-A12**：依赖 upgrade-risk-matrix 与单条 issue #1700 是否足以支撑「需配置版本与回放验证」的普遍结论。

## Open Questions for B

- 六轨中哪些 claim 存在跨轨依赖（如 gateway + eval 同时升级导致 Langfuse 断连），是否应标为复合风险？
- C8 未知 #2 的「公平基准」若由 B 给出可操作定义（如：同一 URL、同一日、同一 timeout/header），是否纳入 C 的 P2→P1 触发条件？
- Firecrawl「采纳证据」除 star 与 release 外，B 是否可补充第三方博客/集成清单 URL 或建议 C 在 backlog 中增加「采纳证据类型」字段？

## A 自评（窗口 A 自由发挥）

- **六轨**：C9-A01～A12 均至少有 2 条来源；agent/gateway/eval 略多，便于 B 打「同因/多因」。
- **C8 未知 #2/#4**：各 3 条 claim，证据含 issue + 内部 digest/backlog；B 可重点打「同条件对比」「可操作定义」。
- **薄弱**：C9-A12 仅 1 条 issue + 1 条 internal；C9-A04 仅 1 条 issue。若 B 要求「每 claim ≥2 独立外部源」，这两条可标 partial 或建议 C 不提升。
- **建议 B 优先**：C9-A02（LangGraph 多 issue 是否同因）、C9-A13/A14（Jina vs Firecrawl 是否同条件）、C9-A16/A17（采纳信号是否可操作）。

## C8 未知 #5 预扫（crawl coverage）

- 已写 **`10-raw/scans/C8_unknown5_crawl_coverage_preview.md`**：ForgeCrawl（无公开 issue）、RagRabbit（1 issue）、Crawl2RAG（已归档）预扫与下轮纳入建议、P2 映射建议。不占 C9 claim 配额，供 C10 或 B 参考。

## Evidence and Scan References

- Evidence file: `D:\ai\owl-github-intel\10-raw\scans\evidence_2026-03-09_A_C9.csv`
- Scan file: `D:\ai\owl-github-intel\10-raw\scans\scan_2026-03-09_A_C9.md`
- C8 未知 #5 预扫: `10-raw/scans/C8_unknown5_crawl_coverage_preview.md`
