import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { ProductForm } from "@/common/Form/ProductCategoriesForm/ProductForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { productTableHeading } from "@/constant/tableHeading";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const Products = () => {
  const {
    products,
    brands,
    specificationKey,
    createProducts,
    updateProducts,
    deleteProductById,
  } = new productCateoriesAPI();

  const { productCategory, productChildCategory, productSubCategory } =
    new ManageCategoriesApi();

  const { data, isLoading, refetch } = useQuery(["products"], products);
  const { data: category } = useQuery(["product-category"], productCategory);
  const { data: childCategory } = useQuery(
    ["product-Childcategory"],
    productChildCategory
  );
  const { data: subCategory } = useQuery(
    ["product-Subcategory"],
    productSubCategory
  );
  const { data: brand } = useQuery(["brands"], brands);
  const { data: specificationKeys } = useQuery(
    ["specificationKeys"],
    specificationKey
  );

  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductDataId, setCurrentProductDataId] = useState(null);

  const { mutate: createProductMutate, isLoading: createProductLoading } =
    useMutation(createProducts, {
      onSuccess: (data, variables, context) => {
        setCreateProduct(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateProduct(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateProductMutate, isLoading: updateProductLoading } =
    useMutation(updateProducts, {
      onSuccess: (data, variables, context) => {
        setUpdateProduct(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateProduct(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteProductMutate, isLoading: deleteProductLoading } =
    useMutation(deleteProductById, {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.notification);
      },
    });

  const handleCreateProduct = () => {
    setCreateProduct(!createProduct);
  };
  const handleUpdateProduct = (id) => {
    setUpdateProduct(!updateProduct);
    setCurrentProductId(id);
    const getProductById = data?.products?.find((i) => i?.id === id);
    setCurrentProductDataId(getProductById);
  };

  const handleDeleteProduct = (id) => {
    setCurrentProductId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const deleteProduct = () => {
    deleteProductMutate({ id: currentProductId });
  };

  const getCategoryToSelect = category?.categories?.map((i) => ({
    value: i?.id,
    name: i?.name,
  }));
  const getSubCategoryToSelect = subCategory?.subCategories?.map((i) => ({
    value: i?.id,
    name: i?.name,
  }));
  const getChildCategoryToSelect = childCategory?.childCategories?.map((i) => ({
    value: i?.id,
    name: i?.name,
  }));
  const getBrandsToSelect = brand?.brands?.map((i) => ({
    value: i?.id,
    name: i?.name,
  }));
  const getSpecificationKeysToSelect =
    specificationKeys?.SpecificationKeys?.map((i) => ({
      value: i?.id,
      name: i?.key,
    }));

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Products"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateProduct}
        />
      </div>
      <BaseTable
        tableHeadings={productTableHeading}
        onProductData={data}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
      {createProduct && (
        <Popup open={createProduct} onClose={handleCreateProduct}>
          <ProductForm
            category={getCategoryToSelect}
            subCategory={getSubCategoryToSelect}
            childCategory={getChildCategoryToSelect}
            brand={getBrandsToSelect}
            keys={getSpecificationKeysToSelect}
            onClose={handleCreateProduct}
            onSave={createProductMutate}
            button="Add New"
            loading={createProductLoading}
          />
        </Popup>
      )}
      {updateProduct && (
        <Popup open={updateProduct} onClose={handleUpdateProduct}>
          <ProductForm
            category={getCategoryToSelect}
            subCategory={getSubCategoryToSelect}
            childCategory={getChildCategoryToSelect}
            brand={getBrandsToSelect}
            keys={getSpecificationKeysToSelect}
            onClose={handleUpdateProduct}
            data={currentProductDataId}
            button="update"
            onUpdate={updateProductMutate}
            currentProductId={currentProductId}
            loading={updateProductLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteProduct}>
          <DeleteItem
            onClose={handleDeleteProduct}
            onClick={deleteProduct}
            loading={deleteProductLoading}
          />
        </Popup>
      )}
    </>
  );
};
