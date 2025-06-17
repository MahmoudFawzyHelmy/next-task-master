"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createUser } from "../actions/userActions";
import { FaUserPlus, FaEnvelope, FaUser, FaCheckCircle } from "react-icons/fa";

export default function AddUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const handleAdd = async () => {
    if (!form.name || !form.email) {
      return alert("Please fill in all fields.");
    }

    setLoading(true);
    try {
      await createUser(form);
      router.push("/");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center mt-5 text-secondary">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Checking session...</p>
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
          <FaUserPlus size={50} className="text-success" />
          <h3 className="mt-3 text-dark fw-bold">Add New User</h3>
          <p className="text-muted small">Fill in the details below to create a new user</p>
        </div>

        <div className="form-group mb-3">
          <label className="form-label d-flex align-items-center gap-2 text-secondary">
            <FaUser /> Name
          </label>
          <input
            type="text"
            className="form-control rounded-3 shadow-sm"
            placeholder="Enter user's full name"
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
            placeholder="Enter user's email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <button
          className="btn btn-success w-100 rounded-pill fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span> Adding...
            </>
          ) : (
            <>
              <FaCheckCircle /> Add User
            </>
          )}
        </button>
      </div>
    </div>
  );
}
