import store from "../../store";
import { AxiosRequestConfig } from "axios";

function AccessToken(token: string, config?: AxiosRequestConfig) {
  console.log("getState", store);
  const r = {
    headers: {
      "x-access-token": token
    }
  };
  return config ? { r, ...config } : r;
}

export default AccessToken;
