import { env } from "@/config/env";
import { prisma } from "@/config/prisma";
import { CreateWeatherInput } from "@/schemas/weather.schema";
import { GeoLocation } from "@/types/geoLocation.types";
import { HttpException } from "@/utils/http-exception";

const weatherCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; 

export class WeatherService {
  async create(data: CreateWeatherInput) {
    const { lat, lon, name } = await this.getCoordinates(data);

    const recentLog = await prisma.weatherLog.findFirst({
      where: {
        city: name,
        fetchedAt: {
          gte: new Date(Date.now() - 10 * 60 * 1000),
        },
      },
    });

    if (recentLog) {
      console.log("Retornando dados do cache...")
      return recentLog;
    }

    const weatherData = await this.getWeatherData(lat, lon);

    return await prisma.weatherLog.create({
      data: {
        city: name,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        description: weatherData.weather[0]?.description,
        rawResponse: weatherData,
      },
    });
  }

  async listAll() {
    return await prisma.weatherLog.findMany();
  }
  

  private async getCoordinates(data: CreateWeatherInput): Promise<GeoLocation> {
    const queryParts = [data.city];
    if (data.state) queryParts.push(data.state);
    if (data.countryByISO) queryParts.push(data.countryByISO);

    const query = queryParts.join(",");

    const url = `${env.OPENWEATHER_BASE_URL}/geo/1.0/direct?q=${query}&limit=1&appid=${env.OPENWEATHER_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      throw new HttpException(
        500,
        "Erro ao consultar serviço de geolocalização"
      );
    }

    const result = await response.json();

    if (!result || result.length === 0) {
      throw new HttpException(404, "Cidade não encontrada");
    }

    return result[0];
  }

  private async getWeatherData(lat: number, lon: number) {
    const cacheKey = `${lat},${lon}`;
    const cached = weatherCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Retornando dados do cache");
      return cached.data;
    }

    const url = `${env.OPENWEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${env.OPENWEATHER_API_KEY}`;

    const response = await fetch(url);
    console.log(response.status)
    if (!response.ok)
      throw new HttpException(500, "Erro ao consultar serviço de clima");

    const data = await response.json();

    weatherCache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  }
}
