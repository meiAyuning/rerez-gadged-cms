import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getPayment() {
    return api.get("/payment", getToken());
  },
  createPayment(payload) {
    return api.post("/payment/create", payload, getToken());
  },
  updatePayment(payload, id) {
    return api.put(`/payment/update/${id}`, payload, getToken());
  },
  deletePayment(id) {
    return api.delete(`/payment/delete/${id}`, getToken());
  },
};
