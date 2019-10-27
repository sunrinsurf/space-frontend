import store from "../../store";
import { AxiosRequestConfig } from "axios";
function AccessToken(config?: AxiosRequestConfig) {
  const token = store.getState().Auth.token;
  if (!token) throw new Error("로그인이 필요합니다.");

  const r = {
    headers: {
      "x-access-token": token
    }
  };
  return config ? { r, ...config } : r;
}

export default AccessToken;
