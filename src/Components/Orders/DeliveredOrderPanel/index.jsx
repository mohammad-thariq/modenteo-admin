import React, { useCallback, useState } from "react";
import { Breadcrumb } from "../../../common/Breadcrumb";
import { BaseTable } from "@/common/BaseTable";
import { Popup } from "@/common/Popup";
import { DeliveryStatusForm } from "@/common/Form/DeliveryStatusForm";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { router } from "next/router";
import { AllOrderTableHeadings } from "@/constant/tableHeading";
import { OrdersApi } from "@/service/orders/ordersAPI";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";

export const DeliveredOrderPanel = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [openDeliveryStatusForm, setOpenDeliveryStatusForm] = useState(false);
  const { deliveryOrder, deleteOrderById, updateOrderById } = new OrdersApi();
  const { data, refetch, isLoading } = useQuery(["getDeliveryOrder"], deliveryOrder);

  const { mutate: deleteDeleveryOrder, isLoading: deleteDeliveryOrderStatusLoading} = useMutation(
    deleteOrderById,
    {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.notification);
      },
    }
  );

  const {
    mutate: updateDeliveryOrderStatus,
    isLoading: updateDeliveryOrderStatusLoading,
  } = useMutation(updateOrderById, {
    onSuccess: (data, variables, context) => {
      setOpenDeliveryStatusForm(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeliveryStatusForm(true);
      ToastifyFailed(data?.notification);
    },
  });

  const handleNavigateOrder = (id) => {
    router?.push(`/admin/show-order/${id}`);
  };

  const handleDeleteOrder = (id) => {
    setCurrentOrderId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const deleteOrderStatus = () => {
    deleteDeleveryOrder({ id: currentOrderId });
  };

  const handleDeliveryForm = (id) => {
    setCurrentOrderId(id);
    const orderData = data?.orders?.data?.find((i) => i?.id === id);
    setCurrentOrderData(orderData);
    setOpenDeliveryStatusForm(!openDeliveryStatusForm);
  };

  if(isLoading){
    return <Loader />
  }

  if(data && !data?.orders?.data?.length >= 1){
    return <NoDataFound />
  }

  return (
    <>
      <Breadcrumb currentPage={"Delivered Orders"} serachEnable />
      <BaseTable
            onTableData={data?.orders?.data}
            onDelete={handleDeleteOrder}
            onNavigate={handleNavigateOrder}
            onUpdate={handleDeliveryForm}
            tableHeadings={AllOrderTableHeadings}
            isShown
          />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem
            onClose={handleDeleteOrder}
            onClick={deleteOrderStatus}
            loading={deleteDeliveryOrderStatusLoading}
          />
        </Popup>
      )}
      {openDeliveryStatusForm && (
        <Popup open={openDeliveryStatusForm} onClose={handleDeliveryForm}>
          <DeliveryStatusForm
            updateOrderStatusLoading={updateDeliveryOrderStatusLoading}
            onClose={handleDeliveryForm}
            data={currentOrderData}
            currentOrderId={currentOrderId}
            updateOrderStatus={updateDeliveryOrderStatus}
          />
        </Popup>
      )}
    </>
  );
};
