import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  AudioLines,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";

const features = [
  {
    icon: <BrainCircuit size={21} />,
    eyebrow: "SMART TRIAGE",
    title: "The right team, sooner",
    description: "AI-assisted classification suggests a category, urgency, and department from each report.",
  },
  {
    icon: <UsersRound size={21} />,
    eyebrow: "COMMUNITY SIGNAL",
    title: "See when neighbours agree",
    description: "Similar reports can be flagged and linked, helping authorities understand shared concerns.",
  },
  {
    icon: <AudioLines size={21} />,
    eyebrow: "ACCESSIBLE BY DESIGN",
    title: "Speak your report",
    description: "Use optional browser voice dictation to get a complaint description started hands-free.",
  },
  {
    icon: <MessageSquareText size={21} />,
    eyebrow: "GUIDANCE, BUILT IN",
    title: "Get help as you go",
    description: "Ask the CivicPulse help assistant how to report, track, and understand a complaint.",
  },
];

export default function LandingPage() {
  const location = useLocation();
  const [logoutNotice] = useState(() => location.state?.logoutMessage || "");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f8fc", color: "#172033", overflow: "hidden" }}>
      <Box component="header" sx={{ bgcolor: "rgba(255,255,255,0.94)", borderBottom: "1px solid #e9edf4" }}>
        <Container maxWidth="lg">
          <Stack component="nav" direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: { xs: 72, sm: 82 } }}>
            <Link to="/" aria-label="CivicPulse home" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "inherit", textDecoration: "none" }}>
              <Box sx={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: 2.5, bgcolor: "#eef0ff", color: "#4f46e5" }}>
                <MapPinned size={21} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, letterSpacing: "-0.04em", fontSize: "1.18rem", lineHeight: 1.1 }}>CivicPulse</Typography>
                <Typography sx={{ color: "#78839a", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", mt: 0.35 }}>
                  Better cities, together
                </Typography>
              </Box>
            </Link>

            <Stack direction="row" spacing={{ xs: 1, sm: 3 }} alignItems="center">
              <Button component={Link} to="/track" color="inherit" sx={{ display: { xs: "none", sm: "inline-flex" }, fontWeight: 600 }}>
                Track a report
              </Button>
              <Button component={Link} to="/login" variant="contained" endIcon={<ArrowRight size={16} />} sx={{ px: { xs: 1.5, sm: 2.25 }, py: 1, borderRadius: 2.5, boxShadow: "none", fontWeight: 700 }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {logoutNotice && (
          <Paper role="status" elevation={0} sx={{ mt: 2, px: 2, py: 1.5, color: "#176b4d", bgcolor: "#ecfdf5", border: "1px solid #c9f0dd", borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{logoutNotice}</Typography>
          </Paper>
        )}

        <Grid container alignItems="center" spacing={{ xs: 5, md: 8 }} sx={{ py: { xs: 7, sm: 9, md: 13 } }}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: "inline-flex", mb: 2.5, px: 1.35, py: 0.7, color: "#4f46e5", bgcolor: "#eff0ff", border: "1px solid #e0e2ff", borderRadius: 99 }}>
              <Sparkles size={15} />
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em" }}>A CLEARER WAY TO BE HEARD</Typography>
            </Stack>

            <Typography component="h1" sx={{ maxWidth: 650, fontSize: { xs: "2.75rem", sm: "3.6rem", md: "4.15rem" }, fontWeight: 800, letterSpacing: "-0.065em", lineHeight: 1.06 }}>
              Small issues deserve{" "}
              <Box component="span" sx={{ color: "#4f46e5" }}>a clear path</Box>{" "}
              to change.
            </Typography>
            <Typography sx={{ maxWidth: 560, mt: 2.5, color: "#68748b", fontSize: { xs: "1rem", sm: "1.12rem" }, lineHeight: 1.8 }}>
              Report local civic concerns, follow their progress, and help your community see what needs attention.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3.5 }}>
              <Button component={Link} to="/login" variant="contained" endIcon={<ArrowRight size={17} />} sx={{ px: 2.5, py: 1.35, borderRadius: 2.5, boxShadow: "0 10px 24px rgba(79,70,229,0.2)", fontWeight: 700 }}>
                Report an issue
              </Button>
              <Button component={Link} to="/track" variant="outlined" endIcon={<ArrowDownRight size={17} />} sx={{ px: 2.5, py: 1.35, borderRadius: 2.5, borderColor: "#d8deeb", color: "#26334b", fontWeight: 700 }}>
                Track a complaint
              </Button>
            </Stack>

            <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mt: 3.5, flexWrap: "wrap", rowGap: 1 }}>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <ShieldCheck size={16} color="#596780" />
                <Typography variant="caption" sx={{ color: "#68748b", fontWeight: 600 }}>Transparent status</Typography>
              </Stack>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <Clock3 size={16} color="#596780" />
                <Typography variant="caption" sx={{ color: "#68748b", fontWeight: 600 }}>Available anytime</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", maxWidth: 520, mx: "auto", py: { xs: 1, md: 2 } }}>
              <Box sx={{ position: "absolute", width: "76%", height: "80%", right: "2%", top: "6%", bgcolor: "#e8eaff", borderRadius: "50%", filter: "blur(1px)" }} />
              <Paper elevation={0} sx={{ position: "relative", p: { xs: 2.5, sm: 3.5 }, border: "1px solid #e7eaf2", borderRadius: 4, bgcolor: "rgba(255,255,255,0.94)", boxShadow: "0 28px 80px rgba(36,48,91,0.12)", transform: { xs: "none", md: "rotate(1deg)" } }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 2.25, borderBottom: "1px solid #edf0f5" }}>
                  <Box>
                    <Typography sx={{ color: "#7a8498", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.11em" }}>YOUR COMMUNITY</Typography>
                    <Typography sx={{ mt: 0.35, fontWeight: 800, fontSize: "1.16rem" }}>A report, made clearer</Typography>
                  </Box>
                  <Box sx={{ width: 40, height: 40, display: "grid", placeItems: "center", color: "#4f46e5", bgcolor: "#f0f1ff", borderRadius: 2.5 }}>
                    <FileCheck2 size={20} />
                  </Box>
                </Stack>

                <Stack spacing={1.5} sx={{ py: 2.5 }}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8f9fc", border: "1px solid #edf0f5", borderRadius: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="flex-start">
                      <Box>
                        <Typography sx={{ color: "#8993a6", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.1em" }}>COMMUNITY REPORT</Typography>
                        <Typography sx={{ mt: 0.65, fontWeight: 700 }}>Streetlight not working</Typography>
                        <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mt: 1, color: "#718096" }}>
                          <MapPinned size={14} />
                          <Typography variant="caption">Neighbourhood report</Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ px: 1.1, py: 0.55, borderRadius: 99, bgcolor: "#fff5df", color: "#9a6500", fontSize: "0.68rem", fontWeight: 800, whiteSpace: "nowrap" }}>
                        In review
                      </Box>
                    </Stack>
                  </Paper>

                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 0.5 }}>
                    <Box sx={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: "#eff0ff", color: "#4f46e5" }}>
                      <BrainCircuit size={17} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ color: "#7b8699", fontWeight: 600 }}>AI-assisted routing</Typography>
                      <Typography sx={{ fontSize: "0.83rem", fontWeight: 700 }}>Matched to the right department</Typography>
                    </Box>
                    <Check size={17} color="#16845c" />
                  </Stack>
                </Stack>

                <Box sx={{ p: 1.6, display: "flex", gap: 1.25, alignItems: "center", bgcolor: "#f5f5ff", border: "1px solid #ebecff", borderRadius: 2.5 }}>
                  <Box sx={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: "white", color: "#4f46e5" }}>
                    <CircleHelp size={17} />
                  </Box>
                  <Typography variant="caption" sx={{ color: "#5c6680", lineHeight: 1.55 }}>
                    Need a hand? The CivicPulse help assistant can guide your next step.
                  </Typography>
                  <ChevronRight size={17} color="#4f46e5" />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ pb: { xs: 7, md: 11 } }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "flex-end" }} spacing={2} sx={{ mb: 3.5 }}>
            <Box>
              <Typography sx={{ color: "#4f46e5", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em" }}>BUILT FOR EVERYDAY CIVIC LIFE</Typography>
              <Typography component="h2" sx={{ mt: 0.8, fontSize: { xs: "1.8rem", sm: "2.25rem" }, fontWeight: 800, letterSpacing: "-0.045em" }}>
                From a concern to a clearer next step.
              </Typography>
            </Box>
            <Typography sx={{ maxWidth: 420, color: "#78839a", lineHeight: 1.7, fontSize: "0.92rem" }}>
              Useful tools for residents and a more organised view for the teams responding to them.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} key={feature.title}>
                <Paper elevation={0} sx={{ height: "100%", p: { xs: 2.5, sm: 3 }, border: "1px solid #e7eaf2", borderRadius: 3, bgcolor: "white", transition: "transform 160ms ease, box-shadow 160ms ease", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 14px 32px rgba(36,48,91,0.08)" } }}>
                  <Box sx={{ width: 42, height: 42, display: "grid", placeItems: "center", color: "#4f46e5", bgcolor: "#f0f1ff", borderRadius: 2.5, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography sx={{ color: "#858fa3", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.12em" }}>{feature.eyebrow}</Typography>
                  <Typography sx={{ mt: 0.55, fontWeight: 800, fontSize: "1.08rem" }}>{feature.title}</Typography>
                  <Typography sx={{ mt: 1, color: "#768197", lineHeight: 1.7, fontSize: "0.9rem" }}>{feature.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Paper elevation={0} sx={{ mb: { xs: 7, md: 11 }, p: { xs: 3, sm: 4.5 }, borderRadius: 4, color: "white", background: "linear-gradient(115deg, #232a53 0%, #3f3c9b 60%, #4f46e5 100%)", overflow: "hidden", position: "relative" }}>
          <Box sx={{ position: "absolute", width: 240, height: 240, border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", right: { xs: -120, md: 70 }, top: -130 }} />
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={3} sx={{ position: "relative" }}>
            <Box>
              <Typography sx={{ fontSize: { xs: "1.4rem", sm: "1.75rem" }, fontWeight: 800, letterSpacing: "-0.035em" }}>A better city starts with being heard.</Typography>
              <Typography sx={{ mt: 0.75, maxWidth: 560, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                Share what needs attention. CivicPulse helps make the report easier to route and follow.
              </Typography>
            </Box>
            <Button component={Link} to="/register" variant="contained" endIcon={<ArrowRight size={17} />} sx={{ flexShrink: 0, px: 2.5, py: 1.3, color: "#24284c", bgcolor: "white", borderRadius: 2.5, fontWeight: 800, "&:hover": { bgcolor: "#f1f2ff" } }}>
              Get started
            </Button>
          </Stack>
        </Paper>
      </Container>

      <Box component="footer" sx={{ borderTop: "1px solid #e9edf4", bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ py: 3.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MapPinned size={18} color="#4f46e5" />
              <Typography sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}>CivicPulse</Typography>
              <Typography variant="caption" sx={{ color: "#97a0b1" }}>· Open civic technology</Typography>
            </Stack>
            <Stack direction="row" spacing={2.5}>
              <Button component={Link} to="/track" size="small" color="inherit">Track</Button>
              <Button component={Link} to="/login" size="small" color="inherit">Sign in</Button>
              <Button component={Link} to="/register" size="small" color="inherit">Register</Button>
            </Stack>
            <Typography variant="caption" sx={{ color: "#97a0b1" }}>© {new Date().getFullYear()} CivicPulse</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
