import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { SubCategoriesForm } from "@/common/Form/ManageCategoriesForms/SubCategoriesForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { subCategoriesTableHeading } from "@/constant/tableHeading";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const SubCategories = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [createSubCategories, setCreateSubCategories] = useState(false);
  const [updateSubCategories, setUpdateSubCategories] = useState(false);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);
  const [currentSubCategoryDataId, setCurrentSubCategoryDataId] =
    useState(null);
  const {
    productCategory,
    productSubCategory,
    createProductSubCategory,
    updateProductSubCategory,
    deleteProductSubCategory,
  } = new ManageCategoriesApi();

  const { data, isLoading, refetch } = useQuery(
    ["product-Subcategory"],
    productSubCategory
  );

  const { data: getCategory } = useQuery(["product-category"], productCategory);

  const { mutate: createSubCategory, isLoading: createSubCategoryLoading } =
    useMutation(createProductSubCategory, {
      onSuccess: (data, variables, context) => {
        setCreateSubCategories(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateSubCategories(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateSubCategory, isLoading: updateSubCategoryLoading } =
    useMutation(updateProductSubCategory, {
      onSuccess: (data, variables, context) => {
        setUpdateSubCategories(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateSubCategories(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const {
    mutate: deleteSubCategoryMutate,
    isLoading: deleteSubCategoryLoading,
  } = useMutation(deleteProductSubCategory, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.message);
      refetch();
    },
  });

  const handleCreateSubCategories = () => {
    setCurrentSubCategoryDataId(null);
    setCreateSubCategories(!createSubCategories);
  };

  const handleUpdateSubCategories = (id) => {
    setCurrentSubCategoryId(id);
    const getSubCategoryById = data?.subCategories?.find((i) => i?.id === id);
    setCurrentSubCategoryDataId(getSubCategoryById);
    setUpdateSubCategories(!updateSubCategories);
  };

  const handleDeleteOrder = (id) => {
    setCurrentSubCategoryId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteSubCategory = () => {
    deleteSubCategoryMutate({ id: currentSubCategoryId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Sub Categories"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateSubCategories}
        />
      </div>
      <BaseTable
        tableHeadings={subCategoriesTableHeading}
        onSubCategoriesData={data}
        onDelete={handleDeleteOrder}
        onUpdate={handleUpdateSubCategories}
      />

      {createSubCategories && (
        <Popup open={createSubCategories} onClose={handleCreateSubCategories}>
          <SubCategoriesForm
            onClose={handleCreateSubCategories}
            onSave={createSubCategory}
            loading={createSubCategoryLoading}
            button="Add New"
            getCategory={getCategory}
          />
        </Popup>
      )}

      {updateSubCategories && (
        <Popup open={updateSubCategories} onClose={handleUpdateSubCategories}>
          <SubCategoriesForm
            getCategory={getCategory}
            onClose={handleUpdateSubCategories}
            onUpdate={updateSubCategory}
            button="Update"
            loading={updateSubCategoryLoading}
            currentCategoryId={currentSubCategoryId}
            data={currentSubCategoryDataId}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem
            onClose={handleDeleteOrder}
            onClick={handleOnDeleteSubCategory}
            loading={deleteSubCategoryLoading}
          />
        </Popup>
      )}
    </>
  );
};
