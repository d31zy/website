const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "economy", label: "Экономика" },
  { id: "security", label: "Защита" },
  { id: "gameplay", label: "Геймплей" },
  { id: "management", label: "Управление" },
  { id: "tools", label: "Инструменты" },
];

const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.filter((c) => c.id !== "all").map((c) => [c.id, c.label])
);

let activeFilter = "all";

function createIcon(name) {
  const icons = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>`,
    telegram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-5 h-5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-4 h-4" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3"/></svg>`,
    external: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-4 h-4" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-5 h-5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    java: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true"><path d="M8.851 18.564s.792.489 2.399.489c2.247 0 3.838-.928 3.838-2.676 0-1.538-1.027-2.352-3.073-3.352C9.851 11.564 8.4 10.564 8.4 8.764c0-1.564 1.273-2.764 3.273-3.564l1.091 1.327c-1.273.655-1.818 1.382-1.818 2.291 0 1.109.746 1.691 2.291 2.473 2.182 1.091 3.273 2.291 3.273 4.036 0 2.473-2.036 4.073-5.236 4.073-2.182 0-3.636-.582-4.218-.873l1.091-1.327zM14.4 4.764c2.618.655 4.218 2.291 4.218 4.618 0 2.618-1.964 4.291-5.018 5.382l-.655-1.382c2.473-.873 3.782-1.964 3.782-3.491 0-1.236-.655-2.182-2.182-3.055l-.145-1.672z"/></svg>`,
    plugin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-8 h-8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.103-.897-2-2-2s-2 .897-2 2c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.586 3.55 1.088 5.312.166.527.433 1.015.794 1.433.361.418.808.756 1.314.994.506.238 1.062.372 1.628.394.566.022 1.13-.074 1.653-.282.523-.208 1.002-.516 1.408-.906a7.511 7.511 0 011.408.906c.523.208 1.087.304 1.653.282.566-.022 1.122-.156 1.628-.394.506-.238.953-.576 1.314-.994.361-.418.628-.906.794-1.433.502-1.762.902-3.699 1.088-5.312a48.39 48.39 0 01-4.163.3.64.64 0 01-.657-.643v0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 12v.01"/></svg>`,
  };
  return icons[name] || "";
}

function renderProfile() {
  const container = document.getElementById("profile-card");
  if (!container) return;

  const statsHtml = PROFILE.stats
    .map(
      (s) =>
        `<span class="stat-pill"><strong>${s.value}</strong> ${s.label}</span>`
    )
    .join("");

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
      <div class="avatar-ring shrink-0">
        <img
          src="${PROFILE.avatar}"
          alt="Аватар ${PROFILE.name}"
          class="avatar"
          onerror="this.src='assets/avatar-placeholder.svg'"
        />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm text-neutral-400 font-medium tracking-wide uppercase mb-1">${PROFILE.role}</p>
        <h1 class="font-display text-2xl sm:text-3xl font-semibold text-neutral-50 mb-2">${PROFILE.name}</h1>
        <p class="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">${PROFILE.bio}</p>
        <div class="flex flex-wrap gap-2 mb-4">${statsHtml}</div>
        <div class="flex items-center gap-2">
          <a href="${PROFILE.links.github}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${createIcon("github")}</a>
          <a href="${PROFILE.links.telegram}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Telegram">${createIcon("telegram")}</a>
          <a href="${PROFILE.links.email}" class="social-link" aria-label="Email">${createIcon("email")}</a>
        </div>
      </div>
    </div>
  `;
}

function renderFilters() {
  const container = document.getElementById("filters");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(
    (cat) =>
      `<button type="button" class="filter-btn${cat.id === activeFilter ? " active" : ""}" data-filter="${cat.id}">${cat.label}</button>`
  ).join("");

  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      renderFilters();
      renderPlugins();
    });
  });
}

function renderPlugins() {
  const grid = document.getElementById("plugin-grid");
  if (!grid) return;

  const filtered =
    activeFilter === "all"
      ? PLUGINS
      : PLUGINS.filter((p) => p.category === activeFilter);

  grid.innerHTML = filtered
    .map(
      (plugin, i) => `
    <article
      class="glass glass-card plugin-card p-5 fade-in stagger-${Math.min(i + 1, 4)}"
      tabindex="0"
      role="button"
      aria-label="Открыть ${plugin.name}"
      data-plugin-id="${plugin.id}"
    >
      <div class="accent-bar"></div>
      <div class="flex items-start justify-between gap-3 mb-4">
        <div class="plugin-icon">
          ${createIcon("plugin")}
        </div>
        <span class="tag">${CATEGORY_LABELS[plugin.category] || plugin.category}</span>
      </div>
      <h3 class="font-display text-lg font-semibold text-neutral-50 mb-1">${plugin.name}</h3>
      <p class="text-sm text-neutral-400 mb-4 line-clamp-2">${plugin.tagline}</p>
      <div class="flex flex-wrap gap-2 mb-3">
        <span class="java-badge">${createIcon("java")} ${plugin.javaVersion}</span>
        <span class="tag">${plugin.platform}</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${plugin.features.slice(0, 3).map((f) => `<span class="feature-chip">${f}</span>`).join("")}
      </div>
      <div class="card-overlay">
        <span class="text-sm font-medium text-neutral-300">Подробнее →</span>
      </div>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll(".plugin-card").forEach((card) => {
    const open = () => openModal(card.dataset.pluginId);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function openModal(pluginId) {
  const plugin = PLUGINS.find((p) => p.id === pluginId);
  if (!plugin) return;

  const modal = document.getElementById("plugin-modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4 mb-6">
        <div>
          <span class="tag mb-3 inline-block">${CATEGORY_LABELS[plugin.category]}</span>
          <h2 class="font-display text-2xl font-semibold text-neutral-50">${plugin.name}</h2>
          <p class="text-neutral-400 mt-1">${plugin.tagline}</p>
        </div>
        <button type="button" id="modal-close" class="social-link shrink-0" aria-label="Закрыть">${createIcon("close")}</button>
      </div>
      <p class="text-neutral-300 text-sm leading-relaxed mb-6">${plugin.description}</p>
      <dl class="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <dt class="text-neutral-500 mb-1">Платформа</dt>
          <dd class="text-neutral-200">${plugin.platform}</dd>
        </div>
        <div>
          <dt class="text-neutral-500 mb-1">Версии MC</dt>
          <dd class="text-neutral-200">${plugin.version}</dd>
        </div>
        <div>
          <dt class="text-neutral-500 mb-1">Java</dt>
          <dd class="text-neutral-200">${plugin.javaVersion}</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-2 mb-6">
        ${plugin.features.map((f) => `<span class="feature-chip">${f}</span>`).join("")}
      </div>
      <div class="flex flex-wrap gap-3">
        <a href="${plugin.github}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
          ${createIcon("github")} GitHub
        </a>
        <a href="${plugin.download}" class="btn btn-primary">
          ${createIcon("download")} Скачать
        </a>
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  document.getElementById("modal-close")?.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("plugin-modal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModal() {
  const modal = document.getElementById("plugin-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function initNav() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderFilters();
  renderPlugins();
  initModal();
  initNav();
});
