const BASE_URL = "https://crouton-gab-amaze.ngrok-free.dev";

export const api = {
  // Auth
  register: async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  // Complaints
  submitComplaint: async (data, token) => {
    const res = await fetch(`${BASE_URL}/api/complaint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getComplaints: async (token) => {
    const res = await fetch(`${BASE_URL}/api/complaints`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });
    return res.json();
  },

  getPublicComplaints: async (district = "") => {
    const url = district
      ? `${BASE_URL}/api/complaints/public?district=${district}`
      : `${BASE_URL}/api/complaints/public`;
    const res = await fetch(url, {
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    return res.json();
  },

  updateStatus: async (id, status, token) => {
    const res = await fetch(
      `${BASE_URL}/api/complaint/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ status, remarks: "" })
      }
    );
    return res.json();
  },

  // Analytics
  getAnalytics: async (token) => {
    const res = await fetch(`${BASE_URL}/api/analytics`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });
    return res.json();
  }
};