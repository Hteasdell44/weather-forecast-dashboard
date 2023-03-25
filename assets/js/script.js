var textboxInput = document.querySelector('#textbox-input');
var searchButton = document.querySelector('#search-button');
var currentCityName = document.querySelector('#current-city');
var currentCityTemp = document.querySelector('#current-city-temp');
var currenctCityWind = document.querySelector('#current-city-wind');
var currenctCityHumidity = document.querySelector('#current-city-humidity');

var firstDateEl = document.querySelector('#forecast-day-one-date');
var firstTempEl = document.querySelector('#forecast-day-one-temp');
var firstWindEl = document.querySelector('#forecast-day-one-wind');
var firstHumidityEl = document.querySelector('#forecast-day-one-humidity');

var secondDateEl = document.querySelector('#forecast-day-two-date');
var secondTempEl = document.querySelector('#forecast-day-two-temp');
var secondWindEl = document.querySelector('#forecast-day-two-wind');
var secondHumidityEl = document.querySelector('#forecast-day-two-humidity');

var thirdDateEl = document.querySelector('#forecast-day-three-date');
var thirdTempEl = document.querySelector('#forecast-day-three-temp');
var thirdWindEl = document.querySelector('#forecast-day-three-wind');
var thirdHumidityEl = document.querySelector('#forecast-day-three-humidity');

var fourthDateEl = document.querySelector('#forecast-day-four-date');
var fourthTempEl = document.querySelector('#forecast-day-four-temp');
var fourthWindEl = document.querySelector('#forecast-day-four-wind');
var fourthHumidityEl = document.querySelector('#forecast-day-four-humidity');

var fifthDateEl = document.querySelector('#forecast-day-five-date');
var fifthTempEl = document.querySelector('#forecast-day-five-temp');
var fifthWindEl = document.querySelector('#forecast-day-five-wind');
var fifthHumidityEl = document.querySelector('#forecast-day-five-humidity');

var recentSearchTitleEl = document.querySelector('#recent-searches-title');

var clearButton = document.querySelector('#clear-search-button');

var apiKey = "6ce90c88d155a6f5f55b536cd0de7c48";

var previousUserInput;
var previousUserInputV2;
var userInput;
var recentSearchCardArr = [];

if (JSON.parse(localStorage.getItem("Recent Searches")) != null) {

    var recentSearches = JSON.parse(localStorage.getItem("Recent Searches"));

} else {

    recentSearches = [];
}


function getCoordinates() {

    if (textboxInput.value == "") {

        userInput = "San Diego";

    } else {

        userInput = textboxInput.value;
    }


    if (recentSearches.length <= 6) {

        recentSearches.push(userInput);
        localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));

    } else {

        recentSearches.shift();
        localStorage.removeItem("Recent Searches");
        recentSearches.push(userInput);
        localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));
    }

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=5&appid=" + apiKey;

    fetch(apiUrl)

        .then(function(response) {
            
            return response.json();
        })

        .then(function(data) {

            if (recentSearchCardArr.length >= 0) {
                
                displayRecentSearch(previousUserInput);
                previousUserInput = userInput;

            } else {

                previousUserInput = userInput;
                previousUserInputV2 = userInput;
            }

            if (data.length == 0) {

                alert("Hmm... Your search isn't showing any results. Please try entering another city.");
                return;
            }

            getForecast(data[0].lat, data[0].lon);
        })
    
    textboxInput.value = "";
}

function getForecast(lat, lon) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)

        .then(function(response) {

            return response.json();
        })

        .then(function(data) {

            displayForecast(data);
        })
} 

