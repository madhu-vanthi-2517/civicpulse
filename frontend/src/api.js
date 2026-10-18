const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://civicpulse-backend-dlyv.onrender.com";
const authHeaders = (token) => ({ Authorization: "Bearer ".concat(token) });

export const api = {
  BASE_URL,

  register: async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  submitComplaint: async (formData, token) => {
    const res = await fetch(`${BASE_URL}/api/complaint`, {
      method: "POST",
      headers: authHeaders(token),
      body: formData,
    });
    return res.json();
  },

  getComplaints: async (token) => {
    const res = await fetch(`${BASE_URL}/api/complaints`, {
      headers: authHeaders(token),
    });
    return res.json();
  },

  getComplaintById: async (id, token) => {
    const res = await fetch(`${BASE_URL}/api/complaint/${id}`, {
      headers: authHeaders(token),
    });
    return res.json();
  },

  getMyComplaints: async (token) => {
    const res = await fetch(`${BASE_URL}/api/complaints/mine`, {
      headers: authHeaders(token),
    });
    return res.json();
  },

  getComplaintImage: async (id, token) => {
    const res = await fetch(`${BASE_URL}/api/complaint/${id}/image`, {
      headers: authHeaders(token),
    });
    if (!res.ok) {
      throw new Error("Could not load complaint evidence.");
    }
    return res.blob();
  },

  updateStatus: async (id, status, token) => {
    const res = await fetch(`${BASE_URL}/api/complaint/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(token),
      },
      body: JSON.stringify({ status, remarks: "" }),
    });
    return res.json();
  },

  getAnalytics: async (token) => {
    const res = await fetch(`${BASE_URL}/api/analytics`, {
      headers: authHeaders(token),
    });
    return res.json();
  },
};
