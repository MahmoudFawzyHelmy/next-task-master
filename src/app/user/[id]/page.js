"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUserCircle, FaEnvelope, FaIdBadge } from "react-icons/fa";

export default function UserPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    fetch("/api/users/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(setUser)
      .catch((err) => setError(err.message));
  }, [id, status]);

  if (status === "loading")
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Checking your session, please wait...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger shadow-sm">
          🚫 {error}
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading user information...</p>
      </div>
    );

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0 p-4 rounded-4 bg-white"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <FaUserCircle size={80} className="text-primary" />
          <h3 className="mt-3 text-dark fw-bold">User Profile</h3>
          <p className="text-muted small">Here are the details for this user</p>
        </div>

        <div className="mb-3 d-flex align-items-center gap-2">
          <FaIdBadge className="text-info" />
          <span><strong>Name:</strong> {user.name}</span>
        </div>

        <div className="mb-3 d-flex align-items-center gap-2">
          <FaEnvelope className="text-danger" />
          <span><strong>Email:</strong> {user.email}</span>
        </div>

        <hr />

        <p className="text-muted small text-center">
          🆔 User ID: <code>{user._id}</code>
        </p>
      </div>
    </div>
  );
}
