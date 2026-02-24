const menuBtn = document.querySelector(".menu-btn");
const mobileDrawer = document.querySelector(".mobile-drawer");

// Nav underline animation
const tabs = Array.from(document.querySelectorAll(".nav-links .tab"));
const underline = document.querySelector(".tab-underline");

function moveUnderlineTo(el) {
  if (!underline || !el) return;
  const parentRect = el.parentElement.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  underline.style.width = `${rect.width}px`;
  underline.style.left = `${rect.left - parentRect.left}px`;
}

function setActiveByHash() {
  const hash = window.location.hash || "#home";
  const match = tabs.find(a => a.getAttribute("href") === hash) || tabs[0];

  tabs.forEach(t => t.classList.remove("active"));
  match.classList.add("active");
  moveUnderlineTo(match);
}

window.addEventListener("load", () => {
  setActiveByHash();
  document.getElementById("year").textContent = new Date().getFullYear();
});
window.addEventListener("hashchange", setActiveByHash);
window.addEventListener("resize", setActiveByHash);

tabs.forEach(t => t.addEventListener("click", () => {
  tabs.forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  moveUnderlineTo(t);
}));

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Mobile drawer
menuBtn.addEventListener("click", () => {
  const isOpen = mobileDrawer.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  mobileDrawer.setAttribute("aria-hidden", String(!isOpen));
});

// Close drawer when clicking a link
document.querySelectorAll(".drawer-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileDrawer.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
  });
});

// Modal (for “Read more” buttons only)
const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

const modalContent = {
  about: {
    title: "About (full)",
    body: `
      <p>
        I’m Brandon. I’m really into work where you have to connect the dots between people, process, and systems.
        I don’t love “busywork” — I like ownership, clarity, and outcomes.
      </p>

      <h3>What I’m good at</h3>
      <ul>
        <li>Leading working sessions and keeping teams aligned on decisions and next steps</li>
        <li>Taking unclear requirements and turning them into something executable</li>
        <li>Building decision-ready reporting that leadership actually trusts</li>
      </ul>

      <h3>Outside of work</h3>
      <ul>
        <li>Mini roadtrips about twice a month</li>
        <li>Pickleball and working out</li>
        <li>Trying new food spots (I’m a big foodie)</li>
      </ul>
    `
  },
  skills: {
    title: "Skills (detail)",
    body: `
      <h3>Systems and delivery</h3>
      <ul>
        <li>SAP workflow thinking, rollout support, vendor coordination, requirements tracking</li>
        <li>Stakeholder management and clear status communication</li>
      </ul>

      <h3>Analytics and automation</h3>
      <ul>
        <li>Power BI dashboards and KPI reporting</li>
        <li>Excel automation (VBA), cleanup, and performance improvements</li>
        <li>SQL foundations for querying and analysis</li>
      </ul>

      <h3>Technology Risk foundation</h3>
      <ul>
        <li>ITGC and SOX mindset; documenting and validating what “good” looks like</li>
        <li>Interest in ERP controls, governance, and audit-ready processes</li>
      </ul>
    `
  },
  works: {
    title: "Works (highlights)",
    body: `
      <h3>Endress+Hauser · Business Systems Analyst Intern</h3>
      <ul>
        <li>Led SAP-connected barcode scanning rollout with vendors and cross-functional stakeholders</li>
        <li>Analyzed 120,000+ order records; reduced expedited requests by 25% and improved throughput by 15%</li>
        <li>Built reporting that improved decision speed and visibility</li>
      </ul>

      <h3>CUBIO Innovation Hub · Business Strategy Consulting Intern</h3>
      <ul>
        <li>Consulting-style engagement: research, synthesis, and leadership-ready recommendations</li>
        <li>Worked on an 8-person team supporting growth and partnerships</li>
      </ul>

      <h3>RSM · Incoming Technology Risk Consulting Intern</h3>
      <ul>
        <li>Building depth in ITGC, SOX, and ERP control environments</li>
      </ul>

      <div class="cta-row">
        <a href="resume.pdf" target="_blank" rel="noopener">Resume</a>
        <a href="mailto:BrandoonTran6006@gmail.com">Email</a>
      </div>
    `
  },
  contact: {
    title: "Contact",
    body: `
      <p><strong>Email:</strong> <a href="mailto:BrandoonTran6006@gmail.com">BrandoonTran6006@gmail.com</a></p>
      <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/btran123" target="_blank" rel="noopener">linkedin.com/in/btran123</a></p>
      <p><strong>Resume:</strong> <a href="resume.pdf" target="_blank" rel="noopener">Open resume</a></p>
      <div class="cta-row">
        <a href="mailto:BrandoonTran6006@gmail.com">Email me</a>
        <a href="resume.pdf" target="_blank" rel="noopener">Resume</a>
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

document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
