import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { VariantForm } from "@/common/Form/ProductCategoriesForm/VariantForm";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { VariantsTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useRouter } from "next/router";

export const Variants = () => {
  const [createvariant, setCreateVariant] = useState(false);
  const [updateVariant, setUpdateVariant] = useState(false);
  const [deleteVariant, setDeleteVariant] = useState(false);
  const [currentVariantsId, setCurrentVariantsId] = useState(null);
  const [currentVariantsDataId, setCurrentVariantsDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  let [pageName, setPageName] = useState("Variants");

  const router = useRouter();
  const id = router?.query?.id;
  const { getVariantsbyProductID, createVariants, updateVariants, deleteVariants } = new productCateoriesAPI();
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["variants", id],
    getVariantsbyProductID,
    { enabled: !!id }
  );


  const { mutate: createVariantsMutate, isLoading: createVariantsLoading } =
    useMutation(createVariants, {
      onSuccess: (data, variables, context) => {
        setCreateVariant(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateVariant(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateVariantsMutate, isLoading: updateVariantsLoading } =
    useMutation(updateVariants, {
      onSuccess: (data, variables, context) => {
        setUpdateVariant(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateVariant(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteVariantsMutate, isLoading: deleteVariantsLoading } =
    useMutation(deleteVariants, {
      onSuccess: (data, variables, context) => {
        setDeleteVariant(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteVariant(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateVariant = () => {
    setCreateVariant(!createvariant);
  };

  const handleUpdateVariant = (id) => {
    setCurrentVariantsId(id);
    const getVariantsyById = data?.variants?.find((i) => i?.id === id);
    setCurrentVariantsDataId(getVariantsyById);
    setUpdateVariant(!updateVariant);
  };

  const handleDeleteVariants = (id) => {
    setCurrentVariantsId(id);
    setDeleteVariant(!deleteVariant);
  };

  const handleOnDeleteVariants = () => {
    deleteVariantsMutate({ id: currentVariantsId });
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
      <Breadcrumb currentPage={data?.products?.name + " - Variants" || pageName} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateVariant}
        />
      </div>
      <BaseTable
        tableHeadings={VariantsTableHeading}
        onVariantsData={data?.variants}
        onUpdate={handleUpdateVariant}
        onDelete={handleDeleteVariants}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createvariant && (
        <Popup open={createvariant} onClose={handleCreateVariant}>
          <VariantForm
            onClose={handleCreateVariant}
            button="Add New"
            loading={createVariantsLoading}
            productID={id}
            onSave={createVariantsMutate}
          />
        </Popup>
      )}
      {updateVariant && (
        <Popup open={updateVariant} onClose={handleUpdateVariant}>
          <VariantForm
            button="Update"
            onUpdate={updateVariantsMutate}
            onClose={handleUpdateVariant}
            productID={id}
            data={currentVariantsDataId}
            currentVariantsId={currentVariantsId}
            loading={updateVariantsLoading}
          />
        </Popup>
      )}

      {deleteVariant && (
        <Popup open={deleteVariant} onClose={handleDeleteVariants}>
          <DeleteItem
            onClose={handleDeleteVariants}
            loading={deleteVariantsLoading}
            onClick={handleOnDeleteVariants}
          />
        </Popup>
      )}
    </>
  );
};
