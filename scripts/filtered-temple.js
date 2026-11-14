const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-utah.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo-guam.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-dc.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/lima-peru.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/mexico-city-mexico.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/rome-italy.jpg"
  },
  {
    templeName: "Orem Utah",
    location: "Orem, Utah, United States",
    dedicated: "2024, January, 21",
    area: 71998,
    imageUrl: "images/orem-utah.jpg"
  },
  {
    templeName: "Raleigh North Carolina",
    location: "Raleigh, North Carolina, United States",
    dedicated: "1999, September, 18",
    area: 12864,
    imageUrl: "images/raleigh-north-carolina.jpg"
  }
];

const gallery = document.querySelector(".gallery");
const navigationLinks = document.querySelectorAll("nav a");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

function getDedicatedYear(temple) {
  return Number(temple.dedicated.split(",")[0]);
}

function createTempleCard(temple) {
  const card = document.createElement("figure");
  card.classList.add("temple-card");

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = `${temple.templeName} Temple`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  const caption = document.createElement("figcaption");

  const name = document.createElement("h3");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  const locationLabel = document.createElement("span");
  locationLabel.classList.add("label");
  locationLabel.textContent = "Location:";
  location.append(locationLabel, ` ${temple.location}`);

  const dedicated = document.createElement("p");
  const dedicatedLabel = document.createElement("span");
  dedicatedLabel.classList.add("label");
  dedicatedLabel.textContent = "Dedicated:";
  dedicated.append(dedicatedLabel, ` ${temple.dedicated}`);

  const area = document.createElement("p");
  const areaLabel = document.createElement("span");
  areaLabel.classList.add("label");
  areaLabel.textContent = "Size:";
  area.append(areaLabel, ` ${temple.area.toLocaleString()} sq ft`);

  caption.append(name, location, dedicated, area);
  card.append(image, caption);

  return card;
}

function displayTemples(templeList) {
  gallery.replaceChildren();

  templeList.forEach((temple) => {
    gallery.appendChild(createTempleCard(temple));
  });
}

function filterTemples(filter) {
  let filteredTemples = temples;

  if (filter === "old") {
    filteredTemples = temples.filter(
      (temple) => getDedicatedYear(temple) < 1900
    );
  } else if (filter === "new") {
    filteredTemples = temples.filter(
      (temple) => getDedicatedYear(temple) > 2000
    );
  } else if (filter === "large") {
    filteredTemples = temples.filter((temple) => temple.area > 90000);
  } else if (filter === "small") {
    filteredTemples = temples.filter((temple) => temple.area < 10000);
  }

  displayTemples(filteredTemples);
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.textContent.trim().toLowerCase();
    filterTemples(filter);

    navigationLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    link.classList.add("active");

    if (navigation) {
      navigation.classList.remove("open");
    }

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

if (menuButton && navigation) {
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentYear = document.querySelector("#currentyear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
  lastModified.textContent = `Last modified: ${document.lastModified}`;
}

displayTemples(temples);