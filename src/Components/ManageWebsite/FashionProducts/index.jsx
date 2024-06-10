import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { FashionProductForm } from "@/common/Form/ManageWebsiteForm/FashionProductForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { FashionProductTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { manageWebsiteAPI } from "@/service/manageWebsite/manageWebsiteAPI";

export const FashionProduct = () => {
  const [createfashionproducts, setCreateFashionProduct] = useState(false);
  const [updateFashionProduct, setUpdateFashionProduct] = useState(false);
  const [deleteFashionProduct, setDeleteFashionProduct] = useState(false);
  const [currentFashionProductsId, setCurrentFashionProductsId] = useState(null);
  const [currentFashionProductsDataId, setCurrentFashionProductsDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { fashion, createFashion, updateFashion, deleteFashion } = new manageWebsiteAPI();

  const { data, isLoading, refetch } = useQuery(
    ["fashionproductss", page, limit],
    fashion
  );

  const { mutate: createFashionProductsMutate, isLoading: createFashionProductsLoading } =
    useMutation(createFashion, {
      onSuccess: (data, variables, context) => {
        setCreateFashionProduct(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateFashionProduct(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateFashionProductsMutate, isLoading: updateFashionProductsLoading } =
    useMutation(updateFashion, {
      onSuccess: (data, variables, context) => {
        setUpdateFashionProduct(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateFashionProduct(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteFashionProductsMutate, isLoading: deleteFashionProductsLoading } =
    useMutation(deleteFashion, {
      onSuccess: (data, variables, context) => {
        setDeleteFashionProduct(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteFashionProduct(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateFashionProduct = () => {
    setCreateFashionProduct(!createfashionproducts);
  };

  const handleUpdateFashionProduct = (id) => {
    setCurrentFashionProductsId(id);
    const getFashionProductsyById = data?.banner?.find((i) => i?.id === id);
    setCurrentFashionProductsDataId(getFashionProductsyById);
    setUpdateFashionProduct(!updateFashionProduct);
  };

  const handleDeleteFashionProducts = (id) => {
    setCurrentFashionProductsId(id);
    setDeleteFashionProduct(!deleteFashionProduct);
  };

  const handleOnDeleteFashionProducts = () => {
    deleteFashionProductsMutate({ id: currentFashionProductsId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(data, "data");

  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  return (
    <>
      <Breadcrumb currentPage={"Fashion Product"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateFashionProduct}
        />
      </div>
      <BaseTable
        tableHeadings={FashionProductTableHeading}
        onFashionProductData={data?.banner}
        onUpdate={handleUpdateFashionProduct}
        onDelete={handleDeleteFashionProducts}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createfashionproducts && (
        <Popup open={createfashionproducts} onClose={handleCreateFashionProduct}>
          <FashionProductForm
            onClose={handleCreateFashionProduct}
            button="Add New"
            loading={createFashionProductsLoading}
            onSave={createFashionProductsMutate}
          />
        </Popup>
      )}
      {updateFashionProduct && (
        <Popup open={updateFashionProduct} onClose={handleUpdateFashionProduct}>
          <FashionProductForm
            button="Update"
            onUpdate={updateFashionProductsMutate}
            onClose={handleUpdateFashionProduct}
            data={currentFashionProductsDataId}
            currentFashionProductsId={currentFashionProductsId}
            loading={updateFashionProductsLoading}
          />
        </Popup>
      )}

      {deleteFashionProduct && (
        <Popup open={deleteFashionProduct} onClose={handleDeleteFashionProducts}>
          <DeleteItem
            onClose={handleDeleteFashionProducts}
            loading={deleteFashionProductsLoading}
            onClick={handleOnDeleteFashionProducts}
          />
        </Popup>
      )}
    </>
  );
};
