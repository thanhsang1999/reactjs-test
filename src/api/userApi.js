import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  forgotEmail1(data) {
    const url = "/forgotpassword/email";
    return axiosClient.post(url, data);
  },
};
export default userApi;
