import { localStorageConst } from "@/constant/localStorage";
import { Reload } from "@/helper/base";
import { LocalStorageHelper } from "@/utils/localStorage";

export const SetExpireToken = () => {
  const token = LocalStorageHelper?.getItem(localStorageConst.JWTADMIN);
  const expiration = LocalStorageHelper?.getItem(localStorageConst.EXPIREIN);
  const rememberMe = LocalStorageHelper?.getItem(localStorageConst.REMEMBER);

  if (token && expiration) {
    const expirationTime = rememberMe
      ? new Date(expiration).getHours() + 10
      : new Date(expiration).getHours();
    const currentTime = new Date().getHours();

    if (currentTime >= expirationTime) {
      LocalStorageHelper?.removeItem(localStorageConst.JWTADMIN);
      LocalStorageHelper?.removeItem(localStorageConst.EXPIREIN);
      LocalStorageHelper?.removeItem(localStorageConst.USER);
      LocalStorageHelper?.removeItem(localStorageConst.REMEMBER);
      Reload();
    }
  }
};
