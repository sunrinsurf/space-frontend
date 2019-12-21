import client from "./client";
import handleError from "./handleError";
import UploadImage from "./UploadImage";

interface PostProductImage {
  data: string;
  type: string;
}
interface PostProductInterface {
  title: string;
  category: string;
  contents: string;
  images: PostProductImage[];
  royalty: String;
  royaltyPrice?: Number;
  timeToUse: String;
  timeToUseDate?: Date;
  person: Number;
}

export function PostProduct(data: PostProductInterface, token: string) {
  return handleError(() =>
    client.post("/shop", data, {
      headers: {
        "x-access-token": token
      }
    })
  );
}

export function PostProductImage(files: File[], token: string) {
  return handleError(async () => {
    const data = await UploadImage({ files, token });
    return data.data;
  });
}
