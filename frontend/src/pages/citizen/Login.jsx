import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import { Eye, EyeOff } from "lucide-react";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await api.login(email, password);
      if (data.access_token) {
        const cleanedRole = data.role ? data.role.toLowerCase().trim() : "";
        login({ email: data.email, role: cleanedRole, id: data.id }, data.access_token);
        setTimeout(() => {
          if (cleanedRole === "authority" || cleanedRole === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/submit", { replace: true });
          }
        }, 100);
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      setError("Cannot connect to server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "grey.50", px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 4, p: { xs: 3, sm: 4 } }}>
          <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
            <img src="/logo_civicpulse.jpeg" alt="CivicPulse Logo" style={{ width: 180, height: "auto", objectFit: "contain" }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Login</Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth InputProps={{ endAdornment: <Button onClick={() => setShowPassword(!showPassword)} sx={{ minWidth: 0, p: 0.5 }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button> }} />

            {error && <Typography variant="body2" sx={{ color: "error.main", textAlign: "center" }}>{error}</Typography>}

            <Button onClick={handleLogin} disabled={loading} variant="contained" sx={{ py: 1.3, borderRadius: 2, fontWeight: 700 }}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
              Don&apos;t have an account? <Box component="a" href="/register" sx={{ color: "primary.main", textDecoration: "none" }}>Register</Box>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}