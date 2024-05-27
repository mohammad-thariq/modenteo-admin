import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class StockHistoryAPI {
    stockHistory = async () =>{
        const res = await _axios("get" ,`/stock-history?token=${getToken()}`);
        return res;
    }
}