function displayForecast(location) {

    var currentDate = dayjs().format('M/D/YY');
    currentCityName.textContent = location.city.name + " (" + currentDate + ") ";
    currentCityTemp.textContent = "Current Temp: " + kelvinToFahrenheit(location.list[0].main.temp) + " ˚F";
    currenctCityWind.textContent = "Wind Speed: " + location.list[0].wind.speed + " MPH";
    currenctCityHumidity.textContent = "Humidity: " + location.list[0].main.humidity + "%";

    var currentCityImgEl = document.createElement("img");
    currentCityImgEl.src = "https://openweathermap.org/img/wn/" + location.list[0].weather[0].icon + "@2x.png";
    currentCityImgEl.style.marginTop = "-10vh";
    currentCityImgEl.style.marginBottom = "-5vh";
    var iconBackground = document.createElement("div");
    iconBackground.style.height = "3vh";
    iconBackground.style.width = "5vw";
    iconBackground.style.backgroundColor = "red";
    currentCityImgEl.appendChild(iconBackground);
    currentCityName.appendChild(currentCityImgEl);


    var firstDate = dayjs().add(1, 'day').format('M/D/YY');
    firstDateEl.textContent = firstDate;
    firstTempEl.textContent = "Temp: " + kelvinToFahrenheit(location.list[1].main.temp) + " ˚F";
    firstWindEl.textContent = "Wind: " + location.list[1].wind.speed + " MPH";
    firstHumidityEl.textContent = "Humidity: " + location.list[1].main.humidity + "%";

    var firstDateImgEl = document.createElement("img");
    firstDateImgEl.src = "https://openweathermap.org/img/wn/" + location.list[1].weather[0].icon + "@2x.png";
    firstDateImgEl.style.marginBottom = "-1vh";
    firstDateImgEl.style.marginLeft = ".4vw";
    firstDateImgEl.style.width = "2.5vw";
    firstDateEl.appendChild(firstDateImgEl);

    var secondDate = dayjs().add(2, 'day').format('M/D/YY');
    secondDateEl.textContent = secondDate;
    secondTempEl.textContent = "Temp: " + kelvinToFahrenheit(location.list[2].main.temp) + " ˚F";
    secondWindEl.textContent = "Wind: " + location.list[2].wind.speed + " MPH";
    secondHumidityEl.textContent = "Humidity: " + location.list[2].main.humidity + "%";

    var secondDateImgEl = document.createElement("img");
    secondDateImgEl.src = "https://openweathermap.org/img/wn/" + location.list[2].weather[0].icon + "@2x.png";
    secondDateImgEl.style.marginBottom = "-1vh";
    secondDateImgEl.style.width = "2.5vw";
    secondDateEl.appendChild(secondDateImgEl);

    var thirdDate = dayjs().add(3, 'day').format('M/D/YY');
    thirdDateEl.textContent = thirdDate;
    thirdTempEl.textContent = "Temp: " + kelvinToFahrenheit(location.list[3].main.temp) + " ˚F";
    thirdWindEl.textContent = "Wind: " + location.list[3].wind.speed + " MPH";
    thirdHumidityEl.textContent = "Humidity: " + location.list[3].main.humidity + "%";

    var thirdDateImgEl = document.createElement("img");
    thirdDateImgEl.src = "https://openweathermap.org/img/wn/" + location.list[2].weather[0].icon + "@2x.png";
    thirdDateImgEl.style.marginBottom = "-1vh";
    thirdDateImgEl.style.width = "2.5vw";
    thirdDateEl.appendChild(thirdDateImgEl);

    var fourthDate = dayjs().add(4, 'day').format('M/D/YY');
    fourthDateEl.textContent = fourthDate;
    fourthTempEl.textContent = "Temp: " + kelvinToFahrenheit(location.list[4].main.temp) + " ˚F";
    fourthWindEl.textContent = "Wind: " + location.list[4].wind.speed + " MPH";
    fourthHumidityEl.textContent = "Humidity: " + location.list[4].main.humidity + "%";

    var fourthDateImgEl = document.createElement("img");
    fourthDateImgEl.src = "https://openweathermap.org/img/wn/" + location.list[2].weather[0].icon + "@2x.png";
    fourthDateImgEl.style.marginBottom = "-1vh";
    fourthDateImgEl.style.width = "2.5vw";
    fourthDateEl.appendChild(fourthDateImgEl);

    var fifthDate = dayjs().add(5, 'day').format('M/D/YY');
    fifthDateEl.textContent = fifthDate;
    fifthTempEl.textContent = "Temp: " + kelvinToFahrenheit(location.list[5].main.temp) + " ˚F";
    fifthWindEl.textContent = "Wind: " + location.list[5].wind.speed + " MPH";
    fifthHumidityEl.textContent = "Humidity: " + location.list[5].main.humidity + "%";

    var fifthDateImgEl = document.createElement("img");
    fifthDateImgEl.src = "https://openweathermap.org/img/wn/" + location.list[2].weather[0].icon + "@2x.png";
    fifthDateImgEl.style.marginBottom = "-1vh";
    fifthDateImgEl.style.width = "2.5vw";
    fifthDateEl.appendChild(fifthDateImgEl);
}

function kelvinToFahrenheit(tempKelvin) {

    return (((tempKelvin-273.15)*1.8) + 32).toFixed();
}

