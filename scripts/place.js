document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last modified: ${document.lastModified}`;

const temperature = 10;
const windSpeed = 5;

function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16;
}

const windChillElement = document.querySelector("#windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent =
        `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}