import { _axios } from "@/helper/axios";



export class ManageCategoriesApi {
  productCategory = async ({queryKey}) => {
    const res = await _axios("get", `/categories?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };

  createProductCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-category/store`,
      { ...data },
      "multipart/form-data"
    );
    return res;
  };

  updateProductCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-category/update`,
      { ...data }
    );
    return res;
  };

  deleteProductCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/product-category/delete`,
      { ...data }
    );
    return res;
  };

  productSubCategory = async () => {
    const res = await _axios(
      "get",
      `/sub_categories?page=${queryKey[1]}&limit=${queryKey[2]}`
    );
    return res;
  };

  createProductSubCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-sub-category/store`,
      { ...data }
    );
    return res;
  };

  updateProductSubCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-sub-category/update`,
      { ...data }
    );
    return res;
  };

  deleteProductSubCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/product-sub-category/delete`,
      { ...data }
    );
    return res;
  };

  productChildCategory = async () => {
    const res = await _axios(
      "get",
      `/product-child-category`
    );
    return res;
  };

  createProductChildCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-child-category/store`,
      { ...data }
    );
    return res;
  };

  updateProductChildCategory = async (data) => {
    const res = await _axios(
      "post",
      `/product-child-category/update`,
      { ...data }
    );
    return res;
  };

  deleteProductChildCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/product-child-category/delete`,
      { ...data }
    );
    return res;
  };

  megaMenuCategory = async () => {
    const res = await _axios("get", `/mega-menu-category`);
    return res;
  };

  createProductMegaMenuCategory = async (data) => {
    const res = await _axios(
      "post",
      `/mega-menu-category/store`,
      { ...data }
    );
    return res;
  };

  updateProductMegaMenuCategory = async (data) => {
    const res = await _axios(
      "post",
      `/mega-menu-category/update`,
      { ...data }
    );
    return res;
  };

  deleteProductMegaMenuCategory = async (data) => {
    const res = await _axios(
      "delete",
      `/mega-menu-category/delete`,
      { ...data }
    );
    return res;
  };

  popularCategory = async () => {
    const res = await _axios("get", `/popular-category`);
    return res;
  };

  featuredCategory = async () => {
    const res = await _axios("get", `/featured-category`);
    return res;
  };
}
