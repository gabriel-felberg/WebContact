import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export const apiPrivate = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("@token")
    )}`,
  },
});