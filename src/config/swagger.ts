import swaggerJsdoc from 'swagger-jsdoc';

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
        url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
    tags: [],
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
  apis: ["./src/docs/**/*.yaml"],
};

const specs = swaggerJsdoc(options);

export default specs;
