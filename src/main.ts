import "./style.css";
import * as OpenWeatherResponse from "./OpenWeatherResponse";

function displayWeatherDetails(cloudsDetails: number, windSpeed: number) {
  const clouds = document.querySelector("p.city--clouds");
  const wind_speed = document.querySelector("p.city--wind-speed");

  if (clouds != null) {
    clouds.innerHTML = ("Clouds: " + cloudsDetails) as unknown as string;
  }

  if (wind_speed != null) {
    wind_speed.innerHTML = ("Wind speed: " + windSpeed) as unknown as string;
  }
}

document.querySelector<HTMLDivElement>("#weather__app")!.innerHTML = `
  <div class="weather-app">
    <div class="search">
      <label class="search--label">Enter city name</label><br>
      <input type="text" class="search--input" value="">
      <input type="submit" class="search--submit" value="Submit">
    </div>
    <p class="city--clouds"></p>
    <p class="city--wind-speed"></p>

  </div>
`;

document
  .querySelector("input.search--submit")
  ?.addEventListener("click", async () => {
    const cityNameInput = document.querySelector(
      ".search--input"
    ) as HTMLInputElement | null;

    if (cityNameInput != null) {
      const cityName = cityNameInput.value;
      const API_key = "f98ff9ffd7fa12ceae94c107f952c945";

      const response = await window.fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`,
        { method: "GET" }
      );

      const data = await response.json();
      if (response.ok) {
        const weatherResponse = data as OpenWeatherResponse.Root;
        if (weatherResponse) {
          const clouds = weatherResponse.clouds.all;
          const windSpeed = weatherResponse.wind.speed;
          displayWeatherDetails(clouds, windSpeed);
        }
      }
    }
  });
