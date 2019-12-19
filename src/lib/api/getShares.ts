import client from "./client";

export function getShares(token?: string | null) {
  const options: any = {};
  if (token) {
    options.headers = {
      "x-access-token": token
    };
  }
  return client.get("/shop", options);
}

export async function getShare(id: string) {
  const req = await client.get(`/shop/${id}`);
  return req.data.product;
}
