import axiosClient from "./axiosClient";

const testApi = {
  newMenber(data) {
    const url = "/member";
    return axiosClient.post(url, data);
  },
  checkEmail(data) {
    const url = "/member/email";
    return axiosClient.post(url, data);
  },
  getMember(params) {
    const url = "/member";
    return axiosClient.get(url, { params });
  },
  getMemberByEmail(email) {
    const url = `/member/${email}`;
    return axiosClient.get(url);
  },
  updateNew(id, data) {
    const url = `/member`;
    return axiosClient.put(url, data);
  },
  deleteNew(id) {
    const url = `/member`;
    return axiosClient.delete(url);
  },
};
export default testApi;
