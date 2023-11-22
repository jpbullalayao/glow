import { v4 as uuidv4 } from "uuid";

export enum DocumentStatus {
  Submitted = "submitted",
  Approved = "approved",
  Rejected = "rejected",
  Referred = "referred",
}

export class Document {
  id: string;
  status: DocumentStatus;
  description: string;
  submittedAt: Date;

  constructor({ status, description, submittedAt }) {
    this.id = uuidv4();
    this.status = status || DocumentStatus.Submitted;
    this.description = description;
    this.submittedAt = submittedAt;
  }
}
