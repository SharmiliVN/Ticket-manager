import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tickets");
      setTickets(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tickets/${id}/status`, { status });
      fetch();
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete ticket " + id + "?")) return;
    try {
      await api.delete(`/tickets/${id}`);
      fetch();
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <h3>Tickets</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Title</th>
              <th style={{ width: 110 }}>Priority</th>
              <th style={{ width: 120 }}>Status</th>
              <th style={{ width: 200 }}>Created</th>
              <th style={{ width: 240 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>
                  <Link to={`/tickets/${t.id}`}>{t.title}</Link>
                </td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
                <td className="actions">
                  {t.status !== "IN_PROGRESS" && (
                    <button className="start" onClick={() => updateStatus(t.id, "IN_PROGRESS")}>
                      Start
                    </button>
                  )}
                  {t.status !== "CLOSED" && (
                    <button className="close" onClick={() => updateStatus(t.id, "CLOSED")}>
                      Close
                    </button>
                  )}
                  <button className="delete" onClick={() => del(t.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && !loading && (
              <tr>
                <td colSpan="6" style={{ padding: 24, textAlign: "center", color: "#6b7280" }}>
                  No tickets yet.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan="6" style={{ padding: 24, textAlign: "center", color: "#6b7280" }}>
                  Loading…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
