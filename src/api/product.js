import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getProduct() {
    return api.get("/product", getToken());
  },
  getDetailProduct(id) {
    return api.get(`/product/detail/${id}`, getToken());
  },
  createProduct(payload) {
    return api.post("/product/create", payload, getToken());
  },
  updateProduct(payload, id) {
    return api.put(`/product/update/${id}`, payload, getToken());
  },
  deleteProduct(id) {
    return api.delete(`/product/delete/${id}`, getToken());
  },
};
