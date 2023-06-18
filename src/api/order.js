import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getOrder() {
    return api.get("/order", getToken());
  },
  createOrder(payload) {
    return api.post("/order", payload, getToken());
  },
  updateOrderStatus(payload, id) {
    return api.put(`/order/update-status/${id}`, payload, getToken());
  },
  deleteOrder(id) {
    return api.delete(`/order/delete/${id}`, getToken());
  },
};
