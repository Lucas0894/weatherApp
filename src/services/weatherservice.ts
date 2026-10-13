import type { CityOption, ForecastApiResponse, WeatherApiResponse } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;
const rapidapiKey = import.meta.env.VITE_RAPIDAPI_KEY;

export const geocoding = async (city: string): Promise<CityOption[]> => {
  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(city)}&limit=10&languageCode=es`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidapiKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    },
  );

  const data = (await response.json()) as {
    data?: Array<{
      city: string;
      countryCode: string;
      latitude: number;
      longitude: number;
    }>;
  };

  if (!data.data) {
    return [];
  }

  return data.data.map((c) => ({
    name: `${c.city}, ${c.countryCode}`,
    lat: c.latitude,
    lon: c.longitude,
  }));
};

export const getWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherApiResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city");
  }

  return (await response.json()) as WeatherApiResponse;
};

export const getForecast = async (
  lat: number,
  lon: number,
): Promise<ForecastApiResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`,
  );

  if (!response.ok) {
    throw new Error("Error to fetch forecast");
  }

  return (await response.json()) as ForecastApiResponse;
};
