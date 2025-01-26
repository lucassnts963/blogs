import { AppError } from "./AppError";

export class UserNotFound extends AppError {
  constructor() {
    super("Usuário não encontrado", 400);
  }
}
