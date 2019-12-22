import handleError from "./handleError";
import client from "./client";

export function modifyProfileImage(image: string, token: string) {
  console.log(image);
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
