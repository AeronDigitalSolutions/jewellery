"use client";

import { useEffect, useState } from "react";
import styles from "@/style/dashboard/userlist.module.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ITEMS_PER_PAGE = 10;

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch(`${API}/api/popup-users/all`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`${API}/api/popup-users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  // Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);

  // CSV Export
  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone"],
      ...filteredUsers.map((u) => [u.name, u.email, u.phone]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "popup_users.csv";
    a.click();
  };

  // ✅ PDF Export (FIXED)
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Popup Users", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Phone"]],
      body: filteredUsers.map((u) => [
        u.name,
        u.email,
        u.phone,
      ]),
    });

    doc.save("popup_users.pdf");
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Popup Users</h3>

        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={styles.search}
          />

          <button onClick={exportCSV} className={styles.exportBtn}>
            Export CSV
          </button>

          <button onClick={exportPDF} className={styles.exportBtn}>
            Export PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.head}`}>
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Action</span>
        </div>

        {paginatedUsers.length === 0 && (
          <p className={styles.empty}>No users found</p>
        )}

        {paginatedUsers.map((u) => (
          <div key={u._id} className={styles.row}>
            <span>{u.name}</span>
            <span>{u.email}</span>
            <span>{u.phone}</span>
           <span className={styles.actionCol}>
  <button
    className={styles.deleteBtn}
    onClick={() => deleteUser(u._id)}
  >
    Delete
  </button>
</span>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
