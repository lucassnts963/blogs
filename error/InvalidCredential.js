import { AppError } from "./AppError";

export class InvalidCrendetial extends AppError {
  constructor() {
    super("Credenciais inválidas", 401);
  }
}
