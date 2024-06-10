import React, { useCallback, useState } from "react";
import { Breadcrumb } from "../../../common/Breadcrumb";
import { NoDataFound } from "@/common/NoDataFound";
import { BaseTable } from "@/common/BaseTable";
import { useMutation, useQuery } from "react-query";
import { OrdersApi } from "@/service/orders/ordersAPI";
import { AllOrderTableHeadings } from "@/constant/tableHeading";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { DeliveryStatusForm } from "@/common/Form/DeliveryStatusForm";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { router } from "next/router";
import { Loader } from "@/common/Loader";

export const ProgressOrderPanel = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openDeliveryStatusForm, setOpenDeliveryStatusForm] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { progressOrders, deleteOrderById, updateOrderById, getOrderById } = new OrdersApi();
  const { data, isLoading, refetch } = useQuery(
    ["getProgressOrdersOrders", page, limit],
    progressOrders
  );

  const { data: currentOrderData } = useQuery(["getOrderById", currentOrderId], getOrderById, {
    enabled: !!currentOrderId,
  });

  const { mutate, isLoading: deleteOrderStatusLoading } = useMutation(
    deleteOrderById,
    {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.error);
      },
    }
  );

  const { mutate: updateOrderStatus, isLoading: updateOrderStatusLoading } =
    useMutation(updateOrderById, {
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

  const handleDeleteOrder = (id) => {
    setCurrentOrderId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const deleteOrderStatus = () => {
    mutate({ id: currentOrderId });
  };

  const handleNavigateOrder = (id) => {
    router?.push(`/admin/show-order/${id}`);
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
      <Breadcrumb currentPage={"Progress Orders"} serachEnable />{" "}
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
            loading={deleteOrderStatusLoading}
          />
        </Popup>
      )}
      {openDeliveryStatusForm && currentOrderData && (
        <Popup open={openDeliveryStatusForm} onClose={handleDeliveryForm}>
          <DeliveryStatusForm
            updateOrderStatusLoading={updateOrderStatusLoading}
            onClose={handleDeliveryForm}
            data={currentOrderData}
            currentOrderId={currentOrderId}
            updateOrderStatus={updateOrderStatus}
          />
        </Popup>
      )}{" "}
    </>
  );
};
