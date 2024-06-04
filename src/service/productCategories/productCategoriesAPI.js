import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class productCateoriesAPI {
  brands = async ({ queryKey }) => {
    const res = await _axios("get", `/brands?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };

  createBrands = async (data) => {
    const res = await _axios(
      "post",
      `/brands/create`,
      { data },
      "multipart/form-data"
    );
    return res;
  };

  updateBrands = async (data) => {
    const res = await _axios(
      "patch",
      `/brands/update/${data.id}`,
      { data },
      "multipart/form-data"
    );
    return res;
  };

  deleteBrands = async (data) => {
    const res = await _axios(
      "delete",
      `/brands/delete/${data.id}`
    );
    return res;
  };


  // Collection Starts
  collections = async ({ queryKey }) => {
    const res = await _axios("get", `/collections?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };

  createCollections = async (data) => {
    const res = await _axios(
      "post",
      `/collections/create`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  updateCollections = async (data) => {
    const res = await _axios(
      "patch",
      `/collections/update/${data.id}`,
      { data },
      "multipart/form-data"
    );
    return res;
  };

  deleteCollections = async (data) => {
    const res = await _axios(
      "delete",
      `/collections/delete/${data.id}`
    );
    return res;
  };
  // Collection Ends
  products = async ({ queryKey }) => {
    const res = await _axios("get", `/products?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };

  createProducts = async (data) => {
    const res = await _axios(
      "post",
      `/products/create`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  updateProducts = async (data) => {
    const res = await _axios(
      "patch",
      `/products/update/${data.id}`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  deleteProductById = async (data) => {
    const res = await _axios(
      "post",
      `/products/delete/${data.id}`,
      data
    );
    return res;
  };
}
