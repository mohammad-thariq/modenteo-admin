import { _axios } from "@/helper/axios";

export class UserApi {
  getUserByType = async ({queryKey}) => {
    const res = await _axios("get", `/user/${queryKey[1]}`);
    return res;
  };
}