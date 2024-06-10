import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { DiscountBannerForm } from "@/common/Form/ManageWebsiteForm/DiscountBannerForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { DiscountBannerTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { manageWebsiteAPI } from "@/service/manageWebsite/manageWebsiteAPI";

export const DiscountBanner = () => {
  const [createcustomerservice, setCreateDiscountBanner] = useState(false);
  const [updateDiscountBanner, setUpdateDiscountBanner] = useState(false);
  const [deleteDiscountBanner, setDeleteDiscountBanner] = useState(false);
  const [currentDiscountBannersId, setCurrentDiscountBannersId] = useState(null);
  const [currentDiscountBannersDataId, setCurrentDiscountBannersDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { discount, createDiscount, updateDiscount, deleteDiscount } = new manageWebsiteAPI();

  const { data, isLoading, refetch } = useQuery(
    ["discount-products", page, limit],
    discount
  );

  const { mutate: createDiscountBannersMutate, isLoading: createDiscountBannersLoading } =
    useMutation(createDiscount, {
      onSuccess: (data, variables, context) => {
        setCreateDiscountBanner(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateDiscountBanner(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateDiscountBannersMutate, isLoading: updateDiscountBannersLoading } =
    useMutation(updateDiscount, {
      onSuccess: (data, variables, context) => {
        setUpdateDiscountBanner(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateDiscountBanner(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteDiscountBannersMutate, isLoading: deleteDiscountBannersLoading } =
    useMutation(deleteDiscount, {
      onSuccess: (data, variables, context) => {
        setDeleteDiscountBanner(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteDiscountBanner(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateDiscountBanner = () => {
    setCreateDiscountBanner(!createcustomerservice);
  };

  const handleUpdateDiscountBanner = (id) => {
    setCurrentDiscountBannersId(id);
    const getDiscountBannersyById = data?.banner?.find((i) => i?.id === id);
    setCurrentDiscountBannersDataId(getDiscountBannersyById);
    setUpdateDiscountBanner(!updateDiscountBanner);
  };

  const handleDeleteDiscountBanners = (id) => {
    setCurrentDiscountBannersId(id);
    setDeleteDiscountBanner(!deleteDiscountBanner);
  };

  const handleOnDeleteDiscountBanners = () => {
    deleteDiscountBannersMutate({ id: currentDiscountBannersId });
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
      <Breadcrumb currentPage={"Discount Banner"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateDiscountBanner}
        />
      </div>
      <BaseTable
        tableHeadings={DiscountBannerTableHeading}
        onDiscountBannerData={data?.banner}
        onUpdate={handleUpdateDiscountBanner}
        onDelete={handleDeleteDiscountBanners}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createcustomerservice && (
        <Popup open={createcustomerservice} onClose={handleCreateDiscountBanner}>
          <DiscountBannerForm
            onClose={handleCreateDiscountBanner}
            button="Add New"
            loading={createDiscountBannersLoading}
            onSave={createDiscountBannersMutate}
          />
        </Popup>
      )}
      {updateDiscountBanner && (
        <Popup open={updateDiscountBanner} onClose={handleUpdateDiscountBanner}>
          <DiscountBannerForm
            button="Update"
            onUpdate={updateDiscountBannersMutate}
            onClose={handleUpdateDiscountBanner}
            data={currentDiscountBannersDataId}
            currentDiscountBannersId={currentDiscountBannersId}
            loading={updateDiscountBannersLoading}
          />
        </Popup>
      )}

      {deleteDiscountBanner && (
        <Popup open={deleteDiscountBanner} onClose={handleDeleteDiscountBanners}>
          <DeleteItem
            onClose={handleDeleteDiscountBanners}
            loading={deleteDiscountBannersLoading}
            onClick={handleOnDeleteDiscountBanners}
          />
        </Popup>
      )}
    </>
  );
};
