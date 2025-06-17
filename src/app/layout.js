import "bootstrap/dist/css/bootstrap.min.css";
import SessionWrapper from "./components/SessionWrapper";
import { FaUsersCog } from "react-icons/fa";

export const metadata = {
  title: "Smart User Dashboard",
  description: "Manage users easily with Google Authentication and full CRUD functionality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-light min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm" style={{ background: 'linear-gradient(135deg, #2c3e50, #3498db)' }}>
          <div className="container">
            <a className="navbar-brand d-flex align-items-center gap-2 fw-bold text-blue" href="/">
              <FaUsersCog size={28} /> <span className="fs-4">Smart Users Hub</span>
            </a>
          </div>
        </nav>

        <main className="flex-grow-1 py-4">
          <SessionWrapper>{children}</SessionWrapper>
        </main>

        <footer className="bg-dark text-white py-4 mt-auto">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start">
                <p className="mb-0 fw-light">🚀 Powered by Next.js & Google Auth</p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <p className="mb-0 fw-light">© 2024 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
