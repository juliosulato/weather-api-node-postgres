import { z } from "zod";

export const createWeatherSchema = z.object({
  city: z
    .string("O nome da cidade é obrigatório.")
    .min(1, "O nome da cidade não pode estar vazio."),
  state: z
    .string()
    .length(2, "Use o código de 2 letras do estado (ex: SP, MG)")
    .optional(),
  countryByISO: z
    .string()
    .length(2, "Use o código ISO de 2 letras (ex: BR, US)")
    .optional(),
});

export type CreateWeatherInput = z.infer<typeof createWeatherSchema>;
