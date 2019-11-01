import { AxiosRequestConfig } from "axios";

function AccessToken(token: string, config?: AxiosRequestConfig) {
  const r = {
    headers: {
      "x-access-token": token
    }
  };
  return config ? { r, ...config } : r;
}

export default AccessToken;
