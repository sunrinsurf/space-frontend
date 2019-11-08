import client from "./client";

function getFavoriteCategory(token: string, id: string) {
  return client.get(`/user/${id}/interest`, {
    headers: {
      "x-access-token": token
    }
  });
}

export default getFavoriteCategory;
