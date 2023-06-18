import { message } from "antd";
import axios from "axios";

const baseURL = "http://localhost:3000/v1";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...config,
  };
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    message.error(error?.response?.data?.message);

    if (error.response?.status === 403) {
      window.location.replace("/login");
    }

    if (error.response?.status === 401) {
      // window.location.replace('/');
      // localStorage.clear();
      // sessionStorage.clear();
      return;
    }

    // eslint-disable-next-line no-alert
    return Promise.reject(error);
  }
);

export default api;
