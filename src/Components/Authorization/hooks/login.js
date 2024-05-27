import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { localStorageConst } from "@/constant/localStorage";
import { Redirect, Reload } from "@/helper/base";
import { AuthorizationApi } from "@/service/auth/auth";
import { LocalStorageHelper } from "@/utils/localStorage";
// import { BaseUrls } from "../../../../env";

// const BASE_URL = process.env.NEXT_SHOPOADMIN_BASE_URL;

const { login } = new AuthorizationApi();

export const handleLogin = async (data) => {
  const res = await login(data);
  if (res?.response?.data?.error) {
    console.log(res, "error");
    ToastifyFailed(`${res.response.data.error}`);
    Reload();
  } else {
    console.log(res, "res");
    LocalStorageHelper?.setItem(localStorageConst?.JWTADMIN, res?.token);
    // LocalStorageHelper?.setItem(localStorageConst.EXPIREIN, res?.expires_in);
    // LocalStorageHelper?.setItem(localStorageConst.REMEMBER, data?.rememberMe);
    const user = {
      id: res?.data?.id,
      name: `${res?.data?.first_name} ${res?.data?.last_name}`,
      email: res?.data?.email,
      // avatar: `${BASE_URL || BaseUrls.BASE_URL}/${res?.admin?.image}`,
    };
    LocalStorageHelper?.setItem(localStorageConst?.USER, user);
    ToastifySuccess(`Welcome Back ${user.name}`);
    Redirect("/");
  }
};
