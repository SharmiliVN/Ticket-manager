import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function TicketView() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/tickets/${id}`)
      .then((res) => setTicket(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load ticket");
        navigate("/tickets");
      });
    // eslint-disable-next-line
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div>
      <h3>Ticket #{ticket.id}</h3>
      <div className="detail">
        <div style={{ marginBottom: 12 }}>
          <strong>Title:</strong> <div>{ticket.title}</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <strong>Description:</strong>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{ticket.description}</pre>
        </div>

        <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
          <div>
            <strong>Priority:</strong>
            <div>{ticket.priority}</div>
          </div>
          <div>
            <strong>Status:</strong>
            <div>{ticket.status}</div>
          </div>
          <div>
            <strong>Created:</strong>
            <div>{new Date(ticket.created_at).toLocaleString()}</div>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <button className="button" onClick={() => navigate("/tickets")}>
            Back to list
          </button>
        </div>
      </div>
    </div>
  );
}
