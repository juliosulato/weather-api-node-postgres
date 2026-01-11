import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import { HttpException } from './utils/http-exception';
import specs from './config/swagger';
import { env } from './config/env';

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'production' ? 100 : 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get(`${env.API_PREFIX}/health`, (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: env.SERVICE_NAME || "weather-api"
  });
});

app.use(`${env.API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(specs, {
  swaggerOptions: {
    docExpansion: "none",
  }
}));

app.use((err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred!';
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { errors: err.errors }),
  });
});


export default app;