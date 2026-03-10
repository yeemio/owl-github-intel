import {
  ensureControlBar,
  ensureStatusNode,
  setStatus,
  renderLinks,
} from "./ui.js";

const STORAGE_LANG_KEY = "owl.portal.lang";

const DEFAULT_TEXT = {
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
    filterTheme: "Theme",
    filterTag: "Tag",
    filterAllThemes: "All themes",
    filterAllTags: "All tags",
    statusLoading: "Loading portal data...",
    statusError: "Render failed. Please refresh or check script errors.",
    statusEmpty: "No results. Try clearing filters or changing keywords.",
    statusReady: "Showing {count} cards.",
    clearFilters: "Clear filters",
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
    filterTheme: "主题",
    filterTag: "标签",
    filterAllThemes: "全部主题",
    filterAllTags: "全部标签",
    statusLoading: "正在加载门户数据...",
    statusError: "渲染失败，请刷新页面或检查脚本错误。",
    statusEmpty: "没有匹配结果，请清空筛选或更换关键词。",
    statusReady: "当前显示 {count} 个卡片。",
    clearFilters: "清空筛选",
    footerText: "所有链接都指向仓库内文件。",
    toggle: "English",
  },
};

const SEARCH_DEBOUNCE_MS = 180;

const DEFAULT_GROUPS = {
  quickStart: [
    {
      id: "master-index",
      theme: "overview",
      tags: ["index", "navigation", "priority"],
      en: ["Master Index", "Single source of navigation and current priorities"],
      zh: ["主入口", "统一导航与当前优先级"],
      href: { en: "./content/en/overview.html", zh: "./content/zh/overview.html" },
    },
    {
      id: "researcher-quickstart",
      theme: "overview",
      tags: ["onboarding", "workflow", "research"],
      en: ["Researcher Quickstart", "15 and 60 minute onboarding routes"],
      zh: ["研究者快速入口", "15分钟与60分钟上手路径"],
      href: {
        en: "./content/en/research-guide.html",
        zh: "./content/zh/research-guide.html",
      },
    },
    {
      id: "public-overview",
      theme: "publish",
      tags: ["public", "overview"],
      en: ["Public Overview", "External-facing project introduction page"],
      zh: ["对外项目总览", "面向公开展示的项目首页"],
      href: "../PROJECT_OVERVIEW_PUBLIC.md",
    },
  ],
  researchPaths: [
    {
      id: "research-trail-map",
      theme: "research",
      tags: ["path", "deep-dive", "reproducible"],
      en: ["Research Trail Map", "Follow fast/deep/reproducible study trails"],
      zh: ["研究路径图", "按速览/深挖/复现路径推进"],
      href: "../../00-index/RESEARCH_TRAIL_MAP.md",
    },
    {
      id: "7-day-path",
      theme: "research",
      tags: ["planning", "roadmap"],
      en: ["7-Day Path", "A complete one-week deep study route"],
      zh: ["7天路线", "一周完成深度研究的完整路径"],
      href: "../../00-index/START_HERE_7_DAY_PATH.md",
    },
    {
      id: "high-value-questions",
      theme: "research",
      tags: ["questions", "analysis"],
      en: ["High-Value Questions", "Question bank for deeper analysis"],
      zh: ["高价值问题库", "驱动深入分析的问题集"],
      href: "../../00-index/HIGH_VALUE_RESEARCH_QUESTIONS.md",
    },
    {
      id: "3-window-plan",
      theme: "operations",
      tags: ["execution", "command-center", "parallel"],
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
      id: "agent-hub",
      theme: "agent",
      tags: ["framework", "orchestration"],
      en: ["Agent", "Framework orchestration and execution patterns"],
      zh: ["Agent", "框架编排与执行模式"],
      href: { en: "./content/en/topic-agent.html", zh: "./content/zh/topic-agent.html" },
    },
    {
      id: "mcp-hub",
      theme: "mcp",
      tags: ["protocol", "contract"],
      en: ["MCP", "Protocol ecosystem and contract practices"],
      zh: ["MCP", "协议生态与契约实践"],
      href: { en: "./content/en/topic-mcp.html", zh: "./content/zh/topic-mcp.html" },
    },
    {
      id: "rag-hub",
      theme: "rag",
      tags: ["retrieval", "data-stack"],
      en: ["RAG", "Data stack and retrieval architecture"],
      zh: ["RAG", "数据栈与检索架构"],
      href: { en: "./content/en/topic-rag.html", zh: "./content/zh/topic-rag.html" },
    },
    {
      id: "gateway-hub",
      theme: "gateway",
      tags: ["routing", "control-plane"],
      en: ["Gateway", "Inference routing and control plane"],
      zh: ["网关", "推理路由与控制平面"],
      href: { en: "./content/en/topic-gateway.html", zh: "./content/zh/topic-gateway.html" },
    },
    {
      id: "eval-hub",
      theme: "eval",
      tags: ["evaluation", "observability"],
      en: ["Eval", "Evaluation and observability loops"],
      zh: ["评测", "评测与可观测闭环"],
      href: { en: "./content/en/topic-eval.html", zh: "./content/zh/topic-eval.html" },
    },
    {
      id: "security-hub",
      theme: "security",
      tags: ["guardrails", "governance"],
      en: ["Security", "Safety controls and governance"],
      zh: ["安全", "安全控制与治理"],
      href: { en: "./content/en/topic-security.html", zh: "./content/zh/topic-security.html" },
    },
  ],
  riskIntel: [
    {
      id: "failure-patterns",
      theme: "risk",
      tags: ["failure", "incident"],
      en: ["Failure Patterns", "Recurring production failure signatures"],
      zh: ["失败模式", "生产环境重复出现的故障特征"],
      href: { en: "./content/en/risk-radar.html", zh: "./content/zh/risk-radar.html" },
    },
    {
      id: "upgrade-risk-matrix",
      theme: "risk",
      tags: ["upgrade", "migration", "breaking-change"],
      en: ["Upgrade Risk Matrix", "Breaking change and migration risk tracking"],
      zh: ["升级风险矩阵", "破坏性变更与迁移风险跟踪"],
      href: "../../40-insights/risks/upgrade-risk-matrix.md",
    },
    {
      id: "risk-register",
      theme: "risk",
      tags: ["register", "tracking"],
      en: ["Risk Register", "Consolidated risk records"],
      zh: ["风险总表", "集中化风险登记清单"],
      href: "../../40-insights/risks/master_risk_register_2026-03-09.csv",
    },
  ],
  operations: [
    {
      id: "repo-master-table",
      theme: "operations",
      tags: ["normalized", "master-table"],
      en: ["Normalized Master Table", "Latest deduplicated repository map"],
      zh: ["主归一化表", "最新去重仓库主表"],
      href: "../../20-normalized/repo_master_latest.csv",
    },
    {
      id: "adoption-backlog",
      theme: "operations",
      tags: ["decision", "backlog", "p0-p1-p2"],
      en: ["Adoption Backlog", "Current P0/P1/P2 decision list"],
      zh: ["采纳待办", "当前 P0/P1/P2 决策清单"],
      href: "../../40-insights/adoption_backlog_latest.md",
    },
    {
      id: "change-log",
      theme: "operations",
      tags: ["changelog", "updates"],
      en: ["Change Log", "Operational updates and structural changes"],
      zh: ["更新日志", "运营更新与结构变更记录"],
      href: "../../00-index/CHANGELOG.md",
    },
  ],
};

