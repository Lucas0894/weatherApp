export interface CityOption {
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherApiResponse {
  customName?: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min?: number;
    temp_max?: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface ForecastListItem {
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description?: string;
  }>;
  pop: number;
}

export interface ForecastApiResponse {
  list: ForecastListItem[];
}

export interface DailyForecastItem {
  date: string;
  pop: number;
  img: string;
  temp_min: number;
  temp_max: number;
}

export interface HourlyForecastItem {
  date: string;
  temp: number;
  weather: string;
}
