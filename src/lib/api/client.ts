import axios from "axios";

const baseURL = process.env.REACT_APP_LOCAL
  ? "http://192.168.0.6:4000/"
  : "https://iamking.me";
const client = axios.create({
  baseURL
});

export default client;
