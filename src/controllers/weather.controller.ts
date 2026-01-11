import { createWeatherSchema } from "@/schemas/weather.schema";
import { WeatherService } from "@/services/weather.service";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpException } from "@/utils/http-exception";

export class WeatherController {
  private weatherService = new WeatherService();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createWeatherSchema.parse(req.body);
      const result = await this.weatherService.create(validatedData);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map(
          err => `${err.path.join('.')}: ${err.message}`
        );
        return next(new HttpException(400, "Dados inválidos", messages));
      }
      next(error);
    }
  }

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.weatherService.listAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}