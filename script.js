/**
 * PORTFOLIO CLIENT ENGINE & INTERACTIONS
 * Theme: Light/Neon Green (#00F801) & Dark Aesthetic Green (#0F460F)
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.portfolioData || {};

  // 1. Initialize Profile Details from data.js
  initProfile(data.personal);

  // 2. Start Live Digital Clock
  initLiveClock(data.personal?.timezone || "Asia/Kolkata");

  // 3. Render Sections
  renderHighlights(data.highlights);
  renderWorkExperience(data.work);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderOpenSource(data.openSource);
  renderHackathons(data.hackathons);
  renderAchievements(data.achievementsAndCerts);
  renderContributions(data.contributions);

  // 4. Setup Interactive Features
  setupClipboard();
  setupCommandPalette(data);
  setupResumeModal();

  // Set current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   Profile Hydration
   -------------------------------------------------------------------------- */
function initProfile(personal) {
  if (!personal) return;

  const authorName = document.getElementById("authorName");
  const authorTitle = document.getElementById("authorTitle");
  const authorLocation = document.getElementById("authorLocation");
  const avatarImg = document.getElementById("avatarImg");
  const emailDisplay = document.getElementById("emailDisplay");
  const contribHandleLink = document.getElementById("contribHandleLink");

  if (authorName && personal.name) authorName.textContent = personal.name;
  if (authorTitle && personal.title) authorTitle.textContent = personal.title;
  if (authorLocation && personal.location) authorLocation.textContent = personal.location;
  if (avatarImg && personal.avatar) avatarImg.src = personal.avatar;
  if (emailDisplay && personal.email) emailDisplay.textContent = personal.email;
  if (contribHandleLink && personal.handle) {
    contribHandleLink.textContent = `@${personal.handle}`;
    contribHandleLink.href = personal.socials?.github || `https://github.com/${personal.handle}`;
  }
}

/* --------------------------------------------------------------------------
   Live Digital Clock (Live Local Time Updates)
   -------------------------------------------------------------------------- */
function initLiveClock(timeZone) {
  const clockEl = document.getElementById("liveClock");
  if (!clockEl) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: timeZone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      clockEl.textContent = formatter.format(now).toLowerCase();
    } catch (e) {
      // Fallback to local machine time
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).toLowerCase();
    }
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   Render Highlights Section (Screenshot 2)
   -------------------------------------------------------------------------- */
