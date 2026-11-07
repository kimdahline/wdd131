const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const yearOutput = document.querySelector("#current-year");
const modifiedOutput = document.querySelector("#last-modified");
const filterLinks = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".temple-card");

// Populate both footer dates dynamically.
if (yearOutput) yearOutput.textContent = new Date().getFullYear();
if (modifiedOutput) {
  const modifiedDate = new Date(document.lastModified);
  modifiedOutput.dateTime = modifiedDate.toISOString();
  modifiedOutput.textContent = modifiedDate.toLocaleString(undefined, {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

function setMenuOpen(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  navigation.classList.toggle("is-open", open);
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

// Close the mobile menu after choosing a filter.
filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = link.dataset.filter;
    filterLinks.forEach((item) => {
      const active = item === link;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    cards.forEach((card) => {
      const year = Number(card.dataset.year);
      const matches = filter === "all"
        || (filter === "old" && year < 1900)
        || (filter === "new" && year >= 2000)
        || (filter === "large" && card.dataset.size === "large")
        || (filter === "small" && card.dataset.size === "small");
      card.hidden = !matches;
    });
    setMenuOpen(false);
  });
});

// Keep the menu state correct when resizing between mobile and desktop.
window.matchMedia("(min-width: 700px)").addEventListener("change", () => setMenuOpen(false));
