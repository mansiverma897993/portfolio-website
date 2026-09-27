/**
 * PORTFOLIO CLIENT ENGINE & INTERACTIONS • MAN$I VERMA 🦀
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
  renderProjects(data.projects, data.moreProjects);
  renderOpenSource(data.openSource);
  renderHackathons(data.hackathons);
  renderAchievements(data.achievementsAndCerts);

  // 4. Setup Interactive Features
  setupClipboard();
  setupCommandPalette(data);
  setupResumeModal(data.personal?.resumeUrl);

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
  const taglineRust = document.getElementById("taglineRust");

  if (authorName && personal.name) authorName.innerHTML = `${escapeHtml(personal.name)} <span class="crab-emoji" title="Rustacean Crab">🦀</span>`;
  if (authorTitle && personal.title) authorTitle.textContent = personal.title;
  if (taglineRust && personal.taglineQuote) taglineRust.textContent = personal.taglineQuote;
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
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).toLowerCase();
    }
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   Render Highlights Section (Screenshot 2 style)
   -------------------------------------------------------------------------- */
function renderHighlights(highlights) {
  const container = document.getElementById("highlightsList");
  if (!container || !highlights || !highlights.length) return;

  container.innerHTML = highlights.map(item => `
    <div class="highlight-row">
      ${item.url ? `
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="highlight-text inline-link" style="border-bottom: none;">
          ${escapeHtml(item.title)} ↗
        </a>
      ` : `
        <span class="highlight-text">${escapeHtml(item.title)}</span>
      `}
      <span class="highlight-tag">${escapeHtml(item.tag)}</span>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------------
   Render Work Section with Accordion (Screenshot 3 style)
   -------------------------------------------------------------------------- */
function renderWorkExperience(workItems) {
  const container = document.getElementById("workList");
  if (!container || !workItems) return;

  container.innerHTML = workItems.map((job, idx) => {
    const initialChar = job.company.charAt(0);
    const hasBody = !!(job.description || (job.bullets && job.bullets.length) || (job.technologies && job.technologies.length) || (job.links && job.links.length));

    if (!hasBody) {
      return `
        <div class="work-item" data-idx="${idx}" style="cursor: pointer;" onclick="document.getElementById('oss')?.scrollIntoView({behavior: 'smooth'})">
          <div class="work-header">
            <div class="work-main-info">
              <div class="company-logo"><span class="company-dot"></span></div>
              <div class="work-title-group">
                <h3>${escapeHtml(job.company)}</h3>
                <span class="work-role">${escapeHtml(job.role)}</span>
              </div>
            </div>
            <div class="work-meta-right">
              <span class="work-period">${escapeHtml(job.period)}</span>
              <span style="color: var(--neon-green); font-size: 0.78rem; font-family: var(--font-mono); margin-left: 6px;">View PRs ↗</span>
            </div>
          </div>
        </div>
      `;
    }

    const bulletsHtml = (job.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("");
    const linksHtml = (job.links || []).map(l => `
      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="tag-badge">${escapeHtml(l.label)} ↗</a>
    `).join("");
    const techHtml = (job.technologies || []).map(t => `
      <span class="tag-badge" style="background: rgba(15, 70, 15, 0.25); border-color: rgba(15,70,15,0.4);">${escapeHtml(t)}</span>
    `).join("");

    return `
      <div class="work-item" data-idx="${idx}">
        <div class="work-header" onclick="toggleWorkAccordion(${idx})">
          <div class="work-main-info">
            <div class="company-logo"><span class="company-dot"></span></div>
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
          ${job.description ? `<p class="work-summary">${escapeHtml(job.description)}</p>` : ''}
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
   Render Projects Section (Screenshot 4 style + More Projects)
   -------------------------------------------------------------------------- */
function renderProjects(projects, moreProjects) {
  const container = document.getElementById("projectsList");
  const moreContainer = document.getElementById("moreProjectsList");
  const toggleBtn = document.getElementById("toggleMoreProjectsBtn");
  const wrapper = document.getElementById("moreProjectsWrapper");

  if (!container || !projects) return;

  container.innerHTML = projects.map(proj => {
    const tagsHtml = (proj.tags || []).map(t => `
      <span class="tag-badge" style="font-size: 0.7rem; padding: 2px 6px;">${escapeHtml(t)}</span>
    `).join("");

    return `
      <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="project-card">
        <div class="project-header">
          <span class="project-title">
            ${escapeHtml(proj.title)}
            ${proj.badge ? `<span style="font-size: 0.72rem; color: var(--neon-green); font-family: var(--font-mono); font-weight: normal; background: rgba(0,248,1,0.1); padding: 1px 6px; border-radius: 4px; border: 1px solid var(--neon-green-border);">• ${escapeHtml(proj.badge)}</span>` : ''}
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
        ${tagsHtml ? `<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px;">${tagsHtml}</div>` : ''}
      </a>
    `;
  }).join("");

  // Render More Projects
  if (moreContainer && moreProjects && moreProjects.length) {
    moreContainer.innerHTML = moreProjects.map(p => `
      <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-card" style="border-style: dashed;">
        <div class="project-header">
          <span class="project-title">${escapeHtml(p.title)}</span>
          <div class="project-meta-right">
            <span class="star-count">${escapeHtml(p.stars)}</span>
            <span>${escapeHtml(p.language)}</span>
          </div>
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
      </a>
    `).join("");
  }

  // More Projects Toggle
  if (toggleBtn && wrapper) {
    let isOpen = false;
    toggleBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      wrapper.style.display = isOpen ? "block" : "none";
      toggleBtn.innerHTML = isOpen ? "Fewer projects &uarr;" : "More projects &darr;";
    });
  }
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
  allPrsList = ossData.prs || [];
  if (summaryEl && ossData.summary) {
    summaryEl.innerHTML = escapeHtml(ossData.summary).replace(
      /^60\+ merged pull requests/,
      '<strong style="color: var(--neon-green);">60+ merged pull requests</strong>'
    );
  }
  renderPrs(6); // Show first 6 by default

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isShowingAllPrs = !isShowingAllPrs;
      renderPrs(isShowingAllPrs ? allPrsList.length : 6);
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
      <div class="pr-github-badge" title="View PR on GitHub">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="pr-github-svg" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </div>
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
      <p class="hackathon-desc">${escapeHtml(h.description)}</p>
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
          <h4 class="achievement-title">
            ${item.url ? `
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;" class="inline-link">
                ${escapeHtml(item.title)} ↗
              </a>
            ` : escapeHtml(item.title)}
          </h4>
          <span class="achievement-badge">${escapeHtml(item.badge || item.date)}</span>
        </div>
        <p class="achievement-org">${escapeHtml(item.organization)}</p>
      </div>
      <p class="achievement-desc">${escapeHtml(item.description)}</p>
      ${item.url ? `
        <div style="margin-top: 10px;">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="section-link" style="font-size: 0.74rem; font-family: var(--font-mono); color: var(--neon-green);">
            Verify Credential ↗
          </a>
        </div>
      ` : ''}
    </div>
  `).join("");
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
    const email = emailDisplay?.textContent?.trim() || "ogmansi897@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
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

  const items = [
    { label: "Go to Work & Positions", category: "Section", action: () => scrollToId("work") },
    { label: "Go to Skills & Capabilities", category: "Section", action: () => scrollToId("skills") },
    { label: "Go to Featured Projects", category: "Section", action: () => scrollToId("projects") },
    { label: "Go to Open Source PRs", category: "Section", action: () => scrollToId("oss") },
    { label: "Go to Hackathons", category: "Section", action: () => scrollToId("hackathons") },
    { label: "Go to Certifications & Achievements", category: "Section", action: () => scrollToId("achievements") },
    { label: "Go to Highlights", category: "Section", action: () => scrollToId("highlights") },
    { label: "Copy Email: ogmansi897@gmail.com", category: "Action", action: () => document.getElementById("emailCopyBtn")?.click() },
    { label: "Open Resume (Google Drive)", category: "Action", action: () => window.open(data.personal?.resumeUrl || "https://drive.google.com/file/d/1CQHXZRh1yWA2Enri5Meutn20cpaJH83O/view?usp=sharing", "_blank") },
    { label: "Visit GitHub: @mansiverma897993", category: "Social", action: () => window.open("https://github.com/mansiverma897993", "_blank") },
    { label: "Visit Twitter / X: @MansiVe61115132", category: "Social", action: () => window.open(data.personal?.socials?.twitter || "https://x.com/MansiVe61115132", "_blank") },
    { label: "Visit LinkedIn Profile", category: "Social", action: () => window.open(data.personal?.socials?.linkedin || "https://www.linkedin.com/in/mansi-verma-4794a4328", "_blank") },
    { label: "Visit YouTube Channel (#ExpressByMansi)", category: "Social", action: () => window.open("https://www.youtube.com/hashtag/expressbymansi", "_blank") },
    { label: "Visit LeetCode: @mansiverma897", category: "Social", action: () => window.open(data.personal?.socials?.leetcode || "https://leetcode.com/u/mansiverma897/", "_blank") },
    { label: "Join Discord Community", category: "Social", action: () => window.open(data.personal?.socials?.discord || "https://discord.gg/missmv897_66227", "_blank") }
  ];

  // Add projects to search
  (data.projects || []).concat(data.moreProjects || []).forEach(p => {
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

  // Add PRs to search
  (data.openSource?.prs || []).forEach(pr => {
    items.push({
      label: `PR: ${pr.repo} - ${pr.title}`,
      category: "Open Source",
      action: () => window.open(pr.url, "_blank")
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

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePalette();
  });
}

/* --------------------------------------------------------------------------
   Resume Modal
   -------------------------------------------------------------------------- */
function setupResumeModal(resumeUrl) {
  const resumeBtn = document.getElementById("resumeBtn");
  const modal = document.getElementById("resumeModal");
  const closeBtn = document.getElementById("closeResumeBtn");
  const closeBtn2 = document.getElementById("closeResumeBtn2");

  const targetUrl = resumeUrl || "https://drive.google.com/file/d/1CQHXZRh1yWA2Enri5Meutn20cpaJH83O/view?usp=sharing";

  if (resumeBtn) {
    resumeBtn.href = targetUrl;
    resumeBtn.target = "_blank";
    resumeBtn.rel = "noopener noreferrer";
  }

  window.openResumeModal = function() {
    window.open(targetUrl, "_blank");
  };

  if (!modal) return;

  function closeModal() {
    modal.classList.remove("open");
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
