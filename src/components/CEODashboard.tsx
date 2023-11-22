import { DocumentTable } from "@/components/DocumentTable";

import { UserRole } from "@/constants/UserRole";

import { Requisition } from "@/models/Requisition";
import { ExpenseReport } from "@/models/ExpenseReport";

interface Props {
  documents: (Requisition | ExpenseReport)[];
  filteredDocs: (Requisition | ExpenseReport)[];
  setDocuments: Function;
}

export const CEODashboard = ({
  documents,
  filteredDocs,
  setDocuments,
}: Props) => (
  <section>
    <h1>CEO Dashboard</h1>

    <div
      style={{
        marginTop: "100px",
      }}
    >
      {filteredDocs.length > 0 && (
        <DocumentTable
          documents={documents}
          filteredDocs={filteredDocs}
          setDocuments={setDocuments}
          userRole={UserRole.CEO}
        />
      )}
    </div>
  </section>
);
