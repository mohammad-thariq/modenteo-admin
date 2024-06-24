import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { localStorageConst } from "@/constant/localStorage";
import { Redirect, Reload } from "@/helper/base";
import { AuthorizationApi } from "@/service/auth/auth";
import { LocalStorageHelper } from "@/utils/localStorage";
// import { BaseUrls } from "../../../../env";

// const BASE_URL = process.env.NEXT_SHOPOADMIN_BASE_URL;

const { login, getTypeByEmail } = new AuthorizationApi();

export const handleLogin = async (data) => {
  const type = await getTypeByEmail(data);
  if (type) {
    const AdminData = {
      ...data,
      type: type?.data?.type || "super-admin",
    };
    const res = await login(AdminData);
    if (res?.response?.data?.error) {
      console.log(res, "error");
      ToastifyFailed(`${res.response.data.error}`);
      Reload();
    } else {
      console.log(res, "res");
      LocalStorageHelper?.setItem(localStorageConst?.JWTADMIN, res?.token);
      const user = {
        id: res?.data?.id,
        name: `${res?.data?.first_name} ${res?.data?.last_name}`,
        email: res?.data?.email,
        type: res?.data?.type,
      };
      LocalStorageHelper?.setItem(localStorageConst?.USER, user);
      ToastifySuccess(`Welcome Back ${user.name}`);
      Redirect("/");
    }
  }
};
