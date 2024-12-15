import { getWeather } from "./weather.js";
import { elements } from "./queries.js";

function initEventListeners() {
    elements.locationInput.addEventListener("keydown", enterPressed);
    elements.searchButton.addEventListener("click", () => {
        search(elements.locationInput.value);
    });
}

function enterPressed(event) {
    if (event.key === "Enter") {
        search(elements.locationInput.value);
    }
}

function search(query) {
    getWeather(query);
}

export { initEventListeners };
