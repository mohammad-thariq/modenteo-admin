import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useState } from "react";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { useMutation, useQuery } from "react-query";
import { ChildCategoriesForm } from "@/common/Form/ManageCategoriesForms/ChildCategoriesForm";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { ChildCategoriesTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const ChildCategories = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [updateChildCategories, setUpdateChildCategories] = useState(false);
  const [createChildCategories, setCreateChildCategories] = useState(false);
  const [currentChildCategoryDataId, setCurrentChildCategoryDataId] =
    useState(null);
  const [currentChildCategoryId, setCurrentChildCategoryId] = useState(null);

  const {
    productCategory,
    productSubCategory,
    productChildCategory,
    createProductChildCategory,
    updateProductChildCategory,
    deleteProductChildCategory,
  } = new ManageCategoriesApi();

  const { data, isLoading, refetch } = useQuery(
    ["product-Childcategory"],
    productChildCategory
  );

  const { data: getCategory } = useQuery(["product-category"], productCategory);

  const { data: getSubCategory } = useQuery(
    ["product-subCategory"],
    productSubCategory
  );

  const { mutate: createChildCategory, isLoading: createChildCategoryLoading } =
    useMutation(createProductChildCategory, {
      onSuccess: (data, variables, context) => {
        setCreateChildCategories(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateChildCategories(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateChildCategory, isLoading: updateChildCategoryLoading } =
    useMutation(updateProductChildCategory, {
      onSuccess: (data, variables, context) => {
        setUpdateChildCategories(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateChildCategories(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const {
    mutate: deleteChildCategoryMutate,
    isLoading: deleteChildCategoryLoading,
  } = useMutation(deleteProductChildCategory, {
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

  const handleCreateChildCategories = () => {
    setCurrentChildCategoryDataId(null);
    setCreateChildCategories(!createChildCategories);
  };

  const handleUpdateChildCategories = (id) => {
    setUpdateChildCategories(!updateChildCategories);
    setCurrentChildCategoryId(id);
    const getCategoryById = data?.childCategories?.find((i) => i?.id === id);
    setCurrentChildCategoryDataId(getCategoryById);
  };

  const handleDeleteOrder = (id) => {
    setCurrentChildCategoryId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteChildCategory = () => {
    deleteChildCategoryMutate({ id: currentChildCategoryId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Child Categories"} serachEnable />

      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateChildCategories}
        />
      </div>
      <BaseTable
        tableHeadings={ChildCategoriesTableHeading}
        onChildCategoriesData={data}
        onDelete={handleDeleteOrder}
        onUpdate={handleUpdateChildCategories}
      />

      {createChildCategories && (
        <Popup
          open={createChildCategories}
          onClose={handleCreateChildCategories}
        >
          <ChildCategoriesForm
            getCategory={getCategory}
            getSubCategory={getSubCategory}
            onClose={handleCreateChildCategories}
            button="Add New"
            onSave={createChildCategory}
            loading={createChildCategoryLoading}
          />
        </Popup>
      )}
      {updateChildCategories && (
        <Popup
          open={updateChildCategories}
          onClose={handleUpdateChildCategories}
        >
          <ChildCategoriesForm
            getCategory={getCategory}
            getSubCategory={getSubCategory}
            onClose={handleUpdateChildCategories}
            onUpdate={updateChildCategory}
            button="Update"
            loading={updateChildCategoryLoading}
            currentCategoryId={currentChildCategoryId}
            data={currentChildCategoryDataId}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem
            onClose={handleDeleteOrder}
            loading={deleteChildCategoryLoading}
            onClick={handleOnDeleteChildCategory}
          />
        </Popup>
      )}
    </>
  );
};
