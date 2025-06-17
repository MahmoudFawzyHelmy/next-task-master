"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import { FaGoogle, FaPlusCircle, FaSignOutAlt, FaUsers } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleDelete = async (id) => {
    await fetch("/api/users/" + id, { method: "DELETE" });
    setUsers(users.filter((u) => u._id !== id));
  };

  if (!session)
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <FaUsers size={48} className="text-primary mb-3" />
                  <h3 className="fw-bold text-primary">Welcome to Smart Users Hub</h3>
                  <p className="text-muted">Please sign in to manage your users effectively.</p>
                </div>
                <button
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  onClick={() => signIn("google")}
                >
                  <FaGoogle /> Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">
                Welcome back, <span className="text-primary">{session.user.name}</span>!
              </h2>
              <p className="text-muted mb-0">Manage your users efficiently</p>
            </div>
            <button
              className="btn btn-outline-danger d-flex align-items-center gap-2 rounded-pill px-4"
              onClick={() => signOut()}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">User Management</h3>
            <Link 
              href="/add" 
              className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4"
            >
              <FaPlusCircle /> Add New User
            </Link>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-5">
              <FaUsers size={48} className="text-muted mb-3" />
              <h4 className="text-muted">No users found</h4>
              <p className="text-muted">Start by adding your first user!</p>
            </div>
          ) : (
            <div className="row g-4">
              {users.map((u) => (
                <div key={u._id} className="col-12">
                  <UserItem user={u} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
