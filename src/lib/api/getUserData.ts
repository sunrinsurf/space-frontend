import client from "./client";
import AccessToken from "./AccessToken";

export async function getUserData(id: string) {
  const req = await client.get("/user/" + id, AccessToken());
  return req.data;
}
