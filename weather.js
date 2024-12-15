import { dateForAPI, fullDate } from "./date.js";
import { elements } from "./queries.js";

const API_KEY = "T8D9TRR9998Y53VA37TUJ6AE2";
const UNIT_GROUP = {
    uk: "uk",
    us: "us"
};

const weatherBackgrounds = {
    "snow": "linear-gradient(to bottom, #A6D8F7, #B2D9F7)",           // Light ice blue to lighter blue
    "rain": "linear-gradient(to bottom, #4D6A75, #6B7B8C)",           // Dark slate blue to grayish blue
    "fog": "linear-gradient(to bottom, #B3B3B3, #D1D1D1)",            // Light gray to soft gray
    "wind": "linear-gradient(to bottom, #7A8C99, #9DAEB6)",           // Stormy gray-blue to soft steel blue
    "cloudy": "linear-gradient(to bottom, #6D7F7D, #8C9D96)",         // Dark gray-green to muted green
    "partly-cloudy-day": "linear-gradient(to bottom, #B1D9E5, #A1C9D4)", // Light sky blue to soft light blue
    "partly-cloudy-night": "linear-gradient(to bottom, #2A3B44, #37434F)", // Dark midnight blue to deep blue-gray
    "clear-day": "linear-gradient(to bottom, #58A6D4, #6BB1D6)",    // Clear sky blue to soft blue
    "clear-night": "linear-gradient(to bottom, #1A2B3C, #233145)"   // Deep navy blue to dark indigo
};

console.log(weatherBackgrounds['fog']);



elements.locationInput.addEventListener("keydown", enterPressed);
elements.searchButton.addEventListener("click", function () {
    search(elements.locationInput.value);
});

async function getWeather(location) {

    const unit = elements.cRadio.checked ? UNIT_GROUP.uk : UNIT_GROUP.us;
    const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateForAPI}?key=${API_KEY}&unitGroup=${unit}`;

    toggleLoading(true);

    try {
        const res = await fetch(API_URL, { mode: "cors" });
        if (!res.ok) {
            showError("Invalid location, please try again.");
            return;
        }

        const weatherData = await res.json();
        displayWeatherData(weatherData);
    } catch (err) {
        showError("An error occurred while fetching weather data.");
        console.error(err);
    } finally {
        toggleLoading(false);
    }
}

getWeather("Auckland");

function enterPressed(event) {
    if (event.key === "Enter") {
        search(elements.locationInput.value);
    }
}

function search(query) {
    getWeather(query);
}

function toggleLoading(isLoading) {
    elements.weatherDiv.style.display = isLoading ? "none" : "block";
    elements.loadingDiv.style.display = isLoading ? "flex" : "none";
}

function showError(message) {
    elements.loadingDiv.innerText = message;
}

function displayWeatherData(weatherData) {
    let today = weatherData.days[0];

    elements.dateStringDiv.innerText = fullDate;
    elements.addressDiv.innerText = weatherData.resolvedAddress;
    elements.weatherIconImg.src = `./img/${today.icon}.png`;
    elements.descriptionDiv.innerText = today.description;
    elements.highTempDiv.innerText = today.tempmax;
    elements.lowTempDiv.innerText = today.tempmin;
    document.body.style.background = weatherBackgrounds[today.icon];
    Array.from(elements.symbolPs).forEach(p => {
        p.innerText = `°${elements.cRadio.checked ? "C" : "F"}`
    });
}

export { getWeather };