import { UserRole } from "@/constants/UserRole";

import { DocumentStatus } from "@/models/Document";
import { Requisition } from "@/models/Requisition";
import { ExpenseReport } from "@/models/ExpenseReport";

interface Props {
  documents: (Requisition | ExpenseReport)[];
  filteredDocs: (Requisition | ExpenseReport)[];
  setDocuments: Function;
  userRole?: UserRole;
}

export const DocumentTable = ({
  documents,
  filteredDocs,
  setDocuments,
  userRole,
}: Props) => {
  const clickHandler = (status: DocumentStatus, id: string) => {
    const newDocuments = documents.map((document) => {
      if (document.id === id) {
        document.status = status;
        document.submittedAt = new Date().getTime();
      }

      return document;
    });

    setDocuments(newDocuments);
  };

  return (
    <>
      Submitted documents:
      <table>
        <tr>
          <th>Description</th>
          <th>Status</th>
          <th>Total / Cost</th>
          <th>Document Type</th>
          {userRole === UserRole.Manager && <th></th>}
        </tr>
        <tbody>
          {filteredDocs.map((document, i) => (
            <tr key={`doc-${i}`}>
              <td>{document.description}</td>
              <td>{document.status}</td>
              <td>{document.cost ? document.cost : document.total}</td>
              <td>
                {document instanceof ExpenseReport
                  ? "Expense Report"
                  : "Requisition"}
              </td>
              {userRole === UserRole.Manager &&
                document.status === DocumentStatus.Submitted && (
                  <td>
                    <button
                      onClick={() =>
                        clickHandler(DocumentStatus.Approved, document.id)
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        clickHandler(DocumentStatus.Rejected, document.id)
                      }
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        clickHandler(DocumentStatus.Referred, document.id)
                      }
                    >
                      Refer to CEO
                    </button>
                  </td>
                )}

              {userRole === UserRole.CEO &&
                document.status === DocumentStatus.Referred && (
                  <td>
                    <button
                      onClick={() =>
                        clickHandler(DocumentStatus.Approved, document.id)
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        clickHandler(DocumentStatus.Rejected, document.id)
                      }
                    >
                      Reject
                    </button>
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
