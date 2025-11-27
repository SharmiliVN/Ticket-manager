import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default axios.create({
  baseURL: API_BASE + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});
