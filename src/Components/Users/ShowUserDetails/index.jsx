import { Breadcrumb } from "@/common/Breadcrumb";
import { BillingAddress } from "./BillingAddress";
// import { ShippingAddress } from "./ShippingAddress";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { UsersApi } from "@/service/user/userAPI";
import { Actions } from "./Actions";
import { Popup } from "@/common/Popup";
import { CustomerListForm } from "@/common/Form/Users/CustomerListForm";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useState } from "react";
import { Loader } from "@/common/Loader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { Redirect } from "@/helper/base";

export const ShowUserDetail = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openUserStatus, setOpenUserStatus] = useState(false);
  const router = useRouter();
  const id = router?.query?.id;
  const { getUserAddressByUserID, deleteUser } = new UsersApi();
  // const { data, isLoading } = useQuery(["user", id], getUserById);
  const { data: userAddress, isLoading: userAddressLoading } = useQuery(
    ["user=details", id],
    getUserAddressByUserID
  );

  const handleOpenUserStatus = () => {
    setOpenUserStatus(!openUserStatus);
  };

  const handleDeleteUser = () => {
    setOpenDeletePopup(!openDeletePopup);
  };

  const {
    mutate: DeleteCustomerListMutate,
    isLoading: deleteCustomerListLoading,
  } = useMutation(deleteUser, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      Redirect("/admin/customer-list");
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.message);
    },
  });

  const handleOnDeleteCustomerList = () => {
    DeleteCustomerListMutate({ id: id });
  };

  if (userAddressLoading) return <Loader />;

  return (
    <>
      <Breadcrumb currentPage="User Details" />
      <div className="container-fluid py-4">
        <div className="card">
          <div className="card-body p-3">
            {/* <UserDetails orderDetails={orderDetails} name="User Details" /> */}
            <BillingAddress userAddress={userAddress} name="Billing Address" />
            {/* <ShippingAddress
              userAddress={userAddress}
              name="Shipping Address"
            /> */}
          </div>
        </div>
        <Actions
          handleDeleteOrder={handleDeleteUser}
          handleOpenUserStatus={handleOpenUserStatus}
        />
      </div>
      {openUserStatus && (
        <Popup open={openUserStatus} onClose={handleOpenUserStatus}>
          <CustomerListForm
            onClose={handleOpenUserStatus}
            deliveryMan
            button="Update"
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteUser}>
          <DeleteItem
            onClick={handleOnDeleteCustomerList}
            loading={deleteCustomerListLoading}
            onClose={handleDeleteUser}
          />
        </Popup>
      )}
    </>
  );
};
