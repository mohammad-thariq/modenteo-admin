import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { VariantSizeForm } from "@/common/Form/VariantSizeForm";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { VariantSizesTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";

export const VariantSize = () => {
  const [createvariantsize, setCreateVariantSize] = useState(false);
  const [updateVariantSize, setUpdateVariantSize] = useState(false);
  const [deleteVariantSize, setDeleteVariantSize] = useState(false);
  const [currentVariantSizesId, setCurrentVariantSizesId] = useState(null);
  const [currentVariantSizesDataId, setCurrentVariantSizesDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { variantsizes, createVariantSizes, updateVariantSizes, deleteVariantSizes } =
    new productCateoriesAPI();

  const { data, isLoading, refetch } = useQuery(
    ["variantsizes", page, limit],
    variantsizes
  );

  const { mutate: createVariantSizesMutate, isLoading: createVariantSizesLoading } =
    useMutation(createVariantSizes, {
      onSuccess: (data, variables, context) => {
        setCreateVariantSize(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateVariantSize(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateVariantSizesMutate, isLoading: updateVariantSizesLoading } =
    useMutation(updateVariantSizes, {
      onSuccess: (data, variables, context) => {
        setUpdateVariantSize(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateVariantSize(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteVariantSizesMutate, isLoading: deleteVariantSizesLoading } =
    useMutation(deleteVariantSizes, {
      onSuccess: (data, variables, context) => {
        setDeleteVariantSize(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteVariantSize(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateVariantSize = () => {
    setCreateVariantSize(!createvariantsize);
  };

  const handleUpdateVariantSize = (id) => {
    setCurrentVariantSizesId(id);
    const getVariantSizesyById = data?.variants?.find((i) => i?.id === id);
    setCurrentVariantSizesDataId(getVariantSizesyById);
    setUpdateVariantSize(!updateVariantSize);
  };

  const handleDeleteVariantSizes = (id) => {
    setCurrentVariantSizesId(id);
    setDeleteVariantSize(!deleteVariantSize);
  };

  const handleOnDeleteVariantSizes = () => {
    deleteVariantSizesMutate({ id: currentVariantSizesId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }


  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  return (
    <>
      <Breadcrumb currentPage={"VariantSizes"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateVariantSize}
        />
      </div>
      <BaseTable
        tableHeadings={VariantSizesTableHeading}
        onVariantSizesData={data?.variants}
        onUpdate={handleUpdateVariantSize}
        onDelete={handleDeleteVariantSizes}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createvariantsize && (
        <Popup open={createvariantsize} onClose={handleCreateVariantSize}>
          <VariantSizeForm
            onClose={handleCreateVariantSize}
            button="Add New"
            loading={createVariantSizesLoading}
            onSave={createVariantSizesMutate}
          />
        </Popup>
      )}
      {updateVariantSize && (
        <Popup open={updateVariantSize} onClose={handleUpdateVariantSize}>
          <VariantSizeForm
            button="Update"
            onUpdate={updateVariantSizesMutate}
            onClose={handleUpdateVariantSize}
            data={currentVariantSizesDataId}
            currentVariantSizesId={currentVariantSizesId}
            loading={updateVariantSizesLoading}
          />
        </Popup>
      )}

      {deleteVariantSize && (
        <Popup open={deleteVariantSize} onClose={handleDeleteVariantSizes}>
          <DeleteItem
            onClose={handleDeleteVariantSizes}
            loading={deleteVariantSizesLoading}
            onClick={handleOnDeleteVariantSizes}
          />
        </Popup>
      )}
    </>
  );
};
