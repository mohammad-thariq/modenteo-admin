import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { AdminListForm } from "@/common/Form/Users/AdminListFrom";
import { Loader } from "@/common/Loader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { validateUserTypeEnum } from "@/constant/enum/users.enum";
import { localStorageConst } from "@/constant/localStorage";
import { adminListTableHeading } from "@/constant/tableHeading";
import { UsersApi } from "@/service/user/userAPI";
import { LocalStorageHelper } from "@/utils/localStorage";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

export const AdminList = () => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [adminData, setIsAdminData] = useState();
  const [currentAdminDataId, setCurrentAdminDataId] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { createAdmin, updateAdmin, getUserByType, deleteUser } =
    new UsersApi();
  const { data, isLoading, refetch } = useQuery(
    ["admins", validateUserTypeEnum.ADMIN, page, limit],
    getUserByType
  );

  const { mutate: createNewAdmin, isLoading: createAdminLoading } = useMutation(
    createAdmin,
    {
      onSuccess: (data, variables, context) => {
        setOpenCreatePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenCreatePopup(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    }
  );

  const { mutate: updateAdminById, isLoading: updateAdminLoading } =
    useMutation(updateAdmin, {
      onSuccess: (data, variables, context) => {
        setOpenUpdatePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenUpdatePopup(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteAdminMutate, isLoading: deleteAdminLoading } =
    useMutation(deleteUser, {
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

  const handleCreateAdmin = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateAdmin = (id) => {
    setCurrentAdminId(id);
    const getAdminById = data?.user?.find((i) => i?.id === id);
    setCurrentAdminDataId(getAdminById);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteAdmin = (id) => {
    setCurrentAdminId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteAdmin = () => {
    deleteAdminMutate({ id: currentAdminId });
  };

  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  useEffect(() => {
    if (LocalStorageHelper?.getItem(localStorageConst.USER)) {
      setIsAdminData(LocalStorageHelper?.getItem(localStorageConst.USER));

      if (adminData?.type === validateUserTypeEnum.SUPERADMIN) {
        setIsSuperAdmin(true);
      }
    }
  }, [adminData?.type]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuperAdmin) return null;

  return (
    <>
      <Breadcrumb currentPage={"Admin"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New Admin"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateAdmin}
        />
      </div>
      <BaseTable
        tableHeadings={adminListTableHeading}
        onAdminListData={data?.user}
        onPaginationClick={onPaginationClick}
        totalPage={data.pagination.totalPage}
        onUpdate={handleUpdateAdmin}
        onDelete={handleDeleteAdmin}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateAdmin}>
          <AdminListForm
            onClose={handleCreateAdmin}
            onSave={createNewAdmin}
            loading={createAdminLoading}
            button="Add Admin"
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateAdmin}>
          <AdminListForm
            currentCustomerId={currentAdminId}
            onClose={handleUpdateAdmin}
            onUpdate={updateAdminById}
            data={currentAdminDataId}
            loading={updateAdminLoading}
            button="Update"
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteAdmin}>
          <DeleteItem
            onClose={handleDeleteAdmin}
            onClick={handleOnDeleteAdmin}
            loading={deleteAdminLoading}
          />
        </Popup>
      )}
    </>
  );
};
