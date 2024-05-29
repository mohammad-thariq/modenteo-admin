import { _axios } from "@/helper/axios";

export class AuthorizationApi {
  getTypeByEmail = async (data) => {
    const res = await _axios('get', `/user/${data.email}`)
    return res
  }
  login = async (data) => {
    const res = await _axios("post", "/login", data);
    return res;
  };
}
