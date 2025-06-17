"use client";
import Link from "next/link";
import { FaUserCircle, FaEdit, FaTrashAlt, FaEnvelope } from "react-icons/fa";

export default function UserItem({ user, onDelete }) {
  return (
    <div className="card border-0 shadow-sm hover-shadow transition-all">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
              <FaUserCircle size={32} className="text-primary" />
            </div>
            <div>
              <Link
                href={`/user/${user._id}`}
                className="text-decoration-none text-dark fw-semibold fs-5 hover-primary"
              >
                {user.name}
              </Link>
              <div className="d-flex align-items-center gap-2 text-muted small mt-1">
                <FaEnvelope size={12} />
                {user.email}
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link
              href={`/update/${user._id}`}
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-3"
            >
              <FaEdit /> Edit
            </Link>
            <button
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 rounded-pill px-3"
              onClick={() => onDelete(user._id)}
            >
              <FaTrashAlt /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
