function escapeHtml(value) {
  // Avoid String.prototype.replaceAll for wider browser compatibility (some in-app browsers lack it).
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightText(content, query) {
  const text = escapeHtml(content);
  const q = (query || "").trim();
  if (!q) return text;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

export function ensureControlBar(id) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement("div");
    node.id = id;
    node.className = "search-controls";
    const hint = document.getElementById("searchHint");
    const firstCard = document.querySelector(".layout .card");
    if (hint) {
      hint.after(node);
    } else if (firstCard) {
      firstCard.appendChild(node);
    } else {
      document.querySelector("main")?.prepend(node);
    }
  }
  return node;
}

export function ensureStatusNode(id) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement("div");
    node.id = id;
    node.className = "status-banner";
    node.setAttribute("aria-live", "polite");
    node.setAttribute("aria-atomic", "true");
    const controls = document.getElementById("search-controls");
    const hint = document.getElementById("searchHint");
    if (controls) {
      controls.after(node);
    } else if (hint) {
      hint.after(node);
    } else {
      const firstCard = document.querySelector("main .card");
      if (firstCard) firstCard.after(node);
      else document.body.appendChild(node);
    }
  }
  return node;
}

export function setStatus(id, text, type) {
  const node = ensureStatusNode(id);
  node.textContent = text;
  node.dataset.type = type || "ready";
}

export function renderLinks(targetId, items, options) {
  const root = document.getElementById(targetId);
  if (!root) return;
  root.innerHTML = "";
  const lang = options.lang;
  const query = options.query || "";
  const itemClass = options.itemClass || "link-item";

  items.forEach((item) => {
    const href = typeof item.href === "string" ? item.href : (item.href && (item.href[lang] ?? item.href.en ?? item.href.zh));
    const label = item[lang] ?? item.en ?? item.zh;
    if (!href || !label || !Array.isArray(label)) return;
    const a = document.createElement("a");
    a.href = href;
    a.className = itemClass;
    a.title = href;
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    const sameOrigin = isExternal && typeof window !== "undefined" && new URL(href, window.location.origin).origin === window.location.origin;
    if (isExternal && !sameOrigin) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.target = "_self";
    }
    a.dataset.search = item.searchable || "";
    a.dataset.theme = item.theme || "";
    a.dataset.tags = (item.tags || []).join(",");

    const titleText = highlightText(label[0] ?? "", query);
    const desc = highlightText(label[1] ?? "", query);
    a.innerHTML = `${titleText}<small>${desc}</small>`;
    root.appendChild(a);
  });
}
