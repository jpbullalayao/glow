import { DocumentTable } from "@/components/DocumentTable";

import { UserRole } from "@/constants/UserRole";

import { Requisition } from "@/models/Requisition";
import { ExpenseReport } from "@/models/ExpenseReport";

interface Props {
  documents: (Requisition | ExpenseReport)[];
  setDocuments: Function;
}

export const ManagerDashboard = ({ documents, setDocuments }: Props) => (
  <section>
    <h1>Manager Dashboard</h1>

    <div
      style={{
        marginTop: "100px",
      }}
    >
      {documents.length > 0 && (
        <DocumentTable
          documents={documents}
          filteredDocs={documents}
          setDocuments={setDocuments}
          userRole={UserRole.Manager}
        />
      )}
    </div>
  </section>
);