function renderHighlights(highlights) {
  const container = document.getElementById("highlightsList");
  if (!container || !highlights || !highlights.length) return;

  container.innerHTML = highlights.map(item => `
    <div class="highlight-row">
      <span class="highlight-text">${escapeHtml(item.title)}</span>
      <span class="highlight-tag">${escapeHtml(item.tag)}</span>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render Work Section with Accordion (Screenshot 3)
   -------------------------------------------------------------------------- */
function renderWorkExperience(workItems) {
  const container = document.getElementById("workList");
  if (!container || !workItems) return;

  container.innerHTML = workItems.map((job, idx) => {
    const isFirst = idx === 0;
    const initialChar = job.company.charAt(0);
    const bulletsHtml = (job.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("");
    const linksHtml = (job.links || []).map(l => `
      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="tag-badge">${escapeHtml(l.label)} ↗</a>
    `).join("");
    const techHtml = (job.technologies || []).map(t => `
      <span class="tag-badge" style="background: rgba(15, 70, 15, 0.25); border-color: rgba(15,70,15,0.4);">${escapeHtml(t)}</span>
    `).join("");

    return `
      <div class="work-item ${isFirst ? 'expanded' : ''}" data-idx="${idx}">
        <div class="work-header" onclick="toggleWorkAccordion(${idx})">
          <div class="work-main-info">
            <div class="company-logo">${initialChar}</div>
            <div class="work-title-group">
              <h3>${escapeHtml(job.company)}</h3>
              <span class="work-role">${escapeHtml(job.role)}</span>
            </div>
          </div>
          <div class="work-meta-right">
            <span class="work-period">${escapeHtml(job.period)}</span>
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div class="work-body">
          <p class="work-summary">${escapeHtml(job.description)}</p>
          ${bulletsHtml ? `<ul class="work-bullets">${bulletsHtml}</ul>` : ''}
          <div class="work-footer-links">
            ${linksHtml}
            ${techHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

window.toggleWorkAccordion = function(idx) {
  const items = document.querySelectorAll(".work-item");
  items.forEach(item => {
    if (item.getAttribute("data-idx") === String(idx)) {
      item.classList.toggle("expanded");
    }
  });
};

/* --------------------------------------------------------------------------
   Render Skills Section (Requested right after Work)
   -------------------------------------------------------------------------- */
function renderSkills(skillsData) {
  const container = document.getElementById("skillsContainer");
  if (!container || !skillsData?.categories) return;

  container.innerHTML = skillsData.categories.map(cat => `
    <div class="skill-category">
      <h4>${escapeHtml(cat.name)}</h4>
      <div class="skill-tags">
        ${cat.skills.map(s => `<span class="skill-chip">${escapeHtml(s)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render Projects Section (Screenshot 4)
   -------------------------------------------------------------------------- */
function renderProjects(projects) {
  const container = document.getElementById("projectsList");
  if (!container || !projects) return;

  container.innerHTML = projects.map(proj => `
    <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="project-card">
      <div class="project-header">
        <span class="project-title">
          ${escapeHtml(proj.title)}
          ${proj.liveUrl ? `<span style="font-size: 0.72rem; color: var(--neon-green); font-family: var(--font-mono); font-weight: normal;">• Live</span>` : ''}
        </span>
        <div class="project-meta-right">
          ${proj.stars ? `
            <span class="star-count">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              ${escapeHtml(proj.stars)}
            </span>
          ` : ''}
          <span>${escapeHtml(proj.language)}</span>
        </div>
      </div>
      <p class="project-desc">${escapeHtml(proj.description)}</p>
    </a>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render Open Source Section (Screenshot 4 bottom & 5 top)
   -------------------------------------------------------------------------- */
let isShowingAllPrs = false;
let allPrsList = [];

function renderOpenSource(ossData) {
  const summaryEl = document.getElementById("ossSummary");
  const prListEl = document.getElementById("prList");
  const toggleBtn = document.getElementById("togglePrsBtn");

  if (!ossData) return;
  if (summaryEl && ossData.summary) {
    summaryEl.innerHTML = `<strong>${escapeHtml(ossData.prs?.length || 78)} pull requests</strong> merged into projects I don't own, including denoland, jj-vcs, KDE, Vercel, and more.`;
  }

  allPrsList = ossData.prs || [];
  renderPrs(3); // Show first 3 by default, expand to all on click

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isShowingAllPrs = !isShowingAllPrs;
      renderPrs(isShowingAllPrs ? allPrsList.length : 3);
      toggleBtn.innerHTML = isShowingAllPrs 
        ? "Show fewer pull requests &uarr;" 
        : `Show all ${allPrsList.length} pull requests &darr;`;
    });
  }
}

function renderPrs(count) {
  const prListEl = document.getElementById("prList");
  if (!prListEl) return;

  const toShow = allPrsList.slice(0, count);
  prListEl.innerHTML = toShow.map(pr => `
    <a href="${pr.url}" target="_blank" rel="noopener noreferrer" class="pr-row">
      <div class="pr-details">
        <span class="pr-title">${escapeHtml(pr.title)}</span>
        <span class="pr-repo">${escapeHtml(pr.repo)}</span>
      </div>
      <span class="pr-date">${escapeHtml(pr.date)}</span>
    </a>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render Hackathons Section (Requested after OSS)
   -------------------------------------------------------------------------- */
function renderHackathons(hackathons) {
  const container = document.getElementById("hackathonsList");
  if (!container || !hackathons) return;

  container.innerHTML = hackathons.map(h => `
    <div class="hackathon-card">
      <div class="hackathon-header">
        <h3 class="hackathon-title">${escapeHtml(h.event)}</h3>
        <span class="hackathon-award">${escapeHtml(h.award)}</span>
      </div>
      <div class="hackathon-project">
        Project: <span>${escapeHtml(h.project)}</span>
      </div>
      <p class="hackathon-desc">${escapeHtml(h.description)}</p>
      <div class="hackathon-links">
        ${(h.links || []).map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)} ↗</a>`).join("")}
      </div>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render Achievements & Certifications (Requested after Hackathons)
   -------------------------------------------------------------------------- */
function renderAchievements(achievements) {
  const container = document.getElementById("achievementsList");
  if (!container || !achievements) return;

  container.innerHTML = achievements.map(item => `
    <div class="achievement-card">
      <div>
        <div class="achievement-top">
          <h4 class="achievement-title">${escapeHtml(item.title)}</h4>
          <span class="achievement-badge">${escapeHtml(item.badge || item.date)}</span>
        </div>
        <p class="achievement-org">${escapeHtml(item.organization)}</p>
      </div>
      <p class="achievement-desc">${escapeHtml(item.description)}</p>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render GitHub Contributions Grid (Screenshot 5 bottom)
   Generates 52-week calendar with Neon Green & Dark Green heat matrix
   -------------------------------------------------------------------------- */
function renderContributions(contribData) {
  const gridEl = document.getElementById("calendarGrid");
  const totalEl = document.getElementById("contribTotal");
  if (!gridEl) return;

  if (totalEl && contribData?.totalThisYear) {
    totalEl.textContent = contribData.totalThisYear.toLocaleString();
  }

  // Generate 52 weeks x 7 days
  const weeks = 52;
  const daysPerWeek = 7;
  let html = "";

  // Pseudo-random seeded pattern to create realistic GitHub commit frequency
  for (let w = 0; w < weeks; w++) {
    html += `<div class="calendar-week">`;
    for (let d = 0; d < daysPerWeek; d++) {
      // Deterministic noise formula for organic commit distribution
      const factor = (Math.sin(w * 0.45 + d * 0.8) + Math.cos(w * 0.15)) * 0.5 + 0.5;
      const rand = ((w * 13 + d * 37) % 100) / 100;
      
      let lvl = 0;
      if (rand > 0.88) lvl = 4; // Bright neon green #00F801
      else if (rand > 0.65) lvl = 3;
      else if (rand > 0.42) lvl = 2;
      else if (rand > 0.20) lvl = 1; // Dark aesthetic green #0F460F
      else lvl = 0;

      // Approximate date string for tooltip
      const approxCommits = lvl === 0 ? 0 : Math.round(lvl * 3 + rand * 4);
      const title = `${approxCommits} contributions on week ${w + 1}, day ${d + 1}`;

      html += `<div class="calendar-day lvl-${lvl}" title="${title}"></div>`;
    }
    html += `</div>`;
  }

  gridEl.innerHTML = html;
}

/* --------------------------------------------------------------------------
   Copy Email & Toast Notification
   -------------------------------------------------------------------------- */
function setupClipboard() {
  const emailBtn = document.getElementById("emailCopyBtn");
  const emailDisplay = document.getElementById("emailDisplay");
  const toast = document.getElementById("toastNotice");
  const toastMsg = document.getElementById("toastMsg");

  if (!emailBtn) return;

  emailBtn.addEventListener("click", () => {
    const email = emailDisplay?.textContent?.trim() || "alex@vance.dev";
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      // Fallback
      window.location.href = `mailto:${email}`;
    });
  });

  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

/* --------------------------------------------------------------------------
   Command Palette (Ctrl+K / ⌘K) Modal
   -------------------------------------------------------------------------- */
function setupCommandPalette(data) {
  const modal = document.getElementById("cmdModal");
  const triggerBtn = document.getElementById("cmdTriggerBtn");
  const input = document.getElementById("cmdSearchInput");
  const resultsList = document.getElementById("cmdResults");

  if (!modal || !input || !resultsList) return;

  // Build searchable items catalogue
  const items = [
    { label: "Go to Work Experience", category: "Section", action: () => scrollToId("work") },
    { label: "Go to Skills", category: "Section", action: () => scrollToId("skills") },
    { label: "Go to Projects", category: "Section", action: () => scrollToId("projects") },
    { label: "Go to Open Source", category: "Section", action: () => scrollToId("oss") },
    { label: "Go to Hackathons", category: "Section", action: () => scrollToId("hackathons") },
    { label: "Go to Achievements & Certifications", category: "Section", action: () => scrollToId("achievements") },
    { label: "Go to Highlights", category: "Section", action: () => scrollToId("highlights") },
    { label: "Go to GitHub Contributions Calendar", category: "Section", action: () => scrollToId("contributions") },
    { label: "Copy Email Address", category: "Action", action: () => document.getElementById("emailCopyBtn")?.click() },
    { label: "View / Download Resume", category: "Action", action: () => openResumeModal() },
    { label: "Book a 1:1 Intro Call", category: "Action", action: () => window.open(data.personal?.calendly || "https://cal.com", "_blank") },
    { label: "Visit GitHub Profile", category: "Social", action: () => window.open(data.personal?.socials?.github || "https://github.com", "_blank") },
    { label: "Visit X / Twitter Profile", category: "Social", action: () => window.open(data.personal?.socials?.twitter || "https://x.com", "_blank") },
    { label: "Visit LinkedIn Profile", category: "Social", action: () => window.open(data.personal?.socials?.linkedin || "https://linkedin.com", "_blank") }
  ];

  // Add individual projects to search
  (data.projects || []).forEach(p => {
    items.push({
      label: `Project: ${p.title} (${p.language})`,
      category: "Project",
      action: () => window.open(p.url, "_blank")
    });
  });

  // Add skills to search
  (data.skills?.categories || []).forEach(cat => {
    cat.skills.forEach(s => {
      items.push({
        label: `Skill: ${s} (${cat.name})`,
        category: "Skill",
        action: () => scrollToId("skills")
      });
    });
  });

  let selectedIndex = 0;
  let filteredItems = [...items];

  function openPalette() {
    modal.classList.add("open");
    input.value = "";
    filterItems("");
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    modal.classList.remove("open");
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function filterItems(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      filteredItems = items.slice(0, 10);
    } else {
      filteredItems = items.filter(item => 
        item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    }
    selectedIndex = 0;
    renderResults();
  }

  function renderResults() {
    if (filteredItems.length === 0) {
      resultsList.innerHTML = `<li style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching commands found.</li>`;
      return;
    }

    resultsList.innerHTML = filteredItems.map((item, idx) => `
      <li class="cmd-item ${idx === selectedIndex ? 'selected' : ''}" data-idx="${idx}">
        <div class="cmd-item-left">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>${escapeHtml(item.label)}</span>
        </div>
        <span class="cmd-item-badge">${escapeHtml(item.category)}</span>
      </li>
    `).join("");

    // Click item
    resultsList.querySelectorAll(".cmd-item").forEach(li => {
      li.addEventListener("click", () => {
        const idx = parseInt(li.getAttribute("data-idx"), 10);
        executeItem(idx);
      });
    });
  }

  function executeItem(idx) {
    if (filteredItems[idx]) {
      closePalette();
      filteredItems[idx].action();
    }
  }

  // Keyboard navigation
  input.addEventListener("input", (e) => filterItems(e.target.value));

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredItems.length;
      renderResults();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
      renderResults();
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeItem(selectedIndex);
    } else if (e.key === "Escape") {
      closePalette();
    }
  });

  // Global hotkeys (Ctrl+K or Cmd+K)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("open")) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === "Escape" && modal.classList.contains("open")) {
      closePalette();
    }
  });

  if (triggerBtn) triggerBtn.addEventListener("click", openPalette);

  // Click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePalette();
  });
}

/* --------------------------------------------------------------------------
   Resume Modal
   -------------------------------------------------------------------------- */
function setupResumeModal() {
  const resumeBtn = document.getElementById("resumeBtn");
  const modal = document.getElementById("resumeModal");
  const closeBtn = document.getElementById("closeResumeBtn");
  const closeBtn2 = document.getElementById("closeResumeBtn2");

  if (!modal) return;

  window.openResumeModal = function() {
    modal.classList.add("open");
  };

  function closeModal() {
    modal.classList.remove("open");
  }

  if (resumeBtn) {
    resumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeBtn2) closeBtn2.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

/* --------------------------------------------------------------------------
   Utilities
   -------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
