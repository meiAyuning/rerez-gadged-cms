import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getFeature() {
    return api.get("/features", getToken());
  },
  createFeature(payload) {
    return api.post("/features", payload, getToken());
  },
  updateFeature(payload, id) {
    return api.put(`/features/update/${id}`, payload, getToken());
  },
  deleteFeature(id) {
    return api.delete(`/features/delete/${id}`, getToken());
  },
};
