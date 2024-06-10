import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class manageWebsiteAPI {

  // Collection Starts
  service = async ({ queryKey }) => {
    const res = await _axios("get", `/service?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  
  serviceActive = async () => {
    const res = await _axios("get", `/list/service`);
    return res;
  };
  createService = async (data) => {
    const res = await _axios(
      "post",
      `/service/create`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  updateService = async (data) => {
    const res = await _axios(
      "patch",
      `/service/update/${data.id}`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  deleteService = async (data) => {
    const res = await _axios(
      "delete",
      `/service/delete/${data.id}`
    );
    return res;
  };
}
