import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { HeroBannerForm } from "@/common/Form/ManageWebsiteForm/HeroBannerForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { HeroBannerTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { manageWebsiteAPI } from "@/service/manageWebsite/manageWebsiteAPI";

export const HeroBanner = () => {
  const [createherobanner, setCreateHeroBanner] = useState(false);
  const [updateHeroBanners, setUpdateHeroBanner] = useState(false);
  const [deleteHeroBanners, setDeleteHeroBanner] = useState(false);
  const [currentHeroBannersId, setCurrentHeroBannersId] = useState(null);
  const [currentHeroBannersDataId, setCurrentHeroBannersDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { herobanner, createHeroBanner, updateHeroBanner, deleteHeroBanner } = new manageWebsiteAPI();

  const { data, isLoading, refetch } = useQuery(
    ["hero-banner", page, limit],
    herobanner
  );

  const { mutate: createHeroBannersMutate, isLoading: createHeroBannersLoading } =
    useMutation(createHeroBanner, {
      onSuccess: (data, variables, context) => {
        setCreateHeroBanner(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateHeroBanner(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateHeroBannerssMutate, isLoading: updateHeroBannerssLoading } =
    useMutation(updateHeroBanner, {
      onSuccess: (data, variables, context) => {
        setUpdateHeroBanner(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateHeroBanner(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteHeroBannerssMutate, isLoading: deleteHeroBannerssLoading } =
    useMutation(deleteHeroBanner, {
      onSuccess: (data, variables, context) => {
        setDeleteHeroBanner(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteHeroBanner(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateHeroBanner = () => {
    setCreateHeroBanner(!createherobanner);
  };

  const handleUpdateHeroBanner = (id) => {
    setCurrentHeroBannersId(id);
    const getHeroBannersyById = data?.banner?.find((i) => i?.id === id);
    setCurrentHeroBannersDataId(getHeroBannersyById);
    setUpdateHeroBanner(!updateHeroBanners);
  };

  const handleDeleteHeroBanners = (id) => {
    setCurrentHeroBannersId(id);
    setDeleteHeroBanner(!deleteHeroBanners);
  };

  const handleOnDeleteHeroBanners = () => {
    deleteHeroBannerssMutate({ id: currentHeroBannersId });
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
      <Breadcrumb currentPage={"Hero Banner"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateHeroBanner}
        />
      </div>
      <BaseTable
        tableHeadings={HeroBannerTableHeading}
        onHeroBannerData={data?.banner}
        onUpdate={handleUpdateHeroBanner}
        onDelete={handleDeleteHeroBanners}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createherobanner && (
        <Popup open={createherobanner} onClose={handleCreateHeroBanner}>
          <HeroBannerForm
            onClose={handleCreateHeroBanner}
            button="Add New"
            loading={createHeroBannersLoading}
            onSave={createHeroBannersMutate}
          />
        </Popup>
      )}
      {updateHeroBanners && (
        <Popup open={updateHeroBanners} onClose={handleUpdateHeroBanner}>
          <HeroBannerForm
            button="Update"
            onUpdate={updateHeroBannerssMutate}
            onClose={handleUpdateHeroBanner}
            data={currentHeroBannersDataId}
            currentHeroBannersId={currentHeroBannersId}
            loading={updateHeroBannerssLoading}
          />
        </Popup>
      )}

      {deleteHeroBanners && (
        <Popup open={deleteHeroBanners} onClose={handleDeleteHeroBanners}>
          <DeleteItem
            onClose={handleDeleteHeroBanners}
            loading={deleteHeroBannerssLoading}
            onClick={handleOnDeleteHeroBanners}
          />
        </Popup>
      )}
    </>
  );
};
