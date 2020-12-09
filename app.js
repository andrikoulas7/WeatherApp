window.addEventListener('load', () => {

    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lati = position.coords.latitude;
            // console.log('position latitude: ', lati);
            // console.log('position longtitude: ', long);

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const apiKey = 'bb8e5fea12e1c2f342f01802c1abb090';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=` + lati + `&lon=` + long + `&units=metric` + `&appid=` + apiKey;

            fetch(api).then(response => {
                return response.json();
            })
                .then(data => {
                    // console.log(data.weather[0].icon);
                    const forecastIcon = data.weather[0].icon;
                    // console.log("Temperature: ", Math.round(data.main.temp));
                    const temperature = Math.round(data.main.temp);
                    const city = data.name;
                    const temperatureDescription = data.weather[0].description
                    // console.log('Description: ', temperatureDescription);

                    temperatureDegree.textContent = temperature;
                    tempDescription.textContent = temperatureDescription;
                    locationTimezone.textContent = city;
                    locationIcon.innerHTML = `<img src="icons/${forecastIcon}.png">`;
                });
        });
    }
});