const SECTION_MAP = {
  quickStart: "quick-start",
  researchPaths: "research-paths",
  topicHubs: "topic-hubs",
  riskIntel: "risk-intel",
  operations: "operations",
};

let text = DEFAULT_TEXT;
let groups = DEFAULT_GROUPS;
/** @type {Record<string,{en?:string,zh?:string}>} */
let sectionTitles = {};

async function hydrateConfig() {
  try {
    const res = await fetch("./portal.config.json", { cache: "no-store" });
    if (!res.ok) return;
    const external = await res.json();
    if (external && typeof external === "object") {
      if (external.text && typeof external.text === "object") {
        text = {
          ...DEFAULT_TEXT,
          ...Object.fromEntries(
            Object.entries(external.text).map(([lang, payload]) => [
              lang,
              { ...(DEFAULT_TEXT[lang] || {}), ...(payload || {}) },
            ])
          ),
        };
      }
      if (external.groups && typeof external.groups === "object") {
        const merged = { ...DEFAULT_GROUPS };
        Object.entries(external.groups).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            merged[key] = value;
          }
        });
        groups = merged;
      }
      if (external.sectionTitles && typeof external.sectionTitles === "object") {
        sectionTitles = { ...sectionTitles, ...external.sectionTitles };
      }
    }
  } catch (_err) {
    // Keep defaults when custom config is absent.
  }
}

