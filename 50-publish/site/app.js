const text = {
  en: {
    title: "Owl AI Dev Intel Portal",
    subtitle: "Research navigation for AI ecosystem intelligence",
    quickStartTitle: "Quick Start",
    researchPathsTitle: "Research Paths",
    topicHubsTitle: "Topic Hubs",
    riskIntelTitle: "Risk Intelligence",
    operationsTitle: "Operations and Contribution",
    searchTitle: "Search",
    searchHint: "Filter cards by title, description, and path.",
    searchPlaceholder: "Type keywords...",
    footerText: "All links point to repository files.",
    toggle: "中文",
  },
  zh: {
    title: "Owl AI 开发生态研究导航",
    subtitle: "面向 AI 生态情报的可追踪研究入口",
    quickStartTitle: "快速开始",
    researchPathsTitle: "研究路径",
    topicHubsTitle: "主题导航",
    riskIntelTitle: "风险情报",
    operationsTitle: "运作与协作",
    searchTitle: "搜索",
    searchHint: "按标题、描述和路径筛选卡片。",
    searchPlaceholder: "输入关键词...",
    footerText: "所有链接都指向仓库内文件。",
    toggle: "English",
  },
};

const groups = {
  quickStart: [
    {
      en: ["Master Index", "Single source of navigation and current priorities"],
      zh: ["主入口", "统一导航与当前优先级"],
      href: {
        en: "./content/en/overview.html",
        zh: "./content/zh/overview.html",
      },
    },
    {
      en: ["Researcher Quickstart", "15 and 60 minute onboarding routes"],
      zh: ["研究者快速入口", "15分钟与60分钟上手路径"],
      href: {
        en: "./content/en/research-guide.html",
        zh: "./content/zh/research-guide.html",
      },
    },
    {
      en: ["Public Overview", "External-facing project introduction page"],
      zh: ["对外项目总览", "面向公开展示的项目首页"],
      href: "../PROJECT_OVERVIEW_PUBLIC.md",
    },
  ],
  researchPaths: [
    {
      en: ["Research Trail Map", "Follow fast/deep/reproducible study trails"],
      zh: ["研究路径图", "按速览/深挖/复现路径推进"],
      href: "../../00-index/RESEARCH_TRAIL_MAP.md",
    },
    {
      en: ["7-Day Path", "A complete one-week deep study route"],
      zh: ["7天路线", "一周完成深度研究的完整路径"],
      href: "../../00-index/START_HERE_7_DAY_PATH.md",
    },
    {
      en: ["High-Value Questions", "Question bank for deeper analysis"],
      zh: ["高价值问题库", "驱动深入分析的问题集"],
      href: "../../00-index/HIGH_VALUE_RESEARCH_QUESTIONS.md",
    },
    {
      en: ["3-Window Command Plan", "Minute-level execution for parallel windows"],
      zh: ["三窗口指挥计划", "分钟级并行执行作战方案"],
      href: {
        en: "./content/en/execution-plan.html",
        zh: "./content/zh/execution-plan.html",
      },
    },
  ],
  topicHubs: [
    {
      en: ["Agent", "Framework orchestration and execution patterns"],
      zh: ["Agent", "框架编排与执行模式"],
      href: "../../30-analysis/agent/",
    },
    {
      en: ["MCP", "Protocol ecosystem and contract practices"],
      zh: ["MCP", "协议生态与契约实践"],
      href: "../../30-analysis/mcp/",
    },
    {
      en: ["RAG", "Data stack and retrieval architecture"],
      zh: ["RAG", "数据栈与检索架构"],
      href: "../../30-analysis/rag/",
    },
    {
      en: ["Gateway", "Inference routing and control plane"],
      zh: ["网关", "推理路由与控制平面"],
      href: "../../30-analysis/gateway/",
    },
    {
      en: ["Eval", "Evaluation and observability loops"],
      zh: ["评测", "评测与可观测闭环"],
      href: "../../30-analysis/eval/",
    },
    {
      en: ["Security", "Safety controls and governance"],
      zh: ["安全", "安全控制与治理"],
      href: "../../30-analysis/security/",
    },
  ],
  riskIntel: [
    {
      en: ["Failure Patterns", "Recurring production failure signatures"],
      zh: ["失败模式", "生产环境重复出现的故障特征"],
      href: {
        en: "./content/en/risk-radar.html",
        zh: "./content/zh/risk-radar.html",
      },
    },
    {
      en: ["Upgrade Risk Matrix", "Breaking change and migration risk tracking"],
      zh: ["升级风险矩阵", "破坏性变更与迁移风险跟踪"],
      href: "../../40-insights/risks/upgrade-risk-matrix.md",
    },
    {
      en: ["Risk Register", "Consolidated risk records"],
      zh: ["风险总表", "集中化风险登记清单"],
      href: "../../40-insights/risks/master_risk_register_2026-03-09.csv",
    },
  ],
  operations: [
    {
      en: ["Normalized Master Table", "Latest deduplicated repository map"],
      zh: ["主归一化表", "最新去重仓库主表"],
      href: "../../20-normalized/repo_master_latest.csv",
    },
    {
      en: ["Adoption Backlog", "Current P0/P1/P2 decision list"],
      zh: ["采纳待办", "当前 P0/P1/P2 决策清单"],
      href: "../../40-insights/adoption_backlog_latest.md",
    },
    {
      en: ["Change Log", "Operational updates and structural changes"],
      zh: ["更新日志", "运营更新与结构变更记录"],
      href: "../../00-index/CHANGELOG.md",
    },
  ],
};

let lang = "en";
let currentQuery = "";

function renderList(targetId, items, className = "link-item") {
  const root = document.getElementById(targetId);
  root.innerHTML = "";
  items.forEach((item) => {
    const href = typeof item.href === "string" ? item.href : item.href[lang];
    const a = document.createElement("a");
    a.href = href;
    a.className = className;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.dataset.search = `${item[lang][0]} ${item[lang][1]} ${href}`.toLowerCase();
    a.innerHTML = `${item[lang][0]}<small>${item[lang][1]}</small>`;
    root.appendChild(a);
  });
}

function applyText() {
  Object.keys(text[lang]).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text[lang][id];
  });
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.placeholder = text[lang].searchPlaceholder;
}

function applyFilter() {
  const q = currentQuery.trim().toLowerCase();
  const cards = document.querySelectorAll(".link-item, .hub");
  cards.forEach((card) => {
    if (!q) {
      card.classList.remove("hidden");
      return;
    }
    const hit = (card.dataset.search || "").includes(q);
    card.classList.toggle("hidden", !hit);
  });
}

function render() {
  applyText();
  renderList("quick-start", groups.quickStart);
  renderList("research-paths", groups.researchPaths);
  renderList("topic-hubs", groups.topicHubs, "hub");
  renderList("risk-intel", groups.riskIntel);
  renderList("operations", groups.operations);
  applyFilter();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  lang = lang === "en" ? "zh" : "en";
  render();
});

document.getElementById("search-input").addEventListener("input", (e) => {
  currentQuery = e.target.value || "";
  applyFilter();
});

render();
