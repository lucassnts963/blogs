import { AppError } from "./AppError";

export class EmailNotFound extends AppError {
  constructor() {
    super("E-mail não encontrado", 400);
  }
}
