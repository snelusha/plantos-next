import axios from "axios";

const client = axios.create({
  baseURL: process.env.MYCODO_BACKEND_URL,
  headers: {
    Accept: "application/vnd.mycodo.v1+json",
    "X-API-KEY": process.env.MYCODO_API_KEY,
  },
});

export { client };
