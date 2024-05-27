import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class ManageCategoriesApi {
  productCategory = async () => {
    const res = await _axios("get", `/product-category?token=${getToken()}`);
    return res;
  };

  createProductCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-category/store?token=${getToken()}`,
      { ...data },
      "multipart/form-data"
    );
    return res;
  };

  updateProductCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-category/update?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  deleteProductCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/product-category/delete?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  productSubCategory = async () => {
    const res = await _axios(
      "get",
      `/product-sub-category?token=${getToken()}`
    );
    return res;
  };

  createProductSubCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-sub-category/store?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  updateProductSubCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-sub-category/update?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  deleteProductSubCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/product-sub-category/delete?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  productChildCategory = async () => {
    const res = await _axios(
      "get",
      `/product-child-category?token=${getToken()}`
    );
    return res;
  };

  createProductChildCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-child-category/store?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  updateProductChildCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-child-category/update?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  deleteProductChildCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/product-child-category/delete?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  megaMenuCategory = async () => {
    const res = await _axios("get", `/mega-menu-category?token=${getToken()}`);
    return res;
  };

  createProductMegaMenuCategory = async (data) => {
    const res = await _axios(
      "post",
      `/mega-menu-category/store?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  updateProductMegaMenuCategory = async (data) => {
    const res = await _axios(
      "post",
      `/mega-menu-category/update?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  deleteProductMegaMenuCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/mega-menu-category/delete?token=${getToken()}`,
      { ...data }
    );
    return res;
  };

  popularCategory = async () => {
    const res = await _axios("get", `/popular-category?token=${getToken()}`);
    return res;
  };

  featuredCategory = async () => {
    const res = await _axios("get", `/featured-category?token=${getToken()}`);
    return res;
  };
}
