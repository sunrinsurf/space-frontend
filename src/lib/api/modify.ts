import handleError from "./handleError";
import client from "./client";

export function modifyProfileImage(image: string, token: string) {
  return handleError(async () => {
    await client.put(
      "/user/profileImage",
      { profileImage: image },
      {
        headers: {
          "x-access-token": token
        }
      }
    );
  });
}
export function modifyNickname(nickname: string, token: string) {
  return handleError(async () => {
    await client.put(
      "/user/nickname",
      { nickname },
      {
        headers: {
          "x-access-token": token
        }
      }
    );
  });
}

export function modifyInterest(interest: string[], token: string) {
  return handleError(async () => {
    await client.put(
      "/user/interest",
      { interest },
      {
        headers: {
          "x-access-token": token
        }
      }
    );
  });
}
