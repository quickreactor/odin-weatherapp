let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

let elements = {
    addressDiv: $('#address'),
    weatherDiv : $("#weather-info"),
    weatherIconImg : $("#weather-icon"),
    dateStringDiv : $('#date-string'),
    descriptionDiv : $('#description'),
    highTempDiv : $('#high-temp'),
    lowTempDiv : $('#low-temp'),
    locationInput : $('#location-input'),
    searchButton : $('#search-button'),
    loadingDiv : $('#loading'),
    
    
}

export { elements }