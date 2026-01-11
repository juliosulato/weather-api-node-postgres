import { Router } from "express";
import { WeatherController } from "../controllers/weather.controller";

const weatherRoutes = Router();
const weatherController = new WeatherController();

weatherRoutes.post("/", (req, res, next) => weatherController.create(req, res, next));
weatherRoutes.get("/", (req, res, next) => weatherController.list(req, res, next));

export { weatherRoutes };