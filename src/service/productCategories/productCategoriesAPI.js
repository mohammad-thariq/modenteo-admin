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

  activeBrands = async () => {
    const res = await _axios("get", `/list/brands`);
    return res;
  };

  brandsActive = async () => {
    const res = await _axios("get", `/list/brands`);
    return res;
  };

  createBrands = async (data) => {
    const res = await _axios(
      "post",
      `/brands/create`,
      data,
      "multipart/form-data"
    );
    return res;
  };

  updateBrands = async (data) => {
    const res = await _axios(
      "patch",
      `/brands/update/${data.id}`,
      data,
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

  collectionsActive = async () => {
    const res = await _axios("get", `/list/collections`);
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
      data,
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

  variantProducts = async (data) => {
    const res = await _axios(
      "post",
      `/products-variants/${data.product_id}`,
      data
    );
    return res;
  };
  deleteProductById = async (data) => {
    const res = await _axios(
      "delete",
      `/products/delete/${data.id}`,
      data
    );
    return res;
  };

  // Product Variants
  getVariantsbyProductID = async ({ queryKey }) => {
    console.log(queryKey, 'dsfsd')
    const res = await _axios("get", `/variants/${queryKey[1]}`);
    return res;
  };
  createVariants = async (data) => {
    const res = await _axios(
      "post",
      `/variants/create`,
      data,
    );
    return res;
  };

  updateVariants = async (data) => {
    const res = await _axios(
      "patch",
      `/variants/update/${data.id}`,
      data,
    );
    return res;
  };

  deleteVariants = async (data) => {
    const res = await _axios(
      "delete",
      `/variants/delete/${data.id}`
    );
    return res;
  };
  productlist = async () => {
    const res = await _axios("get", `/products-list`);
    return res;
  };
  getprdvariants = async  ({ queryKey }) => {
    const res = await _axios("get", `/get-prd-variants/${queryKey[1]}`);
    return res;
  };


  // Product Variants Sizes
  variantsizes = async () => {
    const res = await _axios("get", `/variants-sizes`);
    return res;
  };
  createVariantSizes = async (data) => {
    const res = await _axios(
      "post",
      `/variants-sizes/create`,
      data,
    );
    return res;
  };

  updateVariantSizes = async (data) => {
    const res = await _axios(
      "patch",
      `/variants-sizes/update/${data.id}`,
      data,
    );
    return res;
  };

  deleteVariantSizes = async (data) => {
    const res = await _axios(
      "delete",
      `/variants-sizes/delete/${data.id}`
    );
    return res;
  };

}