function displayRecentSearch(name) {

    // When we are trying to display a new recent search, the first thing we do is iterate through the existing recent search cards and see if any of them have the same name.

    for (var i = 0; i < recentSearchCardArr.length; i++) {

        if (recentSearchCardArr[i].innerText == name) {

            return;
        }
    }

    // Next, if the array containing the recent search cards has less than five elements, we'll create a new recent search card 

    if (recentSearchCardArr.length < 5) {

        if (recentSearchTitleEl.childNodes.length == 6) {

            recentSearchCardArr.shift();
            recentSearchTitleEl.removeChild(recentSearchTitleEl.childNodes[1]);
        }

        var recentSearchCardEl = document.createElement("div");
        recentSearchCardEl.style.width = "20vw";
        recentSearchCardEl.style.height = "5vh";
        recentSearchCardEl.style.backgroundColor = "orange";
        recentSearchCardEl.style.boxShadow = "3px 3px 8px black";
        recentSearchCardEl.style.marginTop = "4vh";
        recentSearchCardEl.style.paddingTop = "1vh";
        recentSearchCardEl.style.cursor = "pointer";
        recentSearchCardEl.textContent = name;
        recentSearchCardEl.style.color = "white";
        recentSearchCardEl.style.fontSize = "24px";

        // If there was no name value, don't finish making the card. 
        if (recentSearchCardEl.textContent == "") {

            recentSearchCardEl.remove();
            return;
        }

        // Append the new recent search card in the "Recent Searches:" menu and add event listener.
        recentSearchTitleEl.appendChild(recentSearchCardEl);
        recentSearchCardEl.addEventListener("click", searchRecent);
        recentSearchCardEl.onmouseover = function() {recentSearchCardEl.style.fontSize = "32px"};
        recentSearchCardEl.onmouseleave = function() {recentSearchCardEl.style.fontSize = "24px"};
        
        // Add new recent search card to array of existing recent search cards.
        recentSearchCardArr.push(recentSearchCardEl);
        localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));
        

    // Else, if the array has five cards or more, we'll...

    } else {

        // Delete the oldest/first card from the array.
        recentSearchCardArr.shift();

        // Next, we'll make a new card.
        var recentSearchCardEl = document.createElement("div");
        recentSearchCardEl.style.width = "20vw";
        recentSearchCardEl.style.height = "5vh";
        recentSearchCardEl.style.backgroundColor = "orange";
        recentSearchCardEl.style.boxShadow = "3px 3px 8px black";
        recentSearchCardEl.style.marginTop = "4vh";
        recentSearchCardEl.style.paddingTop = "1vh";
        recentSearchCardEl.style.cursor = "pointer";
        recentSearchCardEl.style.color = "white";
        recentSearchCardEl.style.fontSize = "24px";

        // If there was no name value, don't finish making the card.
        recentSearchCardEl.textContent = name;

        if (recentSearchCardEl.textContent == "") {
            recentSearchCardEl.remove();
            return;

        }
        // Remove the second child node from the title element which is the first listed recent search card.
        recentSearchTitleEl.removeChild(recentSearchTitleEl.childNodes[1]);
         
        // Append the new recent search card in the "Recent Searches:" menu and add event listener. 
        recentSearchTitleEl.appendChild(recentSearchCardEl);
        recentSearchCardEl.addEventListener("click", searchRecent);
        recentSearchCardEl.onmouseover = function() {recentSearchCardEl.style.fontSize = "32px"};
        recentSearchCardEl.onmouseleave = function() {recentSearchCardEl.style.fontSize = "24px"};

        // Add new recent search card to array of existing recent search cards.
        recentSearchCardArr.push(recentSearchCardEl);
        localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));
    }
}

function searchRecent(event) {

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + event.target.innerText + "&limit=5&appid=" + apiKey;

    fetch(apiUrl)

        .then(function(response) {

            return response.json();
        })

        .then(function(data) {

            if (data.length == 0) {

                alert("Hmm... Your search isn't showing any results. Please try entering another city.");
                return;
            }

            getForecast(data[0].lat, data[0].lon);
            displayRecentSearch(previousUserInputV2);
        })

    previousUserInputV2 = userInput;
}

function displayRecentSearchOnLoad() {

    if (JSON.parse(localStorage.getItem("Recent Searches")) == null) {

        return;
    }

    for (var i = 0; i < JSON.parse(localStorage.getItem("Recent Searches")).length; i++) {

        displayRecentSearch(JSON.parse(localStorage.getItem("Recent Searches"))[i]);
    }
}

function handleClear() {

    if (confirm("Are you sure? This will delete your previous search history.")) {

        localStorage.clear();

        while (recentSearchTitleEl.firstChild) {
            
            recentSearchTitleEl.removeChild(recentSearchTitleEl.firstChild);
        }
    
        recentSearchTitleEl.textContent = "Recent Searches:"
        recentSearchCardArr = [];
    }
}

getCoordinates();
displayRecentSearchOnLoad();
searchButton.addEventListener("click", getCoordinates);
textboxInput.addEventListener("keydown", function (e) {

    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        getCoordinates();
    }
});
clearButton.addEventListener("click", handleClear);
