import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { specKeyTableHeading } from "@/constant/tableHeading";
import { Button } from "@/common/Button";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { Popup } from "@/common/Popup";
import { SpecKeyForm } from "@/common/Form/ProductCategoriesForm/SpecKeyForm";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const Specification = () => {
  const { specificationKey, createSpecificationKey, updateSpecificationKey } =
    new productCateoriesAPI();
  const { data, isLoading, refetch } = useQuery(
    ["specificationKeys"],
    specificationKey
  );

  const {
    mutate: createSpecificationKeyMutate,
    isLoading: createSpecificationKeyLoading,
  } = useMutation(createSpecificationKey, {
    onSuccess: (data, variables, context) => {
      setCreateSpecKey(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setCreateSpecKey(true);
      refetch();
      ToastifyFailed(data?.message);
    },
  });

  const {
    mutate: updateSpecificationKeyMutate,
    isLoading: updateSpecificationKeyLoading,
  } = useMutation(updateSpecificationKey, {
    onSuccess: (data, variables, context) => {
      setUpdateSpecKey(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setUpdateSpecKey(true);
      ToastifyFailed(data?.message);
      refetch();
    },
  });

  const [createSpecKey, setCreateSpecKey] = useState(false);
  const [updateSpecKey, setUpdateSpecKey] = useState(false);
  // const [deleteProduct, setDeleteProduct] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentSpecKeyId, setCurrentSpecKeyId] = useState(null);
  const [currentSpecKeyDataId, setCurrentSpecKeyDataId] = useState(null);

  const handleCreateSpecKey = () => {
    setCreateSpecKey(!createSpecKey);
  };

  const handleDeleteSpecKey = () => {
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleUpdateSpecKey = (id) => {
    setUpdateSpecKey(!updateSpecKey);
    setCurrentSpecKeyId(id);
    const getSpecKeyById = data?.SpecificationKeys?.find((i) => i?.id === id);
    setCurrentSpecKeyDataId(getSpecKeyById);
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Specification Key"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateSpecKey}
        />
      </div>
      <BaseTable
        tableHeadings={specKeyTableHeading}
        onSpecKeyData={data}
        onDelete={handleDeleteSpecKey}
        onUpdate={handleUpdateSpecKey}
        handleCreateSpecKey={handleCreateSpecKey}
      />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteSpecKey}>
          <DeleteItem onClose={handleDeleteSpecKey} />
        </Popup>
      )}
      {createSpecKey && (
        <Popup open={createSpecKey} onClose={handleCreateSpecKey}>
          <SpecKeyForm
            onClose={handleCreateSpecKey}
            button="Add New"
            loading={createSpecificationKeyLoading}
            onSave={createSpecificationKeyMutate}
          />
        </Popup>
      )}
      {updateSpecKey && (
        <Popup open={updateSpecKey} onClose={handleUpdateSpecKey}>
          <SpecKeyForm
            onClose={handleUpdateSpecKey}
            button="Update"
            onUpdate={updateSpecificationKeyMutate}
            currentSpecificationKeyId={currentSpecKeyId}
            data={currentSpecKeyDataId}
          />
        </Popup>
      )}
    </>
  );
};
