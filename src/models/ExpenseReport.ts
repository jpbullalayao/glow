import { Document, DocumentStatus } from "./Document";

export class ExpenseReport extends Document {
  total: number;

  constructor({ status, description, total, submittedAt }) {
    super({
      status,
      description,
      submittedAt,
    });
    this.total = total;
  }
}
