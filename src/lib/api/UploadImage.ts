import client, { baseURL } from "./client";

function UploadImage({ files, token }: { files: File[]; token?: string }) {
  const formData = new FormData();
  files.forEach((data, i) => {
    formData.append(`${i}`, data);
  });

  return client.post(
    "/image",
    formData,
    token
      ? {
          headers: {
            "x-access-token": token
          }
        }
      : {}
  );
}
export function getImageURL(id: string, thumbnail?: boolean) {
  return baseURL + `/image/${id}${thumbnail ? "/thumbnail" : ""}`;
}

export default UploadImage;
