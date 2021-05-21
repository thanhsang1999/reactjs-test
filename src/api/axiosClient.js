import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.0.222:2021",
  headers: {
    // "Content-Type": "application/json",
  },
});
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;
