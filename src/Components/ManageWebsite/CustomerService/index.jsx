import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { CustomerServiceForm } from "@/common/Form/ManageWebsiteForm/CustomerServiceForm";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { CustomerServiceTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { manageWebsiteAPI } from "@/service/manageWebsite/manageWebsiteAPI";

export const CustomerService = () => {
  const [createcustomerservice, setCreateCustomerService] = useState(false);
  const [updateCustomerService, setUpdateCustomerService] = useState(false);
  const [deleteCustomerService, setDeleteCustomerService] = useState(false);
  const [currentCustomerServicesId, setCurrentCustomerServicesId] = useState(null);
  const [currentCustomerServicesDataId, setCurrentCustomerServicesDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { service, createService, updateService, deleteService } = new manageWebsiteAPI();

  const { data, isLoading, refetch } = useQuery(
    ["customerservices", page, limit],
    service
  );

  const { mutate: createCustomerServicesMutate, isLoading: createCustomerServicesLoading } =
    useMutation(createService, {
      onSuccess: (data, variables, context) => {
        setCreateCustomerService(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreateCustomerService(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateCustomerServicesMutate, isLoading: updateCustomerServicesLoading } =
    useMutation(updateService, {
      onSuccess: (data, variables, context) => {
        setUpdateCustomerService(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdateCustomerService(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deleteCustomerServicesMutate, isLoading: deleteCustomerServicesLoading } =
    useMutation(deleteService, {
      onSuccess: (data, variables, context) => {
        setDeleteCustomerService(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeleteCustomerService(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreateCustomerService = () => {
    setCreateCustomerService(!createcustomerservice);
  };

  const handleUpdateCustomerService = (id) => {
    setCurrentCustomerServicesId(id);
    const getCustomerServicesyById = data?.service?.find((i) => i?.id === id);
    setCurrentCustomerServicesDataId(getCustomerServicesyById);
    setUpdateCustomerService(!updateCustomerService);
  };

  const handleDeleteCustomerServices = (id) => {
    setCurrentCustomerServicesId(id);
    setDeleteCustomerService(!deleteCustomerService);
  };

  const handleOnDeleteCustomerServices = () => {
    deleteCustomerServicesMutate({ id: currentCustomerServicesId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(data, "data");

  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  return (
    <>
      <Breadcrumb currentPage={"Customer Service"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateCustomerService}
        />
      </div>
      <BaseTable
        tableHeadings={CustomerServiceTableHeading}
        onCustomerServiceData={data?.service}
        onUpdate={handleUpdateCustomerService}
        onDelete={handleDeleteCustomerServices}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createcustomerservice && (
        <Popup open={createcustomerservice} onClose={handleCreateCustomerService}>
          <CustomerServiceForm
            onClose={handleCreateCustomerService}
            button="Add New"
            loading={createCustomerServicesLoading}
            onSave={createCustomerServicesMutate}
          />
        </Popup>
      )}
      {updateCustomerService && (
        <Popup open={updateCustomerService} onClose={handleUpdateCustomerService}>
          <CustomerServiceForm
            button="Update"
            onUpdate={updateCustomerServicesMutate}
            onClose={handleUpdateCustomerService}
            data={currentCustomerServicesDataId}
            currentCustomerServicesId={currentCustomerServicesId}
            loading={updateCustomerServicesLoading}
          />
        </Popup>
      )}

      {deleteCustomerService && (
        <Popup open={deleteCustomerService} onClose={handleDeleteCustomerServices}>
          <DeleteItem
            onClose={handleDeleteCustomerServices}
            loading={deleteCustomerServicesLoading}
            onClick={handleOnDeleteCustomerServices}
          />
        </Popup>
      )}
    </>
  );
};
