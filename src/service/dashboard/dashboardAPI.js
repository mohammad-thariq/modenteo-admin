import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN)
  return token
}

export class DashBoardApi {
  getDashBoard = async () => {
    const res = await _axios("get", `/dashboard?token=${getToken()}`);
    return res;
  };
}
