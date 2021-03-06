import axios from "axios";

export const baseURL = process.env.REACT_APP_LOCAL
  ? "http://127.0.0.1:4000"
  : "https://api.surfspace.me";
const client = axios.create({
  baseURL
});

export default client;
