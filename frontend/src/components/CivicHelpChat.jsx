import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";

const quickQuestions = ["How do I report an issue?", "How can I track a complaint?", "Can I dictate my report?"];

function getAnswer(question) {
  const text = question.toLowerCase();

  if (text.includes("track") || text.includes("status") || text.includes("complaint id")) {
    return {
      text: "Sign in with the account you used to report the issue, then open My Complaints. Complaint details and progress are private to the citizens who reported them and authorized authorities.",
      action: { label: "Go to my complaints", to: "/my-complaints" },
    };
  }

  if (text.includes("report") || text.includes("submit") || text.includes("file")) {
    return {
      text: "Sign in as a citizen, then open Submit. Add a clear title, describe the issue, choose a district, and include the area or a photo if available.",
      action: { label: "Sign in to report", to: "/login" },
    };
  }

  if (text.includes("voice") || text.includes("dictat") || text.includes("microphone") || text.includes("speak")) {
    return {
      text: "On the complaint form, choose the microphone button below the description. Allow microphone access and speak clearly. Voice input depends on browser support and may require a secure connection.",
      action: { label: "Go to sign in", to: "/login" },
    };
  }

  if (text.includes("duplicate") || text.includes("same issue") || text.includes("already reported")) {
    return {
      text: "CivicPulse checks for similar reports and can flag a possible duplicate during submission. Review the result shown after you submit.",
    };
  }

  if (text.includes("category") || text.includes("department") || text.includes("urgent") || text.includes("classif")) {
    return {
      text: "CivicPulse uses AI-assisted classification to suggest a category, urgency, and responsible department from the report details. Authorities review and manage complaints.",
    };
  }

  if (text.includes("privacy") || text.includes("data") || text.includes("stored")) {
    return {
      text: "Your report details are sent to CivicPulse when you submit the form. Dictation uses your browser's speech-recognition feature; availability and processing depend on the browser and its settings.",
    };
  }

  return {
    text: "I can help with reporting an issue, tracking a complaint, voice dictation, duplicate reports, or how CivicPulse classifies complaints. What would you like to know?",
  };
}

export default function CivicHelpChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I can help you report a civic issue or find your complaint status." },
  ]);

  const sendQuestion = (value) => {
    const text = value.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "assistant", ...getAnswer(text) },
    ]);
    setQuestion("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendQuestion(question);
  };

  return (
    <>
      {open && (
        <Paper
          component="section"
          role="dialog"
          aria-label="CivicPulse help"
          elevation={12}
          sx={{
            position: "fixed",
            right: { xs: 12, sm: 24 },
            bottom: { xs: 82, sm: 92 },
            zIndex: 1400,
            width: { xs: "calc(100vw - 24px)", sm: 380 },
            maxWidth: 420,
            height: { xs: "min(600px, calc(100vh - 110px))", sm: 540 },
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5, bgcolor: "primary.main", color: "common.white" }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Bot size={20} aria-hidden="true" />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>CivicPulse Help</Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>Guidance for reporting and tracking</Typography>
              </Box>
            </Stack>
            <IconButton onClick={() => setOpen(false)} aria-label="Close help chat" sx={{ color: "inherit" }}>
              <X size={20} />
            </IconButton>
          </Stack>

          <Box
            role="log"
            aria-live="polite"
            sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5, bgcolor: "grey.50" }}
          >
            {messages.map((message, index) => (
              <Box
                key={`${message.role}-${index}`}
                sx={{
                  alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "90%",
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: message.role === "user" ? "primary.main" : "common.white",
                  color: message.role === "user" ? "common.white" : "text.primary",
                  border: message.role === "user" ? 0 : 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{message.text}</Typography>
                {message.action && (
                  <Button
                    component={Link}
                    to={message.action.to}
                    onClick={() => setOpen(false)}
                    size="small"
                    variant="text"
                    sx={{ mt: 0.5, px: 0, minWidth: 0, fontWeight: 700 }}
                  >
                    {message.action.label}
                  </Button>
                )}
              </Box>
            ))}
            {messages.length === 1 && (
              <Stack spacing={1} sx={{ mt: 1 }}>
                {quickQuestions.map((item) => (
                  <Button key={item} onClick={() => sendQuestion(item)} variant="outlined" size="small" sx={{ justifyContent: "flex-start", borderRadius: 2 }}>
                    {item}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ p: 1.5, borderTop: 1, borderColor: "divider", bgcolor: "common.white" }}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <TextField
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about CivicPulse..."
                size="small"
                fullWidth
                inputProps={{ "aria-label": "Ask CivicPulse Help" }}
              />
              <IconButton type="submit" color="primary" aria-label="Send question" disabled={!question.trim()}>
                <Send size={19} />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      )}

      <Button
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close CivicPulse Help" : "Open CivicPulse Help"}
        aria-expanded={open}
        variant="contained"
        startIcon={open ? <X size={19} /> : <MessageCircle size={19} />}
        sx={{
          position: "fixed",
          right: { xs: 12, sm: 24 },
          bottom: { xs: 12, sm: 24 },
          zIndex: 1401,
          borderRadius: 999,
          px: 2,
          py: 1.25,
          boxShadow: 5,
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        {open ? "Close help" : "Need help?"}
      </Button>
    </>
  );
}
