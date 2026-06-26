import { useState, useEffect } from "react";
import { api } from "../../api";
import ComplaintCard from "../../components/ComplaintCard";
import { Search, Map } from "lucide-react";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

const PUDUCHERRY_DISTRICTS = ["Puducherry", "Karaikal", "Mahe", "Yanam"];

export default function PublicTracker() {
  const [complaints, setComplaints] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const data = await api.getPublicComplaints(selectedDistrict);
        if (Array.isArray(data)) {
          setComplaints(data);
        }
      } catch (err) {
        console.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [selectedDistrict]);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    const found = complaints.find(
      (c) => String(c.id) === searchId.trim() || `CP${String(c.id).padStart(3, "0")}` === searchId.trim().toUpperCase()
    );
    if (found) {
      setSearchResult(found);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>CivicPulse</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>Public Complaint Tracker — Puducherry Territory</Typography>
        </Box>

        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: { xs: 2.5, sm: 3 }, mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Search size={18} color="#64748b" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Track Individual Ticket ID</Typography>
          </Stack>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
            <TextField fullWidth placeholder="Enter Complaint ID (e.g. 1 or CP001)" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <Button variant="contained" onClick={handleSearch} sx={{ minWidth: { xs: "100%", sm: 140 }, py: 1.4, borderRadius: 2 }}>Search</Button>
          </Box>
          {searchResult && (
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.1, mb: 1, display: "block" }}>Search Match Found:</Typography>
              <ComplaintCard complaint={{ ...searchResult, location: `${searchResult.district} — ${searchResult.area}` }} />
            </Box>
          )}
          {notFound && (
            <Typography variant="body2" sx={{ mt: 2, color: "error.main", bgcolor: "error.50", border: 1, borderColor: "error.100", borderRadius: 2, p: 1.5, display: "inline-block" }}>
              ⚠ No system complaint matched that identifier value.
            </Typography>
          )}
        </Paper>

        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: { xs: 2.5, sm: 3 }, mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Map size={18} color="#64748b" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Filter Jurisdiction Node</Typography>
          </Stack>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Button variant={selectedDistrict === "" ? "contained" : "outlined"} onClick={() => setSelectedDistrict("")} sx={{ borderRadius: 999, px: 2, py: 0.8 }}>
              All Regions
            </Button>
            {PUDUCHERRY_DISTRICTS.map((d) => (
              <Button key={d} variant={selectedDistrict === d ? "contained" : "outlined"} onClick={() => setSelectedDistrict(d)} sx={{ borderRadius: 999, px: 2, py: 0.8 }}>
                {d}
              </Button>
            ))}
          </Box>
        </Paper>

        {loading ? (
          <Stack spacing={2}>
            {[1, 2, 3].map((i) => (
              <Paper key={i} elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 2.5, animation: "pulse 1.5s ease-in-out infinite" }}>
                <Box sx={{ height: 12, bgcolor: "grey.200", borderRadius: 999, width: "30%", mb: 1.5 }} />
                <Box sx={{ height: 10, bgcolor: "grey.100", borderRadius: 999, width: "60%" }} />
              </Paper>
            ))}
          </Stack>
        ) : (
          <Stack spacing={2}>
            {complaints.length === 0 ? (
              <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 5, textAlign: "center", color: "text.secondary" }}>
                No active public complaints registered inside this node filter.
              </Paper>
            ) : (
              complaints.map((complaint) => <ComplaintCard key={complaint.id} complaint={{ ...complaint, location: `${complaint.district} — ${complaint.area}` }} />)
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
}