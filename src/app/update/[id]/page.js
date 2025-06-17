"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUserEdit, FaEnvelope, FaUser, FaSave } from "react-icons/fa";

export default function UpdateUser() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    fetch("/api/users/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(setForm)
      .catch((err) => {
        console.error("Error loading user:", err);
      });
  }, [id, status]);

  const updateUser = async () => {
    if (!form.name || !form.email) return alert("Please fill in all fields.");
    try {
      const res = await fetch("/api/users/" + id, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update user");

      router.push("/");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center mt-5 text-secondary">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading session info...</p>
      </div>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4 bg-white"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <FaUserEdit size={50} className="text-primary" />
          <h3 className="mt-3 text-dark fw-bold">Update User Information</h3>
          <p className="text-muted small">Modify the user details below</p>
        </div>

        <div className="form-group mb-3">
          <label className="form-label d-flex align-items-center gap-2 text-secondary">
            <FaUser /> Name
          </label>
          <input
            type="text"
            className="form-control rounded-3 shadow-sm"
            placeholder="Enter new name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label d-flex align-items-center gap-2 text-secondary">
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            className="form-control rounded-3 shadow-sm"
            placeholder="Enter new email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <button
          className="btn btn-primary w-100 rounded-pill fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
          onClick={updateUser}
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
}
