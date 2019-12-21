import client, { baseURL } from "./client";

function UploadImage({ data, token }: { data: any; token: string }) {
  return client.post("/image", data, {
    headers: {
      "x-access-token": token
    }
  });
}
export function getImageURL(id: string, thumbnail?: boolean) {
  return baseURL + `/image/${id}${thumbnail ? "/thumbnail" : ""}`;
}

export default UploadImage;
