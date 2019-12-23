import client from "./client";

export async function ProductLetInProgress(id: string, token: string) {
  await client.post(
    `/shop/${id}/start`,
    {},
    {
      headers: {
        "x-access-token": token
      }
    }
  );
}
export async function ProductLetEnd(id: string, token: string) {
  await client.post(
    `/shop/${id}/end`,
    {},
    {
      headers: {
        "x-access-token": token
      }
    }
  );
}
