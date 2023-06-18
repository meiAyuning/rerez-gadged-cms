import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getPromo() {
    return api.get("/promo", getToken());
  },
  createPromo(payload) {
    return api.post("/promo", payload, getToken());
  },
  updatePromo(payload, id) {
    return api.put(`/promo/update/${id}`, payload, getToken());
  },
  deletePromo(id) {
    return api.delete(`/promo/delete/${id}`, getToken());
  },
};
