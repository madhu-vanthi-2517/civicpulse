import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ClipboardList,
  ShieldCheck,
  Clock,
  Brain,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";

export default function LandingPage() {
  const location = useLocation();
  const [logoutNotice, setLogoutNotice] = useState("");

  useEffect(() => {
    const state = location.state;
    if (state?.logoutMessage) {
      setLogoutNotice(state.logoutMessage);
    }
  }, [location]);

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", bgcolor: "grey.50", color: "text.primary" }}>
      <Box component="nav" sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider", px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2.25, sm: 2.75, md: 3.25 } }}>
        <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", minWidth: 0 }}>
            <img src="/logo_civicpulse.jpeg" alt="CivicPulse Logo" style={{ height: 56, width: "auto", objectFit: "contain" }} />
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
              <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.1 }}>CivicPulse</Typography>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
                Smart. Simple. Transparent.
              </Typography>
            </Box>
          </Link>
          <Button component={Link} to="/login" variant="contained" sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, py: 1.2 }}>
            Login
          </Button>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 5, sm: 7, md: 10 }, textAlign: "center" }}>
        {logoutNotice && (
          <Box sx={{ maxWidth: 560, mx: "auto", mb: 3, bgcolor: "success.50", border: 1, borderColor: "success.100", borderRadius: 2, p: 2 }}>
            <Typography variant="body2" sx={{ color: "success.dark", fontWeight: 600 }}>
              {logoutNotice}
            </Typography>
          </Box>
        )}

        <Box sx={{ maxWidth: 780, mx: "auto", mb: { xs: 5, md: 8 } }}>
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "2rem", sm: "2.5rem", md: "3.25rem" }, mb: 2 }}>
            Why CivicPulse?
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.8 }}>
            Bridging the gap between citizens and municipal administration. CivicPulse makes complaint reporting structured, trackable, and transparent by reducing manual sorting and processing delays.
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 4, p: { xs: 3, sm: 4, md: 6 }, mb: { xs: 5, md: 8 }, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: 3, textAlign: { xs: "left", md: "left" } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Be a responsible citizen</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 640, lineHeight: 1.7 }}>
              Sign in to report civic issues, track complaint progress, and support faster resolution through a transparent public platform.
            </Typography>
          </Box>
          <Button component={Link} to="/login" variant="contained" sx={{ minWidth: { xs: "100%", md: 220 }, borderRadius: 2, py: 1.4, whiteSpace: "nowrap" }}>
            Submit a Complaint Now
            <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </Button>
        </Paper>

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 5, md: 8 } }}>
          <Grid item xs={12} md={4}>
            <Info title="AI-assisted categorization" text="Complaints are parsed and automatically classified into the correct civic category fields instantly upon submission." />
          </Grid>
          <Grid item xs={12} md={4}>
            <Info title="Faster department routing" text="Issues are systematically dispatched to the respective departments based on category, urgency, and regional details." />
          </Grid>
          <Grid item xs={12} md={4}>
            <Info title="Transparent tracking" text="Citizens can track complaint progress using a complaint ID and stay updated through every stage of resolution." />
          </Grid>
        </Grid>

        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, overflow: "hidden", mb: { xs: 5, md: 8 } }}>
          <Grid container>
            <Grid item xs={12} sm={6} lg={3}><Stat icon={<ClipboardList />} value="Live" label="Complaints Registered" /></Grid>
            <Grid item xs={12} sm={6} lg={3}><Stat icon={<Clock />} value="24×7" label="Availability" /></Grid>
            <Grid item xs={12} sm={6} lg={3}><Stat icon={<Brain />} value="AI" label="Complaint Categorization" /></Grid>
            <Grid item xs={12} sm={6} lg={3}><Stat icon={<ShieldCheck />} value="Secure" label="Citizen Tracking" /></Grid>
          </Grid>
        </Paper>

        <Box sx={{ py: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: { xs: 3, md: 4 } }}>How It Works</Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={6} lg={3}><Step number="1" title="Submit" text="Citizen reports the issue with details, location, and description." /></Grid>
            <Grid item xs={12} sm={6} lg={3}><Step number="2" title="Classify" text="The system categorizes the complaint and identifies urgency." /></Grid>
            <Grid item xs={12} sm={6} lg={3}><Step number="3" title="Track" text="Citizens monitor complaint progress using their complaint ID." /></Grid>
            <Grid item xs={12} sm={6} lg={3}><Step number="4" title="Resolve" text="Authority reviews the issue and updates complaint status." /></Grid>
          </Grid>
        </Box>
      </Container>

      <Box component="footer" sx={{ bgcolor: "white", borderTop: 1, borderColor: "divider", px: { xs: 2, sm: 3, lg: 4 }, py: 6 }}>
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2, textAlign: { xs: "center", md: "left" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <img src="/logo_civicpulse.jpeg" alt="CivicPulse Logo" style={{ height: 28, width: "auto", objectFit: "contain" }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>CivicPulse</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Link to="/login" style={{ color: "#64748b", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#64748b", textDecoration: "none" }}>Register</Link>
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>© 2026 CivicPulse. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
}

function Info({ title, text }) {
  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: { xs: 3, sm: 4 }, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box sx={{ width: 42, height: 42, bgcolor: "primary.50", color: "primary.main", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", mb: 2, alignSelf: "center" }}>
        <CheckCircle size={20} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, width: "100%", textAlign: "center" }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>{text}</Typography>
    </Paper>
  );
}

function Stat({ icon, value, label }) {
  return (
    <Box sx={{ p: { xs: 3, sm: 4 }, display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-start", textAlign: "left", borderBottom: { xs: 1, lg: 0 }, borderRight: { xs: 0, lg: 1 }, borderColor: "divider" }}>
      <Box sx={{ bgcolor: "primary.50", color: "primary.main", p: 1.5, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{value}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>{label}</Typography>
      </Box>
    </Box>
  );
}

function Step({ number, title, text }) {
  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: { xs: 3, sm: 4 }, textAlign: "center", height: "100%" }}>
      <Box sx={{ width: 34, height: 34, bgcolor: "primary.main", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, fontWeight: 700 }}>{number}</Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>{text}</Typography>
    </Paper>
  );
}
