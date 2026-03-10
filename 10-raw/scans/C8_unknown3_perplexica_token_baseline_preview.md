## C8 未知 #3 预扫：Perplexica token/context 基准（窗口 A 草案）

> 目的：把 C8/C9 中「Perplexica token/context 基准」从“模糊风险描述”变成**可复现、可比较、可治理**的研究提案，供后续一轮 A/B/C 使用。以下内容**不占现有 C8/C9 claim 配额**，仅作为研究设计草稿。

### 1. 现有公开信号小结

- **极端 token 使用与 context 超限**  
  - `ItzCrazyKns/Perplexica` issue `#1031` — 单页摘要尝试使用 \>480k tokens，被后端 32k/48k context 限制拒绝，用户对比 openwebui 仅需 \~6k tokens。  
  - `ItzCrazyKns/Perplexica` issue `#1011` — 普通搜索请求偶发 “request (355k tokens) exceeds the available context size (262k tokens)” 错误。  
  - `ItzCrazyKns/Perplexica` issue `#981` — Ollama provider 的 `num_ctx` 被硬编码为 32k，用户希望根据模型（128k 等）配置 context 上限，并报告在 Quality 模式下频繁超限。  

- **采纳与竞品背景（Farfalle / Turboseek）**  
  - `rashadphz/farfalle` issue `#108` — Docker 安装失败导致难以跑通后端；通过 PR `#111` / `#114` 修复，说明 Farfalle 在 Docker 路径上有过真实摩擦。  
  - `Nutlope/turboseek` issues `#9` / `#13` / `#14` — 分别请求本地 LLM 支持、Docker 支持与 Regenerate 功能，说明 Turboseek 在 local LLM、部署与交互上仍处于补全阶段。  

> 初步结论：Perplexica/Vane 的 token/context 问题是真实存在且与长上下文模型/多步搜索有关，但目前**缺乏与 Farfalle/Turboseek 的同条件对比基准**；也缺少“可接受 token 预算”的工程定义。

### 2. 建议的基准设计（A 视角研究提案）

**2.1 基本问题设定**

- Q1：在**同一页面/同一问题**上，Perplexica、Farfalle、Turboseek 分别消耗多少 token？  
- Q2：在**不同 context 长度与 provider 配置**下，Perplexica 的 token 消耗是否可控（线性/次线性增加），还是会出现离散级别暴涨？  
- Q3：对自托管/本地 LLM 用户而言，什么样的 token 与 context 行为才算“可接受的 P1 采纳条件”？  

**2.2 建议的实验因子**

- **数据维度**  
  - D1：页面类型：新闻长文（例如 Wired/TechCrunch）、技术博客、中等长度 FAQ。  
  - D2：查询模式：Balanced / Quality / Speed 模式（若适用），单轮 vs 多轮跟进。  
  - D3：LLM provider：Ollama（本地 Qwen3.5 系列）、OpenAI/Groq 云模型各 1 种。  

- **配置维度（Perplexica/Vane 特有）**  
  - C1：`num_ctx`：32k / 64k / 128k（与 issue `#981` 中的建议对应）。  
  - C2：是否启用“内容截断/分块”修复（如 PR `#1035` / `#1039` 所描述的 scraped content 限制与管道稳健性修复）。  
  - C3：搜索 provider：SearXNG vs 内置 provider。  

- **对照系统**  
  - Farfalle：在 Docker 修复后的最新版上，使用同一 LLM（如 Qwen3.5 系列）与同一页面。  
  - Turboseek：在当前版本能力允许的范围内，对相同页面进行查询；如功能缺失则记为“能力缺口”而非 token 风险。  

### 3. 目标指标与判定口径

**3.1 指标建议**

- \( \textbf{tokens\_used} \)：每次查询实际发送到 LLM 的 token 数。  
- \( \textbf{ctx\_limit} \)：模型/provider 的理论 context 上限。  
- \( \textbf{ctx\_utilization} = \frac{\text{tokens\_used}}{\text{ctx\_limit}} \)。  
- \( \textbf{failure\_rate} \)：因 exceed\_context\_size 或相关错误导致的失败次数 / 总查询次数。  
- \( \textbf{latency\_p95} \)：回答延迟第 95 百分位。  
- \( \textbf{cost\_per\_100\_queries} \)：按云模型单价折算的估算成本（可选）。  

**3.2 建议的 P1/P2 采纳阈值（草案）**

- **P1 可采纳（Perplexica）**  
  - \( \text{ctx\_utilization\_median} \le 0.4 \) 且 \( \text{ctx\_utilization\_p95} \le 0.7 \)（避免大规模接近极限）。  
  - \( \text{failure\_rate} \le 1\% \)（长上下文错误为偶发，而非常态）。  
  - 在与 Farfalle 的对比中，**在相同 LLM 与页面下 tokens\_used 不超过 Farfalle 的 1.5 倍**。  

- **P2 条件采纳**  
  - 指标略超上述阈值，但有清晰的 roadmap/修复（如 PR `#1035`/`#1039`）并可通过配置（`num_ctx`、截断策略）缓解。  
  - 需在 `adoption_backlog_latest.md` 中附上**配置模板与监控指标**，并要求上线前跑完上述基准实验。  

- **不建议生产采纳（当前默认假设）**  
  - 若在真实实验中，`ctx_utilization_p95` 接近 1 且 `failure_rate` \> 5%，则 Perplexica 在本地长上下文场景下被视为**高成本/高不稳定性**方案，仅适合 PoC。  

### 4. 对 B / C 的建议用法

- **对 Window B（挑战者）**  
  - 在没有上述实验数据前，继续按照 C8/C9 的做法，将 Perplexica 的 token/context 相关陈述标为「能力风险 + 待基准化」，**避免与 Farfalle/Turboseek 的定量对比结论**。  
  - 若未来 A 提供实验结果，B 可重点审阅：  
    - 实验是否同 URL / 同时间 / 同模型。  
    - 是否存在「单一长文 + 极端配置」驱动的 outlier。  

- **对 Window C（决策/治理）**  
  - 在 `repo_master_latest.csv` 中，将 Perplexica 的决策说明更新为：  
    - 「P2：需完成 Perplexica vs Farfalle/Turboseek token/context 基准实验，并满足 P1 阈值后方可进入 P1/生产」。  
  - 在 `adoption_backlog_latest.md` 中，为 Perplexica 单独开一条「C8 未知 #3 — token/context 基准实验」任务，并引用本文件为实验设计草案。  

### 5. 下一步建议（A 侧）

- 若 Orchestrator 在后续 C10/Cx 周期中以「Perplexica token/context 基准」为主题之一，窗口 A 可：  
  1. 将本文件中的实验设计正式化为 claim + evidence 套件（例如 C10-A0x），并补充实际实验脚本与结果链接（可放在 `30-analysis/crawl/` 下）。  
  2. 将 Farfalle/Turboseek 的 token 行为补充为对照 evidence（目前仅有部署/能力缺口类 issue，尚无 token 级别数据）。  
  3. 将最终结论反馈到 `upgrade-risk-matrix.csv` 与 `w5_eval_observability_*` 系列中，统一纳入 eval+治理视角。

