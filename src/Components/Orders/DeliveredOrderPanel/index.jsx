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
  const [openDeliveryStatusForm, setOpenDeliveryStatusForm] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { deliveredOrders, deleteOrderById, updateOrderById, getOrderById } = new OrdersApi();
  const { data, refetch, isLoading } = useQuery(
    ["getDeliveredOrders", page, limit],
    deliveredOrders
  );

  const { data: currentOrderData } = useQuery(["getOrderById", currentOrderId], getOrderById, {
    enabled: !!currentOrderId,
  });

  const {
    mutate: deleteDeleveryOrder,
    isLoading: deleteDeliveryOrderStatusLoading,
  } = useMutation(deleteOrderById, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.error);
    },
  });

  const {
    mutate: updateDeliveryOrderStatus,
    isLoading: updateDeliveryOrderStatusLoading,
  } = useMutation(updateOrderById, {
    onSuccess: (data, variables, context) => {
      setOpenDeliveryStatusForm(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeliveryStatusForm(true);
      ToastifyFailed(data?.error);
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
    setOpenDeliveryStatusForm(!openDeliveryStatusForm);
    if(openDeliveryStatusForm){
      setCurrentOrderId(null)
    }
  };

  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (data && data?.orders?.length === 0) {
    return <NoDataFound />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Delivered Orders"} serachEnable />
      <BaseTable
        onTableData={data?.orders}
        onDelete={handleDeleteOrder}
        onNavigate={handleNavigateOrder}
        onUpdate={handleDeliveryForm}
        tableHeadings={AllOrderTableHeadings}
        isShown
        onPaginationClick={onPaginationClick}
        totalPage={data?.pagination?.totalPage}
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
      {openDeliveryStatusForm && currentOrderData && (
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
