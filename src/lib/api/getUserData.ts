import client from "./client";
import AccessToken from "./AccessToken";

export async function getUserData(id: string, token: string) {
  try {
    const req = await client.get("/user/" + id, AccessToken(token));
    return req.data;
  } catch (e) {
    window.alert && window.alert(e.message);
    console.error(e);
  }
}
