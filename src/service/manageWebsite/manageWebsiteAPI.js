import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class manageWebsiteAPI {

  // Customer Service Starts
  service = async ({ queryKey }) => {
    const res = await _axios("get", `/service?page=${queryKey[1]}&limit=${queryKey[2]}`);
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
  // Customer Service Ends

  
  // Fashion Product Starts
  fashion = async ({ queryKey }) => {
    const res = await _axios("get", `/fashion_product?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  
  createFashion = async (data) => {
    const res = await _axios(
      "post",
      `/fashion_product/create`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  updateFashion = async (data) => {
    const res = await _axios(
      "patch",
      `/fashion_product/update/${data.id}`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  deleteFashion = async (data) => {
    const res = await _axios(
      "delete",
      `/fashion_product/delete/${data.id}`
    );
    return res;
  };
  // Fashion Product Ends
}
