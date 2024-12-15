import { dateForAPI, fullDate } from "./date.js";
import { elements } from "./queries.js";

let API_key = "T8D9TRR9998Y53VA37TUJ6AE2";
let bog = "jump";

elements.locationInput.addEventListener("keydown", enterPressed);
elements.searchButton.addEventListener("click", function () {
    search(elements.locationInput.value);
});

async function getWeather(location) {
    let API_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateForAPI}?key=${API_key}&unitGroup=uk`;
    elements.weatherDiv.style.display = "none";
    elements.loadingDiv.style.display = "flex";
    let res = await fetch(API_url, { mode: "cors" }).catch((err) => {
        console.log(err);
    });
    if (!res.ok) {
        elements.loadingDiv.innerText = 'Inavlid location, please try again.'
        console.log('response error')
        return false
    }
    let weatherData = await res.json().catch((err) => console.log(err));
    let today = weatherData.days[0];
    bog = weatherData;

    elements.dateStringDiv.innerText = fullDate;
    elements.addressDiv.innerText = weatherData.resolvedAddress;
    elements.weatherIconImg.src = `./img/${today.icon}.png`;
    elements.descriptionDiv.innerText = today.description;
    elements.highTempDiv.innerText = today.tempmax;
    elements.lowTempDiv.innerText = today.tempmin;

    elements.weatherDiv.style.display = "block";
    elements.loadingDiv.style.display = "none";
    console.log(weatherData);

    // weatherDiv.innerText = JSON.stringify(today);
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
