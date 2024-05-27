import { Breadcrumb } from "@/common/Breadcrumb";
import { Card } from "@/common/Card";
import { BankForm } from "@/common/Form/EcommerceForm/PaymentMethod/Bank";
import { CashOnDeliveryForm } from "@/common/Form/EcommerceForm/PaymentMethod/CashOnDelivery";
import { RazorPayForm } from "@/common/Form/EcommerceForm/PaymentMethod/RazorPay";
import { StripeForm } from "@/common/Form/EcommerceForm/PaymentMethod/Stripe";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { paymentMethods, paymentMethodsName } from "@/constant/statusConst";
import { EcommerceAPI } from "@/service/ecommerce/EcommerceAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const PaymentMethod = () => {
  const [openStripePayment, setOpenStripePayment] = useState(false);
  const [openRazorPayment, setOpenRazorPayment] = useState(false);
  const [openBankPayment, setOpenBankPayment] = useState(false);
  const [openCodPayment, setOpenCodPayment] = useState(false);

  const handleStripePayment = () => {
    setOpenStripePayment(!openStripePayment);
  };

  const handleRazorPayment = () => {
    setOpenRazorPayment(!openRazorPayment);
  };

  const handleBankPayment = () => {
    setOpenBankPayment(!openBankPayment);
  };

  const handleCodPayment = () => {
    setOpenCodPayment(!openCodPayment);
  };

  const { paymentMethod, updateStipe, updateRazorpay, updateBank, updateCod } =
    new EcommerceAPI();

  const { data, isLoading, refetch } = useQuery(
    ["payment-method"],
    paymentMethod
  );

  const { mutate: updateStripeMutate, isLoading: updateStripeLoading } =
    useMutation(updateStipe, {
      onSuccess: (data, variables, context) => {
        setOpenStripePayment(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenStripePayment(true);
        ToastifyFailed(data?.notification);
        refetch();
      },
    });

  const { mutate: updateRazorPayMutate, isLoading: updateRazorPayLoading } =
    useMutation(updateRazorpay, {
      onSuccess: (data, variables, context) => {
        handleRazorPayment(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        handleRazorPayment(true);
        ToastifyFailed(data?.notification);
        refetch();
      },
    });

  const { mutate: updateBankMutate, isLoading: updateBankLoading } =
    useMutation(updateBank, {
      onSuccess: (data, variables, context) => {
        handleBankPayment(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        handleBankPayment(true);
        ToastifyFailed(data?.notification);
        refetch();
      },
    });

  const {
    mutate: updateCashOnDeliveryMutate,
    isLoading: updateCashOnDeliveryLoading,
  } = useMutation(updateCod, {
    onSuccess: (data, variables, context) => {
      setOpenCodPayment(false);
      ToastifySuccess(data);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenCodPayment(true);
      ToastifyFailed(data);
      refetch();
    },
  });

  const stripeData = data?.stripe;
  const razorPayData = data?.razorpay;
  const BankAccountData = data?.bank;
  const CodData = data?.bank;
  const getCountries = data?.countires;
  const getCurrency = data?.currencies;

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Payment Method"} serachEnable />
      <div className="flex justify-content-center flex-wrap gap-4 mt-6 z-index-0">
        {paymentMethods?.map((i) => (
          <Card
            key={i?.id}
            {...i}
            onClick={() =>
              i?.name === paymentMethodsName.RAZOR
                ? handleRazorPayment()
                : i?.name === paymentMethodsName.BANK
                ? handleBankPayment()
                : i?.name === paymentMethodsName.COD
                ? handleCodPayment()
                : handleStripePayment()
            }
          />
        ))}
      </div>
      {openStripePayment && (
        <Popup open={openStripePayment} onClose={handleStripePayment}>
          <StripeForm
            formName="Strip Payment"
            button="Update"
            onUpdate={updateStripeMutate}
            loading={updateStripeLoading}
            onClose={handleStripePayment}
            getCountries={getCountries}
            getCurrency={getCurrency}
            data={stripeData}
          />
        </Popup>
      )}

      {openRazorPayment && (
        <Popup open={openRazorPayment} onClose={handleRazorPayment}>
          <RazorPayForm
            formName="Razor Payment"
            button="Update"
            onUpdate={updateRazorPayMutate}
            loading={updateRazorPayLoading}
            getCountries={getCountries}
            getCurrency={getCurrency}
            onClose={handleRazorPayment}
            data={razorPayData}
          />
        </Popup>
      )}

      {openBankPayment && (
        <Popup open={openBankPayment} onClose={handleBankPayment}>
          <BankForm
            formName="Bank Payment"
            button="Update"
            onClose={handleBankPayment}
            onUpdate={updateBankMutate}
            loading={updateBankLoading}
            data={BankAccountData}
          />
        </Popup>
      )}

      {openCodPayment && (
        <Popup open={openCodPayment} onClose={handleCodPayment}>
          <CashOnDeliveryForm
            formName="Cash On Delivery Payment"
            button="Update"
            onClose={handleCodPayment}
            onUpdate={updateCashOnDeliveryMutate}
            loading={updateCashOnDeliveryLoading}
            data={CodData}
          />
        </Popup>
      )}
    </>
  );
};
