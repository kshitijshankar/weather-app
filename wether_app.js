// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 6bc7fbf822c169e5bbdcd7681dd2b929
'use strict'
const weatherApi = {
    key: "6bc7fbf822c169e5bbdcd7681dd2b929",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

// Event Lister function on keyPress
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13) {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('weather-body').style.display = 'block';
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    // console.log(dateManage(todayDate));
    date.innerHTML = dateManage(todayDate);
    console.log(weatherType.textContent);
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
    }
    else if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    else if(weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/ThunderStorm.jpg')";
    }
    else if(weatherType.textContent == 'Sunny') {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
}

// Date Manager
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    // console.log(day);

    return `${date} ${month} (${day}), ${year}`;
}