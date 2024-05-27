import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class productCateoriesAPI {
  brands = async () => {
    const res = await _axios("get", `/product-brand?token=${getToken()}`);
    return res;
  };

  createBrands = async (data) => {
    const res = await _axios(
      "post",
      `/product-brand/store?token=${getToken()}`,
      data
    );
    return res;
  };

  updateBrands = async (data) => {
    const res = await _axios(
      "post",
      `/product-brand/update?token=${getToken()}`,
      data
    );
    return res;
  };

  sellerProducts = async () => {
    const res = await _axios("get", `/seller-product?token=${getToken()}`);
    return res;
  };

  products = async () => {
    const res = await _axios("get", `/product?token=${getToken()}`);
    return res;
  };

  specificationKey = async () => {
    const res = await _axios("get", `/specification-key?token=${getToken()}`);
    return res;
  };

  createSpecificationKey = async (data) => {
    const res = await _axios(
      "post",
      `/specification-key/store?token=${getToken()}`,
      data
    );
    return res;
  };

  updateSpecificationKey = async (data) => {
    const res = await _axios(
      "post",
      `/specification-key/update?token=${getToken()}`,
      data
    );
    return res;
  };

  updateStatusSpecificationKey = async (data) => {
    const res = await _axios(
      "post",
      `/specification-key/status?token=${getToken()}`,
      data
    );
    return res;
  };

  stockOut = async () => {
    const res = await _axios("get", `/stockout-product?token=${getToken()}`);
    return res;
  };

  awaitingApproval = async () => {
    const res = await _axios(
      "get",
      `/seller-pending-product?token=${getToken()}`
    );
    return res;
  };

  productReport = async () => {
    const res = await _axios("get", `/product-report?token=${getToken()}`);
    return res;
  };

  productReview = async () => {
    const res = await _axios("get", `/product-review?token=${getToken()}`);
    return res;
  };

  createProducts = async (data) => {
    const res = await _axios(
      "post",
      `/product/store?token=${getToken()}`,
      data
    );
    return res;
  };

  updateProducts = async (data) => {
    const res = await _axios(
      "post",
      `/product/update?token=${getToken()}`,
      data
    );
    return res;
  };

  deleteProductById = async (data) => {
    const res = await _axios(
      "post",
      `/product/delete?token=${getToken()}`,
      data
    );
    return res;
  };
}
