import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getBrand() {
    return api.get("/brand", getToken());
  },
  createBrand(payload) {
    return api.post("/brand", payload, getToken());
  },
  updateBrand(payload, id) {
    return api.put(`/brand/update/${id}`, payload, getToken());
  },
  deleteBrand(id) {
    return api.delete(`/brand/delete/${id}`, getToken());
  },
};
