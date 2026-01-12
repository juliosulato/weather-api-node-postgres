interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
  }>;
};

export type CachedWeather = WeatherResponse | {
  city: string;
  id: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string | null;
  rawResponse: unknown;
  fetchedAt: Date;
};