import { _axios } from "@/helper/axios";

export class ManageCategoriesApi {
  // categories STARTS

  productCategory = async ({ queryKey }) => {
    const res = await _axios(
      "get",
      `/categories?page=${queryKey[1]}&limit=${queryKey[2]}`
    );
    return res;
  };

  productActiveCategory = async () => {
    const res = await _axios("get", `/list/categories`);
    return res;
  };

  createProductCategory = async (data) => {
    const res = await _axios(
      "post",
      `/categories/create`,
      { ...data },
      "multipart/form-data"
    );
    return res;
  };

  updateProductCategory = async (data) => {
    const res = await _axios(
      "patch",
      `/categories/update/${data.id}`,
      {...data},
      "multipart/form-data"
    );
    return res;
  };

  deleteProductCategory = async (data) => {
    const res = await _axios("delete", `/categories/delete/${data.id}`);
    return res;
  };

  // categories ENDS

  // sub-categories STARTS

  productSubCategory = async ({ queryKey }) => {
    const res = await _axios(
      "get",
      `/sub_categories?page=${queryKey[1]}&limit=${queryKey[2]}`
    );
    return res;
  };

  productActiveSubCategory = async () => {
    const res = await _axios("get", `/list/sub_categories`);
    return res;
  };

  createProductSubCategory = async (data) => {
    const res = await _axios(
      "post",
      `/sub_categories/create`,
      {
        ...data,
      },
      "multipart/form-data"
    );
    return res;
  };

  updateProductSubCategory = async (data) => {
    const res = await _axios(
      "patch",
      `/sub_categories/update/${data?.id}`,
      {
        ...data,
      },
      "multipart/form-data"
    );
    return res;
  };

  deleteProductSubCategory = async (data) => {
    const res = await _axios("delete", `/sub_categories/delete/${data?.id}`);
    return res;
  };

  // sub-Category ENDS
}
