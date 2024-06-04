import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { BrandForm } from "@/common/Form/ProductCategoriesForm/BrandForm";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { BrandsTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";

export const Brands = () => {
  const [createbrand, setCreateBrand] = useState(false);
  const [updateBrand, setUpdateBrand] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState(false);
  const [currentBrandsId, setCurrentBrandsId] = useState(null);
  const [currentBrandsDataId, setCurrentBrandsDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { brands, createBrands, updateBrands, deleteBrands } =
    new productCateoriesAPI();

  const { data, isLoading, refetch } = useQuery(
    ["brands", page, limit],
    brands
  );

  const { mutate: createBrandsMutate, isLoading: createBrandsLoading } =
    useMutation(createBrands, {
      onSuccess: (data, variables, context) => {
        setCreateBrand(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateBrand(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateBrandsMutate, isLoading: updateBrandsLoading } =
    useMutation(updateBrands, {
      onSuccess: (data, variables, context) => {
        setUpdateBrand(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateBrand(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteBrandsMutate, isLoading: deleteBrandsLoading } =
    useMutation(deleteBrands, {
      onSuccess: (data, variables, context) => {
        setDeleteBrand(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteBrand(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateBrand = () => {
    setCreateBrand(!createbrand);
  };

  const handleUpdateBrand = (id) => {
    setCurrentBrandsId(id);
    const getBrandsyById = data?.brands?.find((i) => i?.id === id);
    setCurrentBrandsDataId(getBrandsyById);
    setUpdateBrand(!updateBrand);
  };

  const handleDeleteBrands = (id) => {
    setCurrentBrandsId(id);
    setDeleteBrand(!deleteBrand);
  };

  const handleOnDeleteBrands = () => {
    deleteBrandsMutate({ id: currentBrandsId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(data, "data");
 

  return (
    <>
      <Breadcrumb currentPage={"Brands"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateBrand}
        />
      </div>
      <BaseTable
        tableHeadings={BrandsTableHeading}
        onBrandsData={data?.brands}
        onUpdate={handleUpdateBrand}
        onDelete={handleDeleteBrands}
      />
      {createbrand && (
        <Popup open={createbrand} onClose={handleCreateBrand}>
          <BrandForm
            onClose={handleCreateBrand}
            button="Add New"
            loading={createBrandsLoading}
            onSave={createBrandsMutate}
          />
        </Popup>
      )}
      {updateBrand && (
        <Popup open={updateBrand} onClose={handleUpdateBrand}>
          <BrandForm
            button="Update"
            onUpdate={updateBrandsMutate}
            onClose={handleUpdateBrand}
            data={currentBrandsDataId}
            currentBrandsId={currentBrandsId}
            loading={updateBrandsLoading}
          />
        </Popup>
      )}

      {deleteBrand && (
        <Popup open={deleteBrand} onClose={handleDeleteBrands}>
          <DeleteItem
            onClose={handleDeleteBrands}
            loading={deleteBrandsLoading}
            onClick={handleOnDeleteBrands}
          />
        </Popup>
      )}
    </>
  );
};
