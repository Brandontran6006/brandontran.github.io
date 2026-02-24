// ---------- NAV underline + active tab ----------
const tabs = Array.from(document.querySelectorAll(".tab"));
const underline = document.querySelector(".tab-underline");
const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

const menuBtn = document.querySelector(".menu-btn");
const mobileDrawer = document.querySelector(".mobile-drawer");
const drawerLinks = Array.from(document.querySelectorAll(".drawer-link"));

function moveUnderlineTo(el) {
  if (!underline || !el) return;
  const parentRect = el.parentElement.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  underline.style.width = `${rect.width}px`;
  underline.style.left = `${rect.left - parentRect.left}px`;
}

function setActive(el) {
  tabs.forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  moveUnderlineTo(el);
}

window.addEventListener("load", () => {
  const active = document.querySelector(".tab.active") || tabs[0];
  moveUnderlineTo(active);
});

// ---------- Reveal on scroll ----------
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// ---------- Modal content ----------
const modalContent = {
  home: {
    title: "Home",
    body: `
      <h3>Quick intro</h3>
      <p>I’m Brandon Tran — focused on Technology Risk, ERP-enabled process improvement, and analytics.</p>
      <div class="pillrow">
        <span class="pill">Technology Risk</span>
        <span class="pill">SAP / ERP</span>
        <span class="pill">Power BI</span>
        <span class="pill">Excel VBA</span>
        <span class="pill">SQL</span>
      </div>
      <p>Use the tabs to view details (About, Skills, Works), or hit Contact to reach me fast.</p>
    `
  },
  about: {
    title: "About",
    body: `
      <h3>What I’m about</h3>
      <p>
        I’m a University of Houston student (MIS & Marketing, 3.97 GPA) with experience across technology risk,
        business systems, and strategy. I like projects where you have to connect people + process + systems
        and still deliver something measurable.
      </p>

      <h3>Why consulting / tech risk</h3>
      <ul>
        <li>Controls + governance mindset (ITGC / SOX / audit-readiness exposure)</li>
        <li>Strong stakeholder management (cross-functional + vendors)</li>
        <li>Data-driven execution (dashboards, automation, analytics)</li>
      </ul>
    `
  },
  skills: {
    title: "Skills",
    body: `
      <h3>Technical</h3>
      <div class="pillrow">
        <span class="pill">SAP (ERP workflow)</span>
        <span class="pill">Power BI</span>
        <span class="pill">Excel VBA</span>
        <span class="pill">SQL</span>
        <span class="pill">Data visualization</span>
      </div>

      <h3>Risk / consulting</h3>
      <div class="pillrow">
        <span class="pill">ITGC</span>
        <span class="pill">SOX 404</span>
        <span class="pill">NIST</span>
        <span class="pill">COBIT</span>
        <span class="pill">Control testing</span>
      </div>

      <h3>Strengths</h3>
      <ul>
        <li>Leading meetings + driving decisions</li>
        <li>Process mapping + requirement tracking</li>
        <li>Clear communication (exec-ready updates)</li>
      </ul>
    `
  },
  works: {
    title: "Works",
    body: `
      <h3>Endress+Hauser — Barcode Scanning Implementation (SAP)</h3>
      <ul>
        <li>Led meetings across operations + vendors; served as point of contact and kept the rollout moving</li>
        <li>Integrated barcode workflows with SAP to reduce manual data entry and speed up fulfillment</li>
        <li>Outcome: faster processing + less manual rework (your site headline shows the metrics)</li>
      </ul>

      <h3>Endress+Hauser — Expedited Orders Analytics</h3>
      <ul>
        <li>Analyzed 120,000+ expedited order records to identify bottlenecks</li>
        <li>Engineered solutions that reduced expedited orders and improved throughput</li>
      </ul>

      <h3>RSM — Technology Risk Consulting (Incoming)</h3>
      <ul>
        <li>Will support IT audit, SOX, and SOC engagements; focus on ITGC + ERP environments</li>
      </ul>

      <h3>Meta Case (Houston) — AI Moderation Strategy</h3>
      <ul>
        <li>Designed human-in-the-loop moderation concept to reduce backlog + increase efficiency</li>
      </ul>

      <div class="cta-row">
        <a href="resume.pdf" target="_blank" rel="noopener">Resume</a>
        <a href="https://linkedin.com/in/btran123" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    `
  },
  contact: {
    title: "Contact",
    body: `
      <h3>Reach me fast</h3>
      <p><strong>Email:</strong> <a href="mailto:BrandoonTran6006@gmail.com">BrandoonTran6006@gmail.com</a></p>
      <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/btran123" target="_blank" rel="noopener">linkedin.com/in/btran123</a></p>
      <p><strong>Resume:</strong> <a href="resume.pdf" target="_blank" rel="noopener">Open PDF</a></p>

      <div class="cta-row">
        <a href="mailto:BrandoonTran6006@gmail.com">Email me</a>
        <a href="resume.pdf" target="_blank" rel="noopener">Download resume</a>
      </div>
    `
  }
};

function openModal(key) {
  const content = modalContent[key];
  if (!content) return;

  modalTitle.textContent = content.title;
  modalBody.innerHTML = content.body;

  modal.classList.add("open");
  modalOverlay.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalOverlay.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modalOverlay.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalOverlay.setAttribute("aria-hidden", "true");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    setActive(tab);
    openModal(tab.dataset.modal);
  });
});

document.querySelectorAll("[data-modal]").forEach(btn => {
  // This includes mini buttons and card links
  if (btn.classList.contains("tab")) return;
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

document.getElementById("openWorks")?.addEventListener("click", () => openModal("works"));

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- Mobile drawer ----------
menuBtn.addEventListener("click", () => {
  const isOpen = mobileDrawer.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  mobileDrawer.setAttribute("aria-hidden", String(!isOpen));
});

drawerLinks.forEach(link => {
  link.addEventListener("click", () => {
    openModal(link.dataset.modal);
    mobileDrawer.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");

    // also sync active tab underline
    const match = tabs.find(t => t.dataset.modal === link.dataset.modal);
    if (match) setActive(match);
  });
});
