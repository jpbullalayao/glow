"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";

import { CEODashboard } from "@/components/CEODashboard";
import { EmployeeDashboard } from "@/components/EmployeeDashboard";
import { ManagerDashboard } from "@/components/ManagerDashboard";

import { UserRole } from "@/constants/UserRole";

import { Requisition } from "@/models/Requisition";
import { ExpenseReport } from "@/models/ExpenseReport";
import { DocumentStatus } from "@/models/Document";

interface ReferredDoc {
  document: Requisition | ExpenseReport;
  index: number;
}

export default function Home() {
  const [activeUserRole, setActiveUserRole] = useState<UserRole>(
    UserRole.Employee
  );
  const [documents, setDocuments] = useState<(Requisition | ExpenseReport)[]>(
    []
  );

  const [referredDocs, setReferredDocs] = useState<ReferredDoc[]>([]);

  const changeRole = (role: UserRole) => {
    setActiveUserRole(role);
  };

  useEffect(() => {
    const N = 10; // N SECONDS

    // const interval = setInterval(() => {
    //   documents
    //     .filter((document) => document.status === DocumentStatus.Referred)
    //     .map((document, index) => {
    //       const currentTime = new Date().getTime();
    //       const submittedAgoInSeconds =
    //         (currentTime - document.submittedAt) / 1000;

    //       if (submittedAgoInSeconds > N) {
    //         document.status = DocumentStatus.Submitted;

    //         const newDocuments = [...documents];
    //         newDocuments[index] = document;
    //         setDocuments(newDocuments);
    //         console.log("hello");
    //       }
    //     });
    // }, 1000);

    const interval = setInterval(() => {
      documents
        .filter((document) => document.status === DocumentStatus.Referred)
        .map((document, index) => {
          const currentTime = new Date().getTime();
          const submittedAgoInSeconds =
            (currentTime - document.submittedAt) / 1000;

          if (submittedAgoInSeconds > N) {
            document.status = DocumentStatus.Submitted;

            const newDocuments = [...documents];
            newDocuments[index] = document;
            setDocuments(newDocuments);
            // console.log("hello");
          }

          // return document;
        });

      // setDocuments(documents);
    }, 1000);

    // Clear the interval
    return () => clearInterval(interval);
  }, [documents]);

  return (
    <main className={styles.main}>
      <div
        style={{
          marginBottom: "100px",
        }}
      >
        <button onClick={() => changeRole(UserRole.Employee)}>
          Switch to Employee
        </button>
        <button onClick={() => changeRole(UserRole.Manager)}>
          Switch to Manager
        </button>
        <button onClick={() => changeRole(UserRole.CEO)}>Switch to CEO</button>
      </div>

      {activeUserRole === UserRole.Employee && (
        <EmployeeDashboard documents={documents} setDocuments={setDocuments} />
      )}

      {activeUserRole === UserRole.Manager && (
        <ManagerDashboard documents={documents} setDocuments={setDocuments} />
      )}

      {activeUserRole === UserRole.CEO && (
        <CEODashboard
          documents={documents}
          filteredDocs={documents.filter((document) => {
            if (document.status === DocumentStatus.Referred) {
              return document;
            }
          })}
          setDocuments={setDocuments}
        />
      )}
    </main>
  );
}
