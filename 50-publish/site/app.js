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
    searchAriaLabel: "Search and filter cards by title, description, path",
    filterTheme: "Theme",
    filterTag: "Tag",
    filterAllThemes: "All themes",
    filterAllTags: "All tags",
    statusLoading: "Loading portal data...",
    statusError: "Render failed. Please refresh or click Retry.",
    statusEmpty: "No results. Try clearing filters or changing keywords.",
    statusReady: "Showing {count} cards.",
    clearFilters: "Clear filters",
    retry: "Retry",
    emptySectionHint: "No items in this section.",
    footerText: "All links point to repository files.",
    toggle: "中文",
    "lang-toggle": "中文",
    mainAriaLabel: "Portal content",
    searchSectionAriaLabel: "Search and filters",
    wrongRootWarningTitle: "Links may 404: server is likely not run from repo root.",
    wrongRootWarningBody: "Run the HTTP server from the repository root and open /50-publish/site/. Example: python -m http.server 3765 then open http://localhost:3765/50-publish/site/",
    noscriptLine1: "JavaScript is disabled.",
    noscriptLine2: "This portal needs JavaScript for navigation and filters. Enable it and refresh, or browse 00-index, 40-insights, 50-publish in your editor.",
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
    searchAriaLabel: "按标题、描述、路径搜索与筛选卡片",
    filterTheme: "主题",
    filterTag: "标签",
    filterAllThemes: "全部主题",
    filterAllTags: "全部标签",
    statusLoading: "正在加载门户数据...",
    statusError: "渲染失败，请刷新或点击重试。",
    statusEmpty: "没有匹配结果，请清空筛选或更换关键词。",
    statusReady: "当前显示 {count} 个卡片。",
    clearFilters: "清空筛选",
    retry: "重试",
    emptySectionHint: "本区暂无条目。",
    footerText: "所有链接都指向仓库内文件。",
    toggle: "English",
    "lang-toggle": "English",
    mainAriaLabel: "门户内容",
    searchSectionAriaLabel: "搜索与筛选",
    wrongRootWarningTitle: "部分链接可能 404：当前很可能未从仓库根目录启动服务。",
    wrongRootWarningBody: "请在仓库根目录启动 HTTP 服务并访问 /50-publish/site/。例如：python -m http.server 3765，然后打开 http://localhost:3765/50-publish/site/",
    noscriptLine1: "未启用 JavaScript。",
    noscriptLine2: "本门户需 JavaScript 加载导航与筛选。请启用后刷新，或在编辑器中浏览 00-index、40-insights、50-publish。",
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
    return Object.entries(groups).flatMap(([section, items]) => {
      if (!Array.isArray(items)) return [];
      return items.map((item) => {
        const en = item.en && Array.isArray(item.en) ? item.en : [];
        const zh = item.zh && Array.isArray(item.zh) ? item.zh : [];
        const searchable = `${en[0] ?? ""} ${en[1] ?? ""} ${zh[0] ?? ""} ${zh[1] ?? ""} ${(item.tags || []).join(" ")}`.toLowerCase();
        return { ...item, section, searchable };
      });
    });
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
  const t = text[lang] || text.en || {};
  Object.keys(t).forEach((id) => {
    const el = document.getElementById(id);
    if (el && t[id] != null && typeof t[id] === "string") el.textContent = t[id];
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    if (t.searchPlaceholder != null) searchInput.placeholder = t.searchPlaceholder;
    if (t.searchAriaLabel != null) searchInput.setAttribute("aria-label", t.searchAriaLabel);
  }

  const wrongRoot = document.getElementById("wrong-root-warning");
  if (wrongRoot && t.wrongRootWarningTitle != null && t.wrongRootWarningBody != null) {
    wrongRoot.textContent = "";
    const strong = document.createElement("strong");
    strong.textContent = t.wrongRootWarningTitle;
    wrongRoot.appendChild(strong);
    wrongRoot.appendChild(document.createElement("br"));
    wrongRoot.appendChild(document.createTextNode(t.wrongRootWarningBody));
  }

  const mainEl = document.querySelector("main[role='main']");
  if (mainEl && t.mainAriaLabel != null) mainEl.setAttribute("aria-label", t.mainAriaLabel);
  const searchSection = document.getElementById("search-section");
  if (searchSection && t.searchSectionAriaLabel != null) searchSection.setAttribute("aria-label", t.searchSectionAriaLabel);
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
  if (!themeFilter || !tagFilter) return;

  const lang = i18n.getLang();
  const t = text[lang] || text.en || {};

  const filterThemeLabel = document.getElementById("filterTheme");
  const filterTagLabel = document.getElementById("filterTag");
  if (filterThemeLabel) filterThemeLabel.textContent = t.filterTheme ?? "Theme";
  if (filterTagLabel) filterTagLabel.textContent = t.filterTag ?? "Tag";

  themeFilter.innerHTML = "";
  tagFilter.innerHTML = "";

  const allThemeOption = new Option(t.filterAllThemes ?? "All themes", "all");
  themeFilter.add(allThemeOption);
  filterModel.availableThemes().forEach((theme) => themeFilter.add(new Option(theme, theme)));

  const allTagOption = new Option(t.filterAllTags ?? "All tags", "all");
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
      const items = bySection[section] || [];
      renderLinks(targetId, items, {
        lang: i18n.getLang(),
        query: state.q,
        itemClass: section === "topicHubs" ? "hub" : "link-item",
      });
      if (items.length === 0) {
        const root = document.getElementById(targetId);
        if (root) {
          const hint = document.createElement("p");
          hint.className = "empty-section-hint";
          hint.textContent = i18n.translate("emptySectionHint");
          root.appendChild(hint);
        }
      }
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
        const dynItems = bySection[sectionKey] || [];
        renderLinks("dynamic-list-" + sectionKey, dynItems, {
          lang: i18n.getLang(),
          query: state.q,
          itemClass: "link-item",
        });
        if (dynItems.length === 0) {
          const dynRoot = document.getElementById("dynamic-list-" + sectionKey);
          if (dynRoot) {
            const hint = document.createElement("p");
            hint.className = "empty-section-hint";
            hint.textContent = i18n.translate("emptySectionHint");
            dynRoot.appendChild(hint);
          }
        }
      });
    }

    if (matched.length === 0) {
      setStatus("search-status", i18n.translate("statusEmpty"), "empty");
      const statusEl = document.getElementById("search-status");
      if (statusEl) {
        statusEl.appendChild(document.createTextNode(" "));
        const clearBtn = document.createElement("button");
        clearBtn.type = "button";
        clearBtn.id = "clear-filters-btn";
        clearBtn.className = "btn btn-inline";
        clearBtn.textContent = i18n.translate("clearFilters");
        statusEl.appendChild(clearBtn);
      }
    } else {
      let statusMsg = i18n.translate("statusReady").replace("{count}", String(matched.length));
      const parts = [];
      if (state.theme !== "all") parts.push(i18n.translate("filterTheme") + ": " + state.theme);
      if (state.tag !== "all") parts.push(i18n.translate("filterTag") + ": " + state.tag);
      if (parts.length) statusMsg += " (" + parts.join(", ") + ")";
      setStatus("search-status", statusMsg, "ready");
    }
  } catch (err) {
    console.error(err);
    setStatus("search-status", i18n.translate("statusError"), "error");
    const statusEl = document.getElementById("search-status");
    if (statusEl) {
      statusEl.appendChild(document.createTextNode(" "));
      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.id = "retry-btn";
      retryBtn.className = "btn btn-inline";
      retryBtn.textContent = i18n.translate("retry");
      statusEl.appendChild(retryBtn);
    }
  }
}

