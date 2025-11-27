import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [useAi, setUseAi] = useState(false);
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    setLoading(true);
    try {
      const body = { title, description, use_ai: useAi };
      if (priority) body.priority = priority;
      const res = await api.post("/tickets", body);
      alert("Ticket created (id: " + res.data.id + ").");
      navigate("/tickets");
    } catch (err) {
      console.error(err);
      alert("Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Ticket</h3>
      <form onSubmit={submit} className="create-form">
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short summary (e.g. Payment failed)"
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail"
          />
        </div>

        <div className="form-row">
          <label>Optional manual priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">(let system suggest)</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="form-row">
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={useAi} onChange={(e) => setUseAi(e.target.checked)} />
            <span style={{ fontWeight: 600 }}>Use AI suggestion (LLM or rule-based)</span>
          </label>
        </div>

        <div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Creating..." : "Create Ticket"}
          </button>
          <button
            type="button"
            className="button secondary"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setTitle("");
              setDescription("");
              setPriority("");
              setUseAi(false);
            }}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
