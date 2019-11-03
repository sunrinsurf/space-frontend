import client from "./client";

export async function InviteChatAPI(id: string, token: string) {
  const req = await client.post(
    `/shop/${id}/invite`,
    {},
    {
      headers: {
        "x-access-token": token
      }
    }
  );

  return req;
}

export async function JoinChatAPI(id: string, token: string) {
  const req = await client.post(
    `/chatapi/${id}/join`,
    {},
    {
      headers: {
        "x-access-token": token
      }
    }
  );

  return req.data.chat;
}
