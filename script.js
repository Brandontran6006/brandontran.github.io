// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close mobile menu on link click
mobileMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") mobileMenu.classList.remove("open");
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

reveals.forEach((el) => io.observe(el));

// Modal logic
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const modalContent = {
  barcode: {
    title: "Barcode Scanning + SAP (Endress+Hauser)",
    body: `
      <p>
        This project was about getting out of manual entry and into a workflow that could scale.
        I was the main point of contact between the Gas Measurement team and external vendors, and I led
        working meetings to keep decisions moving.
      </p>

      <h3>My role</h3>
      <ul>
        <li>Main point of contact between internal team and vendors</li>
        <li>Coordinated and led meetings with software vendors</li>
        <li>Supported workflow changes tied into SAP to improve fulfillment</li>
      </ul>

      <h3>Impact</h3>
      <ul>
        <li>Eliminated 75% of manual data entry</li>
        <li>Accelerated fulfillment speed by 40%</li>
        <li>Drove three division-wide process enhancements</li>
      </ul>

      <p style="margin-top:12px; opacity:.85;">
        Note: I’m not posting internal slides or customer data — just the work and outcomes at a high level.
      </p>
    `
  },

  expedited: {
    title: "Expedited Orders Analytics (Endress+Hauser)",
    body: `
      <p>
        I analyzed expedited order trends to find what was driving urgency and where the process was breaking down.
        The goal was to help production treat expedites as exceptions, not the default.
      </p>

      <h3>What I did</h3>
      <ul>
        <li>Analyzed 120,000+ expedited order records to identify bottlenecks</li>
        <li>Built automated dashboards using Excel VBA and Power BI</li>
        <li>Created reporting leaders could actually use to plan and prioritize</li>
      </ul>

      <h3>Results</h3>
      <ul>
        <li>Reduced urgent requests by 25%</li>
        <li>Increased throughput by 15%</li>
        <li>Cut reporting time by 40%</li>
      </ul>

      <p style="margin-top:12px; opacity:.85;">
        I can add your own project photos here (not internal screenshots) if you want the case study to feel more visual.
      </p>
    `
  },

  meta: {
    title: "Meta AI Case Project (Business Planning Consultant)",
    body: `
      <p>
        For a Meta case project, I helped design a moderation workflow that combines AI automation with human-in-the-loop
        checkpoints. The goal was speed without sacrificing compliance and quality.
      </p>

      <h3>What we built</h3>
      <ul>
        <li>AI-driven moderation workflow with human validation at key points</li>
        <li>Operating model focused on scale, consistency, and clear ownership</li>
        <li>Recommendations designed for pilot-to-scale rollout</li>
      </ul>

      <h3>Projected impact</h3>
      <ul>
        <li>Reduced content backlog by 20% across five pilot teams</li>
        <li>Projected 12% reduction in review costs</li>
        <li>Projected 30% improvement in moderation efficiency</li>
      </ul>
    `
  }
};

function openModal(key) {
  const content = modalContent[key];
  if (!content) return;

  modalTitle.textContent = content.title;
  modalBody.innerHTML = content.body;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-modal]");
  if (btn) openModal(btn.getAttribute("data-modal"));

  if (e.target.matches("[data-close]")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
