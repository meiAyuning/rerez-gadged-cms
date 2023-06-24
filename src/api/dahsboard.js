import api from "@/config/axios";
import { getToken } from "@/utils";

export default {
  getGraph() {
    return api.get("/dashboard", getToken());
  },
};
