const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const yearOutput = document.querySelector("#current-year");
const modifiedOutput = document.querySelector("#last-modified");
const filterLinks = document.querySelectorAll("[data-filter]");
const templeCards = document.querySelectorAll(".temple-card");

// Display the current year dynamically.
if (yearOutput) {
  yearOutput.textContent = new Date().getFullYear();
}

// Display the last-modified date in YYYY-MM-DD format for HTML validation.
if (modifiedOutput) {
  const modifiedDate = new Date(document.lastModified);

  if (!Number.isNaN(modifiedDate.getTime())) {
    const isoDate = modifiedDate.toISOString().slice(0, 10);
    modifiedOutput.dateTime = isoDate;
    modifiedOutput.textContent = isoDate;
  }
}

// Open and close the mobile navigation menu.
function setMenuOpen(open) {
  if (!menuButton || !navigation) {
    return;
  }

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );
  navigation.classList.toggle("is-open", open);
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });
}

// Filter the temple cards from the navigation links.
filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedFilter = link.dataset.filter;

    filterLinks.forEach((item) => {
      const isActive = item === link;
      item.classList.toggle("is-active", isActive);

      if (isActive) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    templeCards.forEach((card) => {
      const year = Number(card.dataset.year);
      const size = card.dataset.size;

      const matches =
        selectedFilter === "all" ||
        (selectedFilter === "old" && year < 1900) ||
        (selectedFilter === "new" && year >= 2000) ||
        (selectedFilter === "large" && size === "large") ||
        (selectedFilter === "small" && size === "small");

      card.hidden = !matches;
    });

    setMenuOpen(false);
  });
});

// Reset the mobile menu state when changing to desktop width.
const desktopViewport = window.matchMedia("(min-width: 700px)");

desktopViewport.addEventListener("change", () => {
  setMenuOpen(false);
});