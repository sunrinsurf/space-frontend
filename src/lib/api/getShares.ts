import client from "./client";

export function getShares(
  token?: string | null,
  pagination?: number,
  search?: string
) {
  const options: any = {};
  if (token) {
    options.headers = {
      "x-access-token": token
    };
  }

  const query = `?${pagination ? `page=${pagination}&` : ""}${
    search ? `search=${search}` : ""
  }`;
  return client.get("/shop" + query, options);
}

export async function getShare(id: string) {
  const req = await client.get(`/shop/${id}`);
  return req.data.product;
}

export function getMainShare() {
  return client.get("/shop?limit=4");
}
