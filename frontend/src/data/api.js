const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function getProfile() {
  const response = await fetch(`${API_BASE}/api/profile`);
  if (!response.ok) throw new Error("Unable to load portfolio data.");
  return response.json();
}

export async function sendContact(payload) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Unable to send message.");
  return data;
}
