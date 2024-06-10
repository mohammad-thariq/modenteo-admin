import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { SpotlightForm } from "@/common/Form/ManageWebsiteForm/SpotlightForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { SpotlightTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { manageWebsiteAPI } from "@/service/manageWebsite/manageWebsiteAPI";

export const Spotlight = () => {
  const [createcustomerservice, setCreateSpotlight] = useState(false);
  const [updateSpotlights, setUpdateSpotlight] = useState(false);
  const [deleteSpotlights, setDeleteSpotlight] = useState(false);
  const [currentSpotlightsId, setCurrentSpotlightsId] = useState(null);
  const [currentSpotlightsDataId, setCurrentSpotlightsDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { spotlight, createSpotlight, updateSpotlight, deleteSpotlight } = new manageWebsiteAPI();

  const { data, isLoading, refetch } = useQuery(
    ["spotlight-products", page, limit],
    spotlight
  );

  const { mutate: createSpotlightsMutate, isLoading: createSpotlightsLoading } =
    useMutation(createSpotlight, {
      onSuccess: (data, variables, context) => {
        setCreateSpotlight(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateSpotlight(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateSpotlightssMutate, isLoading: updateSpotlightssLoading } =
    useMutation(updateSpotlight, {
      onSuccess: (data, variables, context) => {
        setUpdateSpotlight(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateSpotlight(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteSpotlightssMutate, isLoading: deleteSpotlightssLoading } =
    useMutation(deleteSpotlight, {
      onSuccess: (data, variables, context) => {
        setDeleteSpotlight(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteSpotlight(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateSpotlight = () => {
    setCreateSpotlight(!createcustomerservice);
  };

  const handleUpdateSpotlight = (id) => {
    setCurrentSpotlightsId(id);
    const getSpotlightsyById = data?.spot_light?.find((i) => i?.id === id);
    setCurrentSpotlightsDataId(getSpotlightsyById);
    setUpdateSpotlight(!updateSpotlights);
  };

  const handleDeleteSpotlights = (id) => {
    setCurrentSpotlightsId(id);
    setDeleteSpotlight(!deleteSpotlights);
  };

  const handleOnDeleteSpotlights = () => {
    deleteSpotlightssMutate({ id: currentSpotlightsId });
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
      <Breadcrumb currentPage={"Spotlight"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateSpotlight}
        />
      </div>
      <BaseTable
        tableHeadings={SpotlightTableHeading}
        onSpotlightData={data?.spot_light}
        onUpdate={handleUpdateSpotlight}
        onDelete={handleDeleteSpotlights}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createcustomerservice && (
        <Popup open={createcustomerservice} onClose={handleCreateSpotlight}>
          <SpotlightForm
            onClose={handleCreateSpotlight}
            button="Add New"
            loading={createSpotlightsLoading}
            onSave={createSpotlightsMutate}
          />
        </Popup>
      )}
      {updateSpotlights && (
        <Popup open={updateSpotlights} onClose={handleUpdateSpotlight}>
          <SpotlightForm
            button="Update"
            onUpdate={updateSpotlightssMutate}
            onClose={handleUpdateSpotlight}
            data={currentSpotlightsDataId}
            currentSpotlightsId={currentSpotlightsId}
            loading={updateSpotlightssLoading}
          />
        </Popup>
      )}

      {deleteSpotlights && (
        <Popup open={deleteSpotlights} onClose={handleDeleteSpotlights}>
          <DeleteItem
            onClose={handleDeleteSpotlights}
            loading={deleteSpotlightssLoading}
            onClick={handleOnDeleteSpotlights}
          />
        </Popup>
      )}
    </>
  );
};