function clearFiltersAndRender() {
  state.q = "";
  state.theme = "all";
  state.tag = "all";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  router.writeHash(state);
  const themeFilter = document.getElementById("theme-filter");
  const tagFilter = document.getElementById("tag-filter");
  if (themeFilter) themeFilter.value = "all";
  if (tagFilter) tagFilter.value = "all";
  render();
}

function bindEvents() {
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) langToggle.addEventListener("click", () => i18n.toggleLang());

  let searchDebounceId = 0;
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value || "";
      state.q = value;
      if (searchDebounceId) clearTimeout(searchDebounceId);
      searchDebounceId = setTimeout(() => {
        searchDebounceId = 0;
        router.writeHash(state);
        render();
      }, SEARCH_DEBOUNCE_MS);
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "clear-filters-btn") {
      e.preventDefault();
      clearFiltersAndRender();
    }
    if (e.target && e.target.id === "retry-btn") {
      e.preventDefault();
      render();
    }
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
    state.q = fromUrl.q ?? "";
    state.theme = fromUrl.theme ?? "all";
    state.tag = fromUrl.tag ?? "all";
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = state.q;
    render();
  });

  i18n.onChange((lang) => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) langToggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    render();
  });
  const initialLang = i18n.getLang();
  document.documentElement.lang = initialLang === "zh" ? "zh-CN" : "en";
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) langToggle.setAttribute("aria-label", initialLang === "zh" ? "Switch to English" : "切换到中文");
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
  state.q = fromUrl.q ?? "";
  state.theme = fromUrl.theme ?? "all";
  state.tag = fromUrl.tag ?? "all";
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
