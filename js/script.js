/* ============================================================
   PORTFOLIO SCRIPT
   Each feature is written as its own function and only wires
   itself up if the elements it needs exist on the current page.
   That keeps one script.js safe to load on all six pages.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initActiveNavLink();
  initScrollTopButton();
  initTypingEffect();
  initSkillBars();
  initProjectFilter();
  initImageModal();
  initAccordion();
  initContactForm();
  initFooterYear();
});

/* ------------------------------------------------------------
   1. DARK / LIGHT MODE (with localStorage persistence)
   ------------------------------------------------------------ */
function initThemeToggle() {
  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggles = document.querySelectorAll("[data-theme-toggle]");

  // Apply saved preference, or fall back to the visitor's OS preference.
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  });
}

/* ------------------------------------------------------------
   2. MOBILE NAVIGATION (hamburger drawer)
   ------------------------------------------------------------ */
function initMobileNav() {
  const hamburger = document.querySelector("[data-hamburger]");
  const drawer = document.querySelector("[data-mobile-drawer]");
  if (!hamburger || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the drawer whenever a nav link inside it is chosen.
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Close on Escape for keyboard users.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
}

/* ------------------------------------------------------------
   3. ACTIVE NAVIGATION LINK
   Highlights whichever nav link matches the current page,
   in both the sidebar and the mobile drawer.
   ------------------------------------------------------------ */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ------------------------------------------------------------
   4. SCROLL-TO-TOP BUTTON
   ------------------------------------------------------------ */
function initScrollTopButton() {
  const btn = document.querySelector("[data-scroll-top]");
  if (!btn) return;

  const toggleVisibility = () => {
    btn.classList.toggle("is-visible", window.scrollY > 420);
  };
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ------------------------------------------------------------
   5. TYPING EFFECT (Home hero role line)
   ------------------------------------------------------------ */
function initTypingEffect() {
  const el = document.querySelector("[data-typing]");
  if (!el) return;

  let roles = [];
  try {
    roles = JSON.parse(el.getAttribute("data-typing"));
  } catch (err) {
    roles = ["Web Developer"];
  }

  const textNode = document.createElement("span");
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "|";
  el.textContent = "";
  el.append(textNode, cursor);

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      textNode.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(tick, 1400); // pause at full word
        return;
      }
    } else {
      charIndex--;
      textNode.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }

  tick();
}

/* ------------------------------------------------------------
   6. SKILL BAR ANIMATION (animates into view once, on Skills page)
   ------------------------------------------------------------ */
function initSkillBars() {
  const bars = document.querySelectorAll("[data-skill-level]");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-skill-level");
          bar.style.width = level + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ------------------------------------------------------------
   7. PROJECT FILTERING (Projects page)
   ------------------------------------------------------------ */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-project-tags]");
  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const tags = card.getAttribute("data-project-tags").split(",");
        const show = filter === "all" || tags.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

/* ------------------------------------------------------------
   8. IMAGE MODAL / LIGHTBOX (Projects page)
   ------------------------------------------------------------ */
function initImageModal() {
  const overlay = document.querySelector("[data-modal-overlay]");
  if (!overlay) return;

  const modalImg = overlay.querySelector("[data-modal-image]");
  const modalCaption = overlay.querySelector("[data-modal-caption]");
  const closeBtn = overlay.querySelector("[data-modal-close]");

  function openModal(src, alt, caption) {
    modalImg.src = src;
    modalImg.alt = alt;
    modalCaption.textContent = caption;
    overlay.classList.add("is-open");
    closeBtn.focus();
  }
  function closeModal() {
    overlay.classList.remove("is-open");
    modalImg.src = "";
  }

  document.querySelectorAll("[data-modal-trigger]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const img = thumb.querySelector("img");
      openModal(img.src, img.alt, thumb.getAttribute("data-caption") || img.alt);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });
}

/* ------------------------------------------------------------
   9. ACCORDION (Resume page)
   ------------------------------------------------------------ */
function initAccordion() {
  const items = document.querySelectorAll("[data-accordion-item]");
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector("[data-accordion-trigger]");
    const panel = item.querySelector("[data-accordion-panel]");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close the others so only one section is open at a time.
      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector("[data-accordion-panel]").style.maxHeight = null;
        other.querySelector("[data-accordion-trigger]").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Open the first section by default.
  if (items[0]) items[0].querySelector("[data-accordion-trigger]").click();
}

/* ------------------------------------------------------------
   10. CONTACT FORM VALIDATION
   ------------------------------------------------------------ */
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const messageField = form.querySelector("#message");
  const charCount = form.querySelector("[data-char-count]");

  const rules = {
    name: (value) => {
      if (!value.trim()) return "Enter your name.";
      if (value.trim().length < 2) return "Name should be at least 2 characters.";
      return "";
    },
    email: (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Enter your email address.";
      if (!pattern.test(value.trim())) return "Enter a valid email address.";
      return "";
    },
    subject: (value) => {
      if (!value.trim()) return "Enter a subject.";
      return "";
    },
    message: (value) => {
      if (!value.trim()) return "Write a message before sending.";
      if (value.trim().length < 20) return "Message should be at least 20 characters.";
      return "";
    },
  };

  function showError(field, error) {
    const group = field.closest(".form-group");
    const errorEl = group.querySelector(".field-error");
    if (error) {
      group.classList.add("has-error");
      errorEl.textContent = error;
    } else {
      group.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;
    const error = rule(field.value);
    showError(field, error);
    return !error;
  }

  // Live validation as the visitor types or leaves a field.
  Object.keys(rules).forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-group").classList.contains("has-error")) {
        validateField(field);
      }
    });
  });

  // Live character counter for the message field.
  if (messageField && charCount) {
    const updateCount = () => {
      charCount.textContent = `${messageField.value.length} characters`;
    };
    messageField.addEventListener("input", updateCount);
    updateCount();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    let isValid = true;
    Object.keys(rules).forEach((name) => {
      const field = form.querySelector(`[name="${name}"]`);
      if (field && !validateField(field)) isValid = false;
    });

    if (!isValid) {
      status.classList.add("is-error");
      status.textContent = "Please fix the highlighted fields and try again.";
      status.style.display = "block";
      return;
    }

    // No backend is connected in this student project, so the
    // "send" is simulated. Swap this block for a real request
    // (e.g. to Formspree, EmailJS, or your own API) when needed.
    status.classList.add("is-success");
    status.textContent = "Thanks! Your message has been validated and is ready to send once a backend is connected.";
    status.style.display = "block";
    form.reset();
    if (charCount) charCount.textContent = "0 characters";
  });
}

/* ------------------------------------------------------------
   11. FOOTER YEAR (small nicety, keeps copyright accurate)
   ------------------------------------------------------------ */
function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
