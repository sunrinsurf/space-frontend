import client from "./client";

export function getShares(token?: string | null, pagination?: number) {
  const options: any = {};
  if (token) {
    options.headers = {
      "x-access-token": token
    };
  }
  const query = pagination ? `?page=${pagination}` : "";
  return client.get("/shop" + query, options);
}

export async function getShare(id: string) {
  const req = await client.get(`/shop/${id}`);
  return req.data.product;
}
