// Setting Up the API
const api = {
    key: "751cf99b011729693acfd27fbd852c04",
    base: "https://api.openweathermap.org/data/2.5/"
};

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("weatherApp");

    // Function to Create App Structure
    const createAppStructure = () => {
        const main = document.createElement("main");

        // Creating and Appending Header
        const header = document.createElement("div");
        header.className = "header";
        const img = document.createElement("img");
        img.src = "../images/icon.png";
        img.className = "header-image";
        const h1 = document.createElement("h1");
        const headerText = document.createTextNode("SkyWatch");
        h1.className = "header-text";
        
        const p = document.createElement("p");
        const paraText = document.createTextNode("Stay Ahead of the Weather!");
        p.className = "header-slogan";

        h1.appendChild(headerText);
        header.appendChild(img);
        header.appendChild(h1);
        p.appendChild(paraText);
        header.appendChild(p);
        main.appendChild(header);


        // Creating and Appending Search Box
        const searchBox = document.createElement("div");
        searchBox.className = "search-box";
        const searchBar = document.createElement("input");
        searchBar.type = "text";
        searchBar.className = "search-bar";
        searchBar.placeholder = "Search...";

        searchBox.appendChild(searchBar);
        main.appendChild(searchBox);

        // Creating Weather Info Container
        const weatherInfo = document.createElement("div");
        weatherInfo.id = "weatherInfo";
        weatherInfo.style.display = "none";

        // Location Box
        const locationBox = document.createElement("div");
        locationBox.className = "location-box";
        const location = document.createElement("div");
        location.id = "location";
        location.className = "location";
        const date = document.createElement("div");
        date.id = "date";
        date.className = "date";

        locationBox.appendChild(location);
        locationBox.appendChild(date);

        // Weather Box
        const weatherBox = document.createElement("div");
        weatherBox.className = "weather-box";
        const temp = document.createElement("div");
        temp.id = "temp";
        temp.className = "temp";
        const weather = document.createElement("div");
        weather.id = "weather";
        weather.className = "weather";

        weatherBox.appendChild(temp);
        weatherBox.appendChild(weather);

        // Bottom Section for Feels Like, Humidity, and Wind
        const bottom = document.createElement("div");
        bottom.className = "bottom";

        // Feels Like
        const feels = document.createElement("div");
        feels.className = "feels";
        const feelsLike = document.createElement("p");
        feelsLike.id = "feelsLike";
        feelsLike.className = "bold";
        const feelsText = document.createElement("p");
        feelsText.innerText = "Feels Like";
        
        feels.appendChild(feelsLike);
        feels.appendChild(feelsText);

        // Humidity
        const humidity = document.createElement("div");
        humidity.className = "humidity";
        const humidityValue = document.createElement("p");
        humidityValue.id = "humidity";
        humidityValue.className = "bold";
        const humidityText = document.createElement("p");
        humidityText.innerText = "Humidity";

        humidity.appendChild(humidityValue);
        humidity.appendChild(humidityText);

        // Wind
        const wind = document.createElement("div");
        wind.className = "wind";
        const windSpeed = document.createElement("p");
        windSpeed.id = "windSpeed";
        windSpeed.className = "bold";
        const windText = document.createElement("p");
        windText.innerText = "Wind Speed";

        wind.appendChild(windSpeed);
        wind.appendChild(windText);

        // Appending Feels Like, Humidity and Wind to Botton
        bottom.appendChild(feels);
        bottom.appendChild(humidity);
        bottom.appendChild(wind);

        // Bringing the Weather Info Section Together
        weatherInfo.appendChild(locationBox);
        weatherInfo.appendChild(weatherBox);
        weatherInfo.appendChild(bottom);

        main.appendChild(weatherInfo);

        app.appendChild(main);
    };

    createAppStructure();

    // Add Event Listener to the Search Bar
    const searchBar = document.querySelector(".search-bar");
    const weatherInfo = document.getElementById("weatherInfo");

    searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${searchBar.value}&APPID=${api.key}&units=metric`)
                .then(res => res.json())
                .then(result => {
                    updateWeather(result);
                    searchBar.value = "";
                });
        }
    });

    // Update Weather Information
    const updateWeather = (weather) => {
        if (typeof weather.main != "undefined") {
            weatherInfo.style.display = "block";
            document.getElementById("location").innerText = `${weather.name}, ${weather.sys.country}`;
            document.getElementById("date").innerText = dateBuilder(new Date());
            document.getElementById("temp").innerText = `${Math.round(weather.main.temp)}°C`;
            document.getElementById("weather").innerText = weather.weather[0].main;
            document.getElementById("feelsLike").innerText = `${weather.main.feels_like.toFixed()}°C`;
            document.getElementById("humidity").innerText = `${weather.main.humidity}%`;
            document.getElementById("windSpeed").innerText = `${weather.wind.speed.toFixed()}MPH`;
        } else {
            weatherInfo.style.display = "none";
        }
    };

    // Date Builder Function
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };
});



