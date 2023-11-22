import { Document, DocumentStatus } from "./Document";

export class Requisition extends Document {
  cost: number;

  constructor({ status, description, submittedAt, cost }) {
    super({
      status,
      description,
      submittedAt,
    });
    this.cost = cost;
  }
}