const i18n = (() => {
  let lang = localStorage.getItem(STORAGE_LANG_KEY);
  if (!lang || !text[lang]) lang = "en";
  const listeners = [];

  function translate(key) {
    return text[lang][key] ?? key;
  }

  function setLang(next) {
    if (!text[next]) return;
    lang = next;
    localStorage.setItem(STORAGE_LANG_KEY, lang);
    listeners.forEach((cb) => cb(lang));
  }

  function toggleLang() {
    setLang(lang === "en" ? "zh" : "en");
  }

  function onChange(cb) {
    listeners.push(cb);
  }

  function getLang() {
    return lang;
  }

  return { translate, setLang, toggleLang, onChange, getLang };
})();

const router = (() => {
  function parseHash() {
    const raw = location.hash.startsWith("#") ? location.hash.slice(1) : "";
    const query = new URLSearchParams(raw);
    return {
      q: query.get("q") || "",
      theme: query.get("theme") || "all",
      tag: query.get("tag") || "all",
    };
  }

  function writeHash(state) {
    const next = new URLSearchParams();
    if (state.q) next.set("q", state.q);
    if (state.theme && state.theme !== "all") next.set("theme", state.theme);
    if (state.tag && state.tag !== "all") next.set("tag", state.tag);
    const nextHash = next.toString();
    if (location.hash.replace(/^#/, "") !== nextHash) {
      location.hash = nextHash;
    }
  }

  return { parseHash, writeHash };
})();

const filterModel = (() => {
  function allEntries() {
    return Object.entries(groups).flatMap(([section, items]) =>
      items.map((item) => ({
        ...item,
        section,
        searchable:
          `${item.en[0]} ${item.en[1]} ${item.zh[0]} ${item.zh[1]} ${(item.tags || []).join(" ")}`
            .toLowerCase(),
      }))
    );
  }

  function availableThemes() {
    return Array.from(new Set(allEntries().map((item) => item.theme))).sort();
  }

  function availableTags() {
    return Array.from(new Set(allEntries().flatMap((item) => item.tags || []))).sort();
  }

  function queryEntries(state) {
    const q = state.q.trim().toLowerCase();
    return allEntries().filter((item) => {
      const byTheme = state.theme === "all" || item.theme === state.theme;
      const byTag = state.tag === "all" || (item.tags || []).includes(state.tag);
      const byQ = !q || item.searchable.includes(q);
      return byTheme && byTag && byQ;
    });
  }

  return { availableThemes, availableTags, queryEntries };
})();

const state = {
  q: "",
  theme: "all",
  tag: "all",
};

function applyText(lang) {
  Object.keys(text[lang]).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text[lang][id];
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.placeholder = text[lang].searchPlaceholder;
  }
}

function hydrateControls() {
  ensureControlBar("search-controls");
  ensureStatusNode("search-status");

  const controls = document.getElementById("search-controls");
  if (!controls.dataset.initialized) {
    controls.innerHTML = `
      <label class="control">
        <span id="filterTheme"></span>
        <select id="theme-filter" class="select-control"></select>
      </label>
      <label class="control">
        <span id="filterTag"></span>
        <select id="tag-filter" class="select-control"></select>
      </label>
    `;
    controls.dataset.initialized = "true";
  }

  const themeFilter = document.getElementById("theme-filter");
  const tagFilter = document.getElementById("tag-filter");
  const lang = i18n.getLang();

  const filterThemeLabel = document.getElementById("filterTheme");
  const filterTagLabel = document.getElementById("filterTag");
  if (filterThemeLabel) filterThemeLabel.textContent = text[lang].filterTheme ?? "Theme";
  if (filterTagLabel) filterTagLabel.textContent = text[lang].filterTag ?? "Tag";

  themeFilter.innerHTML = "";
  tagFilter.innerHTML = "";

  const allThemeOption = new Option(text[lang].filterAllThemes, "all");
  themeFilter.add(allThemeOption);
  filterModel.availableThemes().forEach((theme) => themeFilter.add(new Option(theme, theme)));

  const allTagOption = new Option(text[lang].filterAllTags, "all");
  tagFilter.add(allTagOption);
  filterModel.availableTags().forEach((tag) => tagFilter.add(new Option(tag, tag)));

  const validThemes = filterModel.availableThemes();
  const validTags = filterModel.availableTags();
  if (!validThemes.includes(state.theme)) state.theme = "all";
  if (!validTags.includes(state.tag)) state.tag = "all";
  themeFilter.value = state.theme;
  tagFilter.value = state.tag;
}

