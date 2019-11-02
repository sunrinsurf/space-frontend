import client from "./client";

export function getShares() {
  return client.get("/shop");
}

export async function getShare(id: string) {
  const req = await client.get(`/shop/${id}`);
  return req.data.product;
}
