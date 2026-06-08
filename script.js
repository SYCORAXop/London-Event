const header = document.getElementById("site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.getElementById("primary-nav");
const form = document.getElementById("registration-form");
const formStatus = document.getElementById("form-status");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  primaryNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.innerHTML = isOpen
    ? '<i data-lucide="x" aria-hidden="true"></i>'
    : '<i data-lucide="menu" aria-hidden="true"></i>';
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024 && primaryNav.classList.contains("open")) {
    closeMenu();
  }
});

updateHeader();

const eventDate = new Date("2026-07-11T10:00:00+01:00").getTime();
const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const updateCountdown = () => {
  const distance = Math.max(0, eventDate - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  countdownFields.days.textContent = String(days).padStart(2, "0");
  countdownFields.hours.textContent = String(hours).padStart(2, "0");
  countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
  countdownFields.seconds.textContent = String(seconds).padStart(2, "0");
};

updateCountdown();
setInterval(updateCountdown, 1000);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  const originalContent = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = "Registering...";
  formStatus.textContent = "";

  window.setTimeout(() => {
    formStatus.textContent = "Thank you. Your interest has been registered for the London edition.";
    submitButton.innerHTML = originalContent;
    submitButton.disabled = false;
    form.reset();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 650);
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
