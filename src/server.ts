import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`Servidor rodando na porta ${env.PORT}`);
  console.log(`Swagger Docs disponível em http://localhost:${env.PORT}${env.API_PREFIX}/docs`);
});
