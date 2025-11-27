import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateTicket from "./pages/CreateTicket";
import TicketsList from "./pages/TicketsList";
import TicketView from "./pages/TicketView";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container" role="root">
        <h2>Simple Ticket Manager</h2>
        <nav>
          <Link to="/">Create Ticket</Link> | <Link to="/tickets">Tickets</Link>
        </nav>

        <div className="panel">
          <Routes>
            <Route path="/" element={<CreateTicket />} />
            <Route path="/tickets" element={<TicketsList />} />
            <Route path="/tickets/:id" element={<TicketView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
