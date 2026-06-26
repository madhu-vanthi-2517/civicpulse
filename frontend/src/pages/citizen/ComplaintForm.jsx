import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import { FileText, AlignLeft, MapPin, Building, Send, Cpu, AlertTriangle, Upload, Loader2, X } from "lucide-react";
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography, IconButton } from "@mui/material";

const PUDUCHERRY_DISTRICTS = ["Puducherry", "Karaikal", "Mahe", "Yanam"];

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  
  // 🌟 FIXED: State fields to handle the image file binary and local image previews
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { token, user } = useAuth();

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setArea(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLocLoading(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setLocLoading(false);
      }
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate browser preview URL
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!title || !description || !district) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 🌟 FIXED (Requirement 3): Construct submission using FormData, NOT normal JSON strings
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("district", district);
      formData.append("area", area);
      
      // Check if user object has id before passing
      if (user?.id) {
        formData.append("user_id", user.id);
      }

      // 🌟 FIXED (Requirement 4): Append the file binary using Jeeva's exact required key: "image"
      if (image) {
        formData.append("image", image);
      }

      // 🌟 FIXED (Requirement 5): Offload to api.js handler without passing JSON headers
      const data = await api.submitComplaint(formData, token);
      
      if (data.id) {
        setResult(data);
        setTitle("");
        setDescription("");
        setDistrict("");
        setArea("");
        setImage(null);
        setImagePreview(null);
      } else {
        setError(data.detail || "Submission failed. Try again.");
      }
    } catch (err) {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: { xs: 3, sm: 5, md: 7 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 4, p: { xs: 3, sm: 4, md: 5 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Submit a Complaint</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>Share the issue details below so it can be routed quickly and tracked transparently.</Typography>

          <Stack spacing={2.5}>
            <TextField label="Complaint Title *" placeholder="Enter your complaint here" value={title} onChange={(e) => setTitle(e.target.value)} InputProps={{ startAdornment: <Box sx={{ mr: 1, color: "text.secondary" }}><FileText size={18} /></Box> }} fullWidth />

            <TextField label="Description *" placeholder="Describe the issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} InputProps={{ startAdornment: <Box sx={{ mr: 1, mt: 0.5, color: "text.secondary" }}><AlignLeft size={18} /></Box> }} fullWidth />

            <TextField select label="District *" value={district} onChange={(e) => setDistrict(e.target.value)} SelectProps={{ native: true }} InputProps={{ startAdornment: <Box sx={{ mr: 1, color: "text.secondary" }}><Building size={18} /></Box> }} fullWidth>
              <option value="">Select District</option>
              {PUDUCHERRY_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </TextField>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
              <TextField label="Area / Locality" placeholder="Enter the location" value={area} onChange={(e) => setArea(e.target.value)} InputProps={{ startAdornment: <Box sx={{ mr: 1, color: "text.secondary" }}><MapPin size={18} /></Box> }} fullWidth />
              <Button variant="outlined" onClick={handleGetCurrentLocation} disabled={locLoading} sx={{ minWidth: { xs: "100%", sm: 210 }, py: 1.4, borderRadius: 2, whiteSpace: "nowrap" }}>
                {locLoading ? <Loader2 className="animate-spin" size={16} style={{ marginRight: 8 }} /> : <MapPin size={16} style={{ marginRight: 8 }} />}
                Use Current Location
              </Button>
            </Box>

            {/* 📸 Evidence Selection Box with Interactive File Input Preview and Dismiss Actions */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>Upload Evidence</Typography>
              {!imagePreview ? (
                <label style={{ border: "2px dashed #cbd5e1", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", background: "#f8fafc", transition: "all 0.2s ease" }}>
                  <Upload size={24} style={{ color: "#64748b" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>Click to select or upload an image</Typography>
                  {/* 🌟 FIXED (Requirement 1): Added HTML file filetype constraint tag hooks */}
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                </label>
              ) : (
                <Box sx={{ position: "relative", width: "100%", maxWidth: 280, borderRadius: 3, overflow: "hidden", border: 1, borderColor: "divider", bgcolor: "grey.50" }}>
                  <img src={imagePreview} alt="Selected preview" style={{ width: "100%", height: "auto", maxHeight: "180px", objectCover: "cover", display: "block" }} />
                  <IconButton onClick={handleRemoveImage} size="small" sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.6)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.8)" } }}>
                    <X size={14} />
                  </IconButton>
                  <Box sx={{ p: 1, borderTop: 1, borderColor: "divider", bgcolor: "white" }}>
                    <Typography variant="caption" noWrap sx={{ display: "block", color: "text.secondary", px: 0.5 }}>{image?.name}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {error && (
              <Box sx={{ bgcolor: "error.50", border: 1, borderColor: "error.100", borderRadius: 2, p: 2 }}>
                <Typography variant="body2" sx={{ color: "error.main" }}>{error}</Typography>
                <Typography variant="caption" sx={{ color: "error.light", display: "block", mt: 0.5 }}>Make sure the backend server is running, or try again in a moment.</Typography>
              </Box>
            )}

            <Button onClick={handleSubmit} disabled={loading} variant="contained" sx={{ py: 1.4, borderRadius: 2, fontWeight: 700 }}>
              {loading ? <Loader2 className="animate-spin" size={16} style={{ marginRight: 8 }} /> : <Send size={16} style={{ marginRight: 8 }} />}
              {loading ? "Submitting..." : "Submit Complaint"}
            </Button>

            {result && (
              <Box sx={{ bgcolor: "success.50", border: 1, borderColor: "success.100", borderRadius: 3, p: 2.5 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Cpu size={16} color="#059669" />
                  <Typography variant="subtitle2" sx={{ color: "success.dark", fontWeight: 700 }}>AI Classification Analysis Complete</Typography>
                </Stack>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={4}><Box sx={{ bgcolor: "white", borderRadius: 2, p: 1.5, textAlign: "center", border: 1, borderColor: "success.100" }}><Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 1.1 }}>Category</Typography><Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5, textTransform: "capitalize" }}>{result.category || "N/A"}</Typography></Box></Grid>
                  <Grid item xs={12} sm={4}><Box sx={{ bgcolor: "white", borderRadius: 2, p: 1.5, textAlign: "center", border: 1, borderColor: "success.100" }}><Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 1.1 }}>Urgency</Typography><Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5, textTransform: "capitalize" }}>{result.urgency || "N/A"}</Typography></Box></Grid>
                  <Grid item xs={12} sm={4}><Box sx={{ bgcolor: "white", borderRadius: 2, p: 1.5, textAlign: "center", border: 1, borderColor: "success.100" }}><Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 1.1 }}>Department</Typography><Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5, textTransform: "uppercase" }}>{result.department || "N/A"}</Typography></Box></Grid>
                </Grid>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1.5 }}>Registered Base ID Target: <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>#{result.id}</Box></Typography>
              </Box>
            )}

            {result?.duplicate_warning && (
              <Box sx={{ bgcolor: "warning.50", border: 1, borderColor: "warning.100", borderRadius: 2, p: 2, display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <AlertTriangle size={18} color="#d97706" style={{ marginTop: 2, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "warning.dark", fontWeight: 700 }}>Similarity Warning: Found Duplicate Match #{result.similar_to_id}</Typography>
                  <Typography variant="caption" sx={{ color: "warning.dark", lineHeight: 1.6, display: "block", mt: 0.5 }}>A matching complaint structure has already been indexed at this zone. Your ticket was successfully appended to the queue for active human cross-review.</Typography>
                </Box>
              </Box>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}