function render() {
  try {
    setStatus("search-status", i18n.translate("statusLoading"), "loading");
    applyText(i18n.getLang());
    hydrateControls();

    const matched = filterModel.queryEntries(state);
    const bySection = matched.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    }, {});

    Object.entries(SECTION_MAP).forEach(([section, targetId]) => {
      renderLinks(targetId, bySection[section] || [], {
        lang: i18n.getLang(),
        query: state.q,
        itemClass: section === "topicHubs" ? "hub" : "link-item",
      });
    });

    // Dynamic sections: any group key not in SECTION_MAP gets a card in #dynamic-groups
    const dynamicSectionKeys = Object.keys(groups).filter((k) => !SECTION_MAP[k]);
    const dynamicRoot = document.getElementById("dynamic-groups");
    if (dynamicRoot && dynamicSectionKeys.length > 0) {
      dynamicSectionKeys.forEach((sectionKey) => {
        const containerId = "dynamic-" + sectionKey;
        let card = document.getElementById(containerId);
        if (!card) {
          card = document.createElement("section");
          card.className = "card";
          card.id = containerId;
          const h2 = document.createElement("h2");
          h2.id = "dynamic-title-" + sectionKey;
          const list = document.createElement("div");
          list.className = "link-list";
          list.id = "dynamic-list-" + sectionKey;
          card.appendChild(h2);
          card.appendChild(list);
          dynamicRoot.appendChild(card);
        }
        const lang = i18n.getLang();
        const titles = sectionTitles[sectionKey];
        const titleEl = document.getElementById("dynamic-title-" + sectionKey);
        if (titleEl && titles) titleEl.textContent = titles[lang] || titles.en || titles.zh || sectionKey;
        renderLinks("dynamic-list-" + sectionKey, bySection[sectionKey] || [], {
          lang: i18n.getLang(),
          query: state.q,
          itemClass: "link-item",
        });
      });
    }

    if (matched.length === 0) {
      setStatus("search-status", i18n.translate("statusEmpty"), "empty");
    } else {
      setStatus(
        "search-status",
        i18n.translate("statusReady").replace("{count}", String(matched.length)),
        "ready"
      );
    }
  } catch (err) {
    console.error(err);
    setStatus("search-status", i18n.translate("statusError"), "error");
  }
}

function bindEvents() {
  document.getElementById("lang-toggle").addEventListener("click", () => {
    i18n.toggleLang();
  });

  document.getElementById("search-input").addEventListener("input", (e) => {
    state.q = e.target.value || "";
    router.writeHash(state);
    render();
  });

  document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "theme-filter") {
      state.theme = e.target.value;
      router.writeHash(state);
      render();
    }
    if (e.target && e.target.id === "tag-filter") {
      state.tag = e.target.value;
      router.writeHash(state);
      render();
    }
  });

  window.addEventListener("hashchange", () => {
    const fromUrl = router.parseHash();
    state.q = fromUrl.q;
    state.theme = fromUrl.theme;
    state.tag = fromUrl.tag;
    const searchInput = document.getElementById("search-input");
    searchInput.value = state.q;
    render();
  });

  i18n.onChange(() => {
    render();
  });
}

function ensureWrongRootWarning() {
  const el = document.getElementById("wrong-root-warning");
  if (!el) return;
  el.classList.remove("hidden");
  el.style.display = "";
  document.body.insertBefore(el, document.body.querySelector("main"));
}

async function bootstrap() {
  await hydrateConfig();
  const fromUrl = router.parseHash();
  state.q = fromUrl.q;
  state.theme = fromUrl.theme;
  state.tag = fromUrl.tag;
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = state.q;
  bindEvents();
  render();

  // Probe: if repo-root links 404, we're likely served from site folder only
  try {
    const probeUrl = new URL("../../00-index/CHANGELOG.md", location.href).href;
    const res = await fetch(probeUrl, { method: "GET" });
    if (!res.ok) ensureWrongRootWarning();
  } catch (_) {
    ensureWrongRootWarning();
  }
}

bootstrap();
