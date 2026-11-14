const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/4e47429c6ce95afa09578b5a4f791b4a09160a6d/full/800,/0/default"
  },
  {
    templeName: "Orem Utah",
    location: "Orem, Utah, United States",
    dedicated: "2024, January, 21",
    area: 71998,
    imageUrl:
      "https://newsroom.churchofjesuschrist.org/media/960x540/0f5ca6314cd111ee999deeeeac1e61eaad855727.jpeg"
  },
  {
    templeName: "Raleigh North Carolina",
    location: "Raleigh, North Carolina, United States",
    dedicated: "1999, September, 18",
    area: 12864,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/925c33ef7219357c64f49c76a0e07460fe1d2835/full/%2C500/0/default"
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
  location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

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