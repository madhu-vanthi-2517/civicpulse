import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Box, Container, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import ComplaintForm from "./pages/citizen/ComplaintForm";
import Login from "./pages/citizen/Login";
import Register from "./pages/citizen/Register";
import ComplaintTracker from "./pages/citizen/ComplaintTracker";
import PublicTracker from "./pages/citizen/PublicTracker";
import AdminDashboard from "./pages/authority/AdminDashboard";
import Analytics from "./pages/authority/Analytics";
import ComplaintDetail from "./pages/authority/ComplaintDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/analytics") ||
    location.pathname.startsWith("/complaint/");
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/public-tracker";

  if (isAdminPage || isAuthPage) return null;

  const isLandingPage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "Track Complaints", path: "/track" },
    { label: "Submit", path: "/submit" },
    { label: "My Complaints", path: "/my-complaints" },
  ];

  return (
    <Box component="nav" sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider", position: "sticky", top: 0, zIndex: 1200, width: "100%", px: { xs: 2, sm: 3, md: 4 }, py: isLandingPage ? { xs: 2, sm: 2.5, md: 3 } : { xs: 1.5, sm: 2 } }}>
      <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Link to="/track" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", minWidth: 0 }}>
          <img src="/logo_civicpulse.jpeg" alt="CivicPulse Logo" style={{ height: isLandingPage ? 56 : 48, width: "auto", objectFit: "contain" }} />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
            <Typography variant={isLandingPage ? "h5" : "h6"} sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.1 }}>CivicPulse</Typography>
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
              Smart. Simple. Transparent.
            </Typography>
          </Box>
        </Link>

        {!isMobile ? (
          <Stack direction="row" spacing={2.5} alignItems="center" sx={{ flexShrink: 0 }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={{ textDecoration: "none", color: isActive(link.path) ? "#4f46e5" : "#64748b", fontWeight: isActive(link.path) ? 700 : 500, borderBottom: isActive(link.path) ? "2px solid #4f46e5" : "2px solid transparent", paddingBottom: 4 }}>
                {link.label}
              </Link>
            ))}

            {user ? (
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ pl: 2, borderLeft: "1px solid", borderColor: "divider" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", display: { xs: "none", lg: "block" } }}>{user.email}</Typography>
                <button onClick={handleLogout} style={{ background: "#f1f5f9", color: "#334155", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 600 }}>
                  Logout
                </button>
              </Stack>
            ) : (
              <Link to="/login" style={{ textDecoration: "none", background: "#4f46e5", color: "#fff", padding: "8px 14px", borderRadius: 8, fontWeight: 600 }}>
                Login
              </Link>
            )}
          </Stack>
        ) : (
          <IconButton onClick={() => setIsOpen((prev) => !prev)} size="small" sx={{ color: "text.secondary" }}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </IconButton>
        )}
      </Container>

      {isMobile && isOpen && (
        <Box sx={{ borderTop: 1, borderColor: "divider", px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1.2 }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} style={{ textDecoration: "none", color: isActive(link.path) ? "#4f46e5" : "#64748b", fontWeight: isActive(link.path) ? 700 : 500 }}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <Box sx={{ pt: 1, borderTop: 1, borderColor: "divider", display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>{user.email}</Typography>
              <button onClick={handleLogout} style={{ background: "#f1f5f9", color: "#334155", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 600, textAlign: "left" }}>
                Logout
              </button>
            </Box>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", background: "#4f46e5", color: "#fff", padding: "8px 12px", borderRadius: 8, fontWeight: 600, textAlign: "center" }}>
              Login
            </Link>
          )}
        </Box>
      )}
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <Box sx={{ minHeight: "100vh", width: "100%", m: 0, p: 0, bgcolor: "grey.50", color: "text.primary", overflowX: "hidden" }}>
        <Navbar />
        <Box component="main" sx={{ width: "100%", m: 0, p: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/submit" element={<ProtectedRoute requiredRole="citizen"><ComplaintForm /></ProtectedRoute>} />

            <Route path="/my-complaints" element={<ProtectedRoute requiredRole="citizen"><ComplaintTracker /></ProtectedRoute>} />

            <Route path="/track" element={<PublicTracker />} />

            <Route path="/admin" element={<ProtectedRoute requiredRole="authority"><AdminDashboard /></ProtectedRoute>} />

            <Route path="/analytics" element={<ProtectedRoute requiredRole="authority"><Analytics /></ProtectedRoute>} />

            <Route path="/complaint/:id" element={<ProtectedRoute requiredRole="authority"><ComplaintDetail /></ProtectedRoute>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}