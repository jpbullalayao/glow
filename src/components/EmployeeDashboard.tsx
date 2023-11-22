import { useState } from "react";
import { DocumentStatus } from "@/models/Document";
import { ExpenseReport } from "@/models/ExpenseReport";
import { Requisition } from "@/models/Requisition";

import { DocumentTable } from "@/components/DocumentTable";

interface Props {
  documents: (Requisition | ExpenseReport)[];
  setDocuments: Function;
}

export const EmployeeDashboard = ({ documents, setDocuments }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [cost, setCost] = useState<null | number>(null);

  const documentToClassMap = {
    expense: ExpenseReport,
    requisition: Requisition,
  };

  const addDocument = (documentType) => {
    const Class = documentToClassMap[documentType];

    const classParams =
      Class === ExpenseReport
        ? {
            description,
            total: cost,
            submittedAt: new Date().getTime(),
          }
        : {
            description,
            cost,
            submittedAt: new Date().getTime(),
            status:
              Number(cost) > 1000
                ? DocumentStatus.Referred
                : DocumentStatus.Submitted,
          };

    const newDoc = new Class({
      ...classParams,
    });

    setDocuments([...documents, newDoc]);
  };

  return (
    <section>
      <h1>Employee Dashboard</h1>
      <div>
        Create new document
        <div>
          <input
            type="text"
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Description"
          />
          <input
            type="number"
            onChange={(e) => setCost(Number(e.currentTarget.value))}
            placeholder="Total / Cost"
          />
        </div>
        <div>
          <button onClick={() => addDocument("expense")}>
            Create Expense Report
          </button>
          <button onClick={() => addDocument("requisition")}>
            Create Requisition
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "100px",
        }}
      >
        {documents.length > 0 && (
          <DocumentTable documents={documents} filteredDocs={documents} />
        )}
      </div>
    </section>
  );
};
