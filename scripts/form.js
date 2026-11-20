// Product Array Data Source
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// 1. Populate Product Name <select> options (runs on form.html)
const productSelect = document.querySelector("#productName");

if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    // Capitalize first letter of each word for clean display
    option.textContent = product.name.replace(/\b\w/g, (char) => char.toUpperCase());
    productSelect.appendChild(option);
  });
}

// 2. Track and increment review counter using localStorage (runs on review.html)
const reviewCountDisplay = document.querySelector("#reviewCount");

if (reviewCountDisplay) {
  // Retrieve current count from localStorage (defaults to 0 if none exists)
  let reviewCount = Number(window.localStorage.getItem("numReviews-ls")) || 0;

  // Increment counter by 1 on page load
  reviewCount++;

  // Save updated count back to localStorage and display it
  window.localStorage.setItem("numReviews-ls", reviewCount);
  reviewCountDisplay.textContent = reviewCount;
}

// 3. Common Footer Dates (runs on both pages)
const currentYearSpan = document.querySelector("#currentyear");
const lastModifiedPara = document.querySelector("#lastModified");

if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedPara) {
  lastModifiedPara.textContent = `Last Modification: ${document.lastModified}`;
}