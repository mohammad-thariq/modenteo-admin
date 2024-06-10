import { localStorageConst } from "@/constant/localStorage";
import { Reload } from "@/helper/base";
import { LocalStorageHelper } from "@/utils/localStorage";

export const SetExpireToken = (data) => {
  if(data?.message !== "Valid token"){
    LocalStorageHelper?.removeItem(localStorageConst.JWTADMIN);
    LocalStorageHelper?.removeItem(localStorageConst.USER);
    Reload();
  }else null;
};
