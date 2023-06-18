import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getBanner() {
    return api.get("/banner", getToken());
  },
  createBanner(payload) {
    return api.post("/banner", payload, getToken());
  },
  updateBanner(payload, id) {
    return api.put(`/banner/update/${id}`, payload, getToken());
  },
  deleteBanner(id) {
    return api.delete(`/banner/delete/${id}`, getToken());
  },
};
