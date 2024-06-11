import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class pageAPI {

  // Customer Pages Starts
  pages = async ({ queryKey }) => {
    const res = await _axios("get", `/pages?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  pageActive = async () => {
    const res = await _axios("get", `/list/pages`);
    return res;
  };

  createPage = async (data) => {
    const res = await _axios(
      "post",
      `/pages/create`,
      data,
    );
    return res;
  };

  updatePages = async (data) => {
    const res = await _axios(
      "patch",
      `/pages/update/${data.id}`,
      data,
    );
    return res;
  };

  deletePages = async (data) => {
    const res = await _axios(
      "delete",
      `/pages/delete/${data.id}`
    );
    return res;
  };
}
