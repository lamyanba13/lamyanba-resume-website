const printButton = document.querySelector("[data-print]");
const copyButton = document.querySelector("[data-copy]");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const value = copyButton.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      copyButton.textContent = "Email Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy Email";
      }, 1800);
    } catch {
      copyButton.textContent = value;
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));
