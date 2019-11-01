import client from "./client";
import handleError from "./handleError";

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
