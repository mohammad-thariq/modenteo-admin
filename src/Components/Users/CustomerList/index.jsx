import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { validateUserTypeEnum } from "@/constant/enum/users.enum";
import { customerListTableHeading } from "@/constant/tableHeading";
import { UsersApi } from "@/service/user/userAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const CustomerList = () => {
  const router = useRouter();
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { getUserByType, deleteUser } = new UsersApi();
  const { data, isLoading, refetch } = useQuery(
    ["customer", validateUserTypeEnum.USER, page, limit],
    getUserByType
  );

  const handleNavigateOrder = (id) => {
    router?.push(`/admin/customer-list/${id}`);
  };

  const {
    mutate: DeleteCustomerListMutate,
    isLoading: deleteCustomerListLoading,
  } = useMutation(deleteUser, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.message);
    },
  });

  const handleDeleteUser = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentCustomerId(id);
  };

  const handleOnDeleteCustomerList = () => {
    DeleteCustomerListMutate({ id: currentCustomerId });
  };

  if (isLoading) {
    return <Loader />;
  }

  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  return (
    <>
      <PageHeader title="Customer List" />
      <Breadcrumb currentPage={"Customer List"} serachEnable />
      <BaseTable
        tableHeadings={customerListTableHeading}
        onUserData={data?.user}
        onDelete={handleDeleteUser}
        onNavigate={handleNavigateOrder}
        pageLimit={limit}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
      />

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteUser}>
          <DeleteItem
            onClose={handleDeleteUser}
            onClick={handleOnDeleteCustomerList}
            loading={deleteCustomerListLoading}
          />
        </Popup>
      )}
    </>
  );
};
