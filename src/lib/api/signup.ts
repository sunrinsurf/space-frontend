import handleError from "./handleError";
import client from "./client";

export function phoneCertAPI(phone?: string) {
  return handleError(async () => {
    if (!phone) {
      throw new Error("phone 항목이 필요합니다.");
    }
    const req = await client.post("/user/sms", { phone });
    return req;
  });
}

export function phoneCertVerify(phone: string, code?: string, token?: string) {
  return handleError(async () => {
    if (!code || !token) {
      throw new Error("필수 항목이 필요합니다");
    }
    const req = await client.put('/user/sms/' + code, {
      phone, token
    });
    return req;
  })
}

export function signUpCompleteAPI(data: { uid: string, password: string, nickname: string, email: string, phone: string, address: string, interest: any[], ptoken: string }) {
  return handleError(async () => {
    const req = await client.post('/user', data);
    return req;
  });
}