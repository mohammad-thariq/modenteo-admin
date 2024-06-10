import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { PopularProductsForm } from "@/common/Form/ManageWebsiteForm/PopularProductsForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { PopularProductsTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { manageWebsiteAPI } from "@/service/manageWebsite/manageWebsiteAPI";

export const PopularProducts = () => {
  const [createcustomerservice, setCreatePopularProducts] = useState(false);
  const [updatePopularProducts, setUpdatePopularProducts] = useState(false);
  const [deletePopularProducts, setDeletePopularProducts] = useState(false);
  const [currentPopularProductssId, setCurrentPopularProductssId] = useState(null);
  const [currentPopularProductssDataId, setCurrentPopularProductssDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { popular, createPopular, updatePopular, deletePopular } = new manageWebsiteAPI();

  const { data, isLoading, refetch } = useQuery(
    ["popular-products", page, limit],
    popular
  );

  const { mutate: createPopularProductssMutate, isLoading: createPopularProductssLoading } =
    useMutation(createPopular, {
      onSuccess: (data, variables, context) => {
        setCreatePopularProducts(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreatePopularProducts(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updatePopularProductssMutate, isLoading: updatePopularProductssLoading } =
    useMutation(updatePopular, {
      onSuccess: (data, variables, context) => {
        setUpdatePopularProducts(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdatePopularProducts(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deletePopularProductssMutate, isLoading: deletePopularProductssLoading } =
    useMutation(deletePopular, {
      onSuccess: (data, variables, context) => {
        setDeletePopularProducts(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeletePopularProducts(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreatePopularProducts = () => {
    setCreatePopularProducts(!createcustomerservice);
  };

  const handleUpdatePopularProducts = (id) => {
    setCurrentPopularProductssId(id);
    const getPopularProductssyById = data?.PopularProduct?.find((i) => i?.id === id);
    setCurrentPopularProductssDataId(getPopularProductssyById);
    setUpdatePopularProducts(!updatePopularProducts);
  };

  const handleDeletePopularProductss = (id) => {
    setCurrentPopularProductssId(id);
    setDeletePopularProducts(!deletePopularProducts);
  };

  const handleOnDeletePopularProductss = () => {
    deletePopularProductssMutate({ id: currentPopularProductssId });
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
      <Breadcrumb currentPage={"Popular Products"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreatePopularProducts}
        />
      </div>
      <BaseTable
        tableHeadings={PopularProductsTableHeading}
        onPopularProductsData={data?.PopularProduct}
        onUpdate={handleUpdatePopularProducts}
        onDelete={handleDeletePopularProductss}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createcustomerservice && (
        <Popup open={createcustomerservice} onClose={handleCreatePopularProducts}>
          <PopularProductsForm
            onClose={handleCreatePopularProducts}
            button="Add New"
            loading={createPopularProductssLoading}
            onSave={createPopularProductssMutate}
          />
        </Popup>
      )}
      {updatePopularProducts && (
        <Popup open={updatePopularProducts} onClose={handleUpdatePopularProducts}>
          <PopularProductsForm
            button="Update"
            onUpdate={updatePopularProductssMutate}
            onClose={handleUpdatePopularProducts}
            data={currentPopularProductssDataId}
            currentPopularProductssId={currentPopularProductssId}
            loading={updatePopularProductssLoading}
          />
        </Popup>
      )}

      {deletePopularProducts && (
        <Popup open={deletePopularProducts} onClose={handleDeletePopularProductss}>
          <DeleteItem
            onClose={handleDeletePopularProductss}
            loading={deletePopularProductssLoading}
            onClick={handleOnDeletePopularProductss}
          />
        </Popup>
      )}
    </>
  );
};
