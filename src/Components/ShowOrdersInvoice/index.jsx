import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import Image from "next/image";
import { OrderTotal } from "./OrderTotal";
import { BillingAddress } from "./BillingAddress";
import { ShippingAddress } from "./ShippingAddress";
import { showOrderTableHeadings } from "@/constant/tableHeading";
import { Actions } from "./Actions";
import { useRef, useState } from "react";
import { Popup } from "@/common/Popup";
import { DeliveryStatusForm } from "@/common/Form/DeliveryStatusForm";
import { Informations } from "./Informations";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { OrdersApi } from "@/service/orders/ordersAPI";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export const ShowOrdersInvoice = ({ orderDetails }) => {
  const pdfRef = useRef();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openOrderStatus, setOpenOrderStatus] = useState(false);

  const router = useRouter();
  const id = router?.query?.id;

  const { getOrderShowById } = new OrdersApi();
  const { data } = useQuery(["show-order", id], getOrderShowById);

  const handleDeleteOrder = (id) => {
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOpenOrderStatus = () => {
    setOpenOrderStatus(!openOrderStatus);
  };

  const exportPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "04", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <Breadcrumb currentPage="Invoice" />
      <div className="container-fluid py-4">
        <div className="card">
          <div className="card-body p-3">
            <div className="flex align-item-center justify-content-sb flex-wrap mx-4">
              <Image
                className="InvoiceWrapperImage mb-3 "
                src="/assets/img/logos/modenteologo.png"
                width={180}
                height={80}
                objectFit="contain"
                alt="modenteologo"
              />
              <p className="text-lg fw-bolder color-6c757d mb-1">
                Order #{orderDetails?.order_id}
              </p>
            </div>
            <BillingAddress
              orderDetails={orderDetails}
              name="Billing Address"
            />
            <ShippingAddress
              orderDetails={orderDetails}
              name="Shipping Address"
            />

            <Informations orderDetails={orderDetails} />
          </div>
          <BaseTable
            ref={pdfRef}
            tableHeadings={showOrderTableHeadings}
            onShowOrder={orderDetails}
          />
          <OrderTotal orderDetails={orderDetails} />
        </div>
        <Actions
          handleOpenOrderStatus={handleOpenOrderStatus}
          handleDeleteOrder={handleDeleteOrder}
          exportPDF={exportPDF}
        />
      </div>
      {openOrderStatus && (
        <Popup open={openOrderStatus} onClose={handleOpenOrderStatus}>
          <DeliveryStatusForm
            onClose={handleOpenOrderStatus}
            data={orderDetails}
            deliveryMan
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem handleDeleteOrder={handleDeleteOrder} />
        </Popup>
      )}
    </>
  );
};
