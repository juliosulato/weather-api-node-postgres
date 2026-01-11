import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Weather API',
      version: '1.0.0',
      description: 'API RESTful em Node.js/TypeScript para consumir dados climáticos da OpenWeather e armazenar em PostgreSQL.',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Weather', 
        description: 'Endpoints para consulta e histórico climático',
      },
    ],
    components: {
      responses: {
        ErrorServer: {
          description: 'Internal Server Error',
        },
        ErrorValidation: {
          description: 'Validation Error',
        },
        ErrorNotFound: {
          description: 'Resource not found',
        }
      }
    },
  },
  apis: ["./src/docs/*.yaml"],
};

const specs = swaggerJsdoc(options);

export default specs;
