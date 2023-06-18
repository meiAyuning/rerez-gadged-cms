import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getFooter() {
    return api.get("/footer", getToken());
  },
  createFooter(payload) {
    return api.post("/footer", payload, getToken());
  },
  updateFooter(payload, id) {
    return api.put(`/footer/update/${id}`, payload, getToken());
  },
  deleteFooter(id) {
    return api.delete(`/footer/delete/${id}`, getToken());
  },
};
