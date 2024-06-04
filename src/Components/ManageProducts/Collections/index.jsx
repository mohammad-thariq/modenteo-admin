import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { CollectionForm } from "@/common/Form/ProductCategoriesForm/CollectionForm";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { CollectionsTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";

export const Collections = () => {
  const [createcollection, setCreateCollection] = useState(false);
  const [updateCollection, setUpdateCollection] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState(false);
  const [currentCollectionsId, setCurrentCollectionsId] = useState(null);
  const [currentCollectionsDataId, setCurrentCollectionsDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { collections, createCollections, updateCollections, deleteCollections } =
    new productCateoriesAPI();

  const { data, isLoading, refetch } = useQuery(
    ["collections", page, limit],
    collections
  );

  const { mutate: createCollectionsMutate, isLoading: createCollectionsLoading } =
    useMutation(createCollections, {
      onSuccess: (data, variables, context) => {
        setCreateCollection(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateCollection(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateCollectionsMutate, isLoading: updateCollectionsLoading } =
    useMutation(updateCollections, {
      onSuccess: (data, variables, context) => {
        setUpdateCollection(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateCollection(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteCollectionsMutate, isLoading: deleteCollectionsLoading } =
    useMutation(deleteCollections, {
      onSuccess: (data, variables, context) => {
        setDeleteCollection(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteCollection(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateCollection = () => {
    setCreateCollection(!createcollection);
  };

  const handleUpdateCollection = (id) => {
    setCurrentCollectionsId(id);
    const getCollectionsyById = data?.collections?.find((i) => i?.id === id);
    setCurrentCollectionsDataId(getCollectionsyById);
    setUpdateCollection(!updateCollection);
  };

  const handleDeleteCollections = (id) => {
    setCurrentCollectionsId(id);
    setDeleteCollection(!deleteCollection);
  };

  const handleOnDeleteCollections = () => {
    deleteCollectionsMutate({ id: currentCollectionsId });
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
      <Breadcrumb currentPage={"Collections"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateCollection}
        />
      </div>
      <BaseTable
        tableHeadings={CollectionsTableHeading}
        onCollectionsData={data?.collections}
        onUpdate={handleUpdateCollection}
        onDelete={handleDeleteCollections}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createcollection && (
        <Popup open={createcollection} onClose={handleCreateCollection}>
          <CollectionForm
            onClose={handleCreateCollection}
            button="Add New"
            loading={createCollectionsLoading}
            onSave={createCollectionsMutate}
          />
        </Popup>
      )}
      {updateCollection && (
        <Popup open={updateCollection} onClose={handleUpdateCollection}>
          <CollectionForm
            button="Update"
            onUpdate={updateCollectionsMutate}
            onClose={handleUpdateCollection}
            data={currentCollectionsDataId}
            currentCollectionsId={currentCollectionsId}
            loading={updateCollectionsLoading}
          />
        </Popup>
      )}

      {deleteCollection && (
        <Popup open={deleteCollection} onClose={handleDeleteCollections}>
          <DeleteItem
            onClose={handleDeleteCollections}
            loading={deleteCollectionsLoading}
            onClick={handleOnDeleteCollections}
          />
        </Popup>
      )}
    </>
  );
};
