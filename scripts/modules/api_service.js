const API_KEY = "8df9271195469316725e2be151e56946";
const API_URL = "https://api.openweathermap.org/data/2.5/";
const API_GEOCODER_URL = "https://api.openweathermap.org/geo/1.0/direct";

export const fetchCityCoordsByName = async (name) => {
  const url = new URL(API_GEOCODER_URL);
  url.searchParams.append("appid", API_KEY);
  url.searchParams.append("q", name);
  url.searchParams.append("limit", "1");
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  } else {
    const responseJson = await response.json();
    const geoData = responseJson[0];
    return geoData?.lat
      ? {
          lat: geoData?.lat,
          lon: geoData?.lon,
        }
      : null;
  }
};

export const fetchWeather = async (name) => {
  const coords = await fetchCityCoordsByName(name);
  if (coords) {
    const url = new URL("weather", API_URL);
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("lat", coords.lat);
    url.searchParams.append("lon", coords.lon);
    url.searchParams.append("units", "metric");
    url.searchParams.append("lang", "ru");
    const response = await fetch(url);
    const data = await response.json();
    return { success: true, data };
  } else return { success: false };
};

export const fetchForecastWeather = async (name) => {
  const coords = await fetchCityCoordsByName(name);
  if (coords) {
    const url = new URL("forecast", API_URL);
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("lat", coords.lat);
    url.searchParams.append("lon", coords.lon);
    url.searchParams.append("units", "metric");
    url.searchParams.append("lang", "ru");
    url.searchParams.append("cnt", "40");

    const response = await fetch(url);
    const data = await response.json();
    return { success: true, data };
  } else return { success: false };
};
