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

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Modal content (rewritten to sound real, not template-y)
const modalContent = {
  home: {
    title: "Home",
    body: `
      <p>
        Here’s the quick version: I’m focused on <strong>Technology Risk</strong>, <strong>ERP workflows</strong>, and
        <strong>analytics that drive decisions</strong>.
      </p>
      <div class="pillrow">
        <span class="pill">ITGC / SOX</span>
        <span class="pill">SAP</span>
        <span class="pill">Power BI</span>
        <span class="pill">Excel VBA</span>
        <span class="pill">SQL</span>
      </div>
      <p>
        If you only click one thing, click <strong>Works</strong> — it’s the best snapshot of how I operate.
      </p>
    `
  },

  about: {
    title: "About",
    body: `
      <p>
        I’m Brandon — I like being the person who can translate between the business side and the technical side.
        Not just “analysis,” but actually pushing projects forward: running meetings, aligning stakeholders,
        documenting requirements, and shipping improvements.
      </p>

      <h3>What you’ll notice in how I work</h3>
      <ul>
        <li><strong>I take ownership.</strong> If something is unclear, I drive it to clarity (scope, requirements, next steps).</li>
        <li><strong>I communicate clean.</strong> Leaders don’t want noise — they want a clear status + what decisions are needed.</li>
        <li><strong>I care about measurable impact.</strong> Speed, accuracy, throughput, fewer errors — something you can point to.</li>
      </ul>

      <h3>Why Technology Risk</h3>
      <p>
        I like the controls mindset because it’s structured: what can fail, what evidence proves it’s working,
        and how do we explain it in a way that stands up to scrutiny.
      </p>
    `
  },

  skills: {
    title: "Skills",
    body: `
      <h3>Tools I’m comfortable with</h3>
      <div class="pillrow">
        <span class="pill">SAP (workflow)</span>
        <span class="pill">Power BI</span>
        <span class="pill">Excel VBA</span>
        <span class="pill">SQL</span>
        <span class="pill">Data visualization</span>
      </div>

      <h3>Risk / governance foundation</h3>
      <div class="pillrow">
        <span class="pill">ITGC</span>
        <span class="pill">SOX 404</span>
        <span class="pill">NIST</span>
        <span class="pill">COBIT</span>
        <span class="pill">Control testing</span>
      </div>

      <h3>What people usually rely on me for</h3>
      <ul>
        <li>Leading meetings and keeping cross-functional work on track</li>
        <li>Taking messy processes and turning them into something executable</li>
        <li>Building dashboards that are simple, fast, and decision-ready</li>
      </ul>
    `
  },

  works: {
    title: "Works",
    body: `
      <h3>Endress+Hauser — SAP barcode scanning rollout</h3>
      <ul>
        <li>Owned coordination across operations + vendors and ran the working meetings</li>
        <li>Tracked requirements, aligned stakeholders, and drove the rollout forward</li>
        <li>Integrated barcode workflows with SAP to cut manual entry and speed fulfillment</li>
      </ul>

      <h3>Endress+Hauser — expedited orders analytics</h3>
      <ul>
        <li>Analyzed <strong>120,000+</strong> order records to find bottlenecks</li>
        <li>Helped reduce expedited requests by <strong>25%</strong> and increase throughput by <strong>15%</strong></li>
      </ul>

      <h3>RSM — Technology Risk Consulting (Incoming)</h3>
      <ul>
        <li>Supporting IT audit / SOX / SOC work with a focus on ITGC and ERP environments</li>
      </ul>

      <h3>CUBIO — strategy consulting engagement</h3>
      <ul>
        <li>Worked on a team consulting engagement delivering research + recommendations to leadership</li>
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
      <p>If you’re reaching out about internships, tech risk, or business analyst roles — I’m easy to reach.</p>
      <p><strong>Email:</strong> <a href="mailto:BrandoonTran6006@gmail.com">BrandoonTran6006@gmail.com</a></p>
      <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/btran123" target="_blank" rel="noopener">linkedin.com/in/btran123</a></p>

      <div class="cta-row">
        <a href="mailto:BrandoonTran6006@gmail.com">Email me</a>
        <a href="resume.pdf" target="_blank" rel="noopener">Open resume</a>
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

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Mobile drawer
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

    const match = tabs.find(t => t.dataset.modal === link.dataset.modal);
    if (match) setActive(match);
  });
});
