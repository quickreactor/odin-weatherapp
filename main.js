import { initEventListeners } from "./events.js";
import { getWeather } from "./weather.js";



function init() {
    initEventListeners();
    getWeather("Auckland");  // Default location
}

init();
