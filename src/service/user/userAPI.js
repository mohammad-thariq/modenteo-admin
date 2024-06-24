import { _axios } from "@/helper/axios";

export class UsersApi {
  createAdmin = async (data) => {
    const res = await _axios("post", `/register`, data);
    return res;
  };

  updateAdmin = async (data) => {
    const res = await _axios("patch", `/user/${data.id}`, data);
    return res;
  };

  getUserByType = async ({ queryKey }) => {
    const res = await _axios(
      "get",
      `/user/type/${queryKey[1]}?page=${queryKey[2]}&limit=${queryKey[3]}`
    );
    return res;
  };

  getUserById = async ({ queryKey }) => {
    const res = await _axios("get", `/user/${queryKey[1]}`);
    return res;
  };

  getUserAddressByUserID = async ({ queryKey }) => {
    const res = await _axios("get", `/user/user_address/${queryKey[1]}`);
    return res;
  };

  deleteUser = async (data) => {
    const res = await _axios("delete", `/user/${data.id}`);
    return res;
  };
}
