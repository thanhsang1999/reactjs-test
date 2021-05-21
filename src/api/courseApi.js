import axiosClient from "./axiosClient";

const courseApi = {
  getAll(params) {
    const url = "/course/list";
    return axiosClient.get(url, { params });
  },
};
export default courseApi;
