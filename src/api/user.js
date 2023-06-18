import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  login(payload) {
    return api.post("/auth/login", payload);
  },
  userDetail() {
    return api.get("/user/detail", getToken());
  },
};
