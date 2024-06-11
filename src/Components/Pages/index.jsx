import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { PageForm } from "@/common/Form/PageForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { PageTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { pageAPI } from "@/service/page/pageAPI";
export const WebsitePages = () => {
  const [createcustomerpage, setCreatePage] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
  const [currentPagesId, setCurrentPagesId] = useState(null);
  const [currentPagesDataId, setCurrentPagesDataId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { pages, createPage, updatePages, deletePages } = new pageAPI();

  const { data, isLoading, refetch } = useQuery(
    ["customerpages", page, limit],
    pages
  );

  const { mutate: createPagesMutate, isLoading: createPagesLoading } =
    useMutation(createPage, {
      onSuccess: (data, variables, context) => {
        setCreatePage(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setCreatePage(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updatePagesMutate, isLoading: updatePagesLoading } =
    useMutation(updatePages, {
      onSuccess: (data, variables, context) => {
        setUpdatePage(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setUpdatePage(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: deletePagesMutate, isLoading: deletePagesLoading } =
    useMutation(deletePages, {
      onSuccess: (data, variables, context) => {
        setDeletePage(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setDeletePage(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const handleCreatePage = () => {
    setCreatePage(!createcustomerpage);
  };

  const handleUpdatePage = (id) => {
    setCurrentPagesId(id);
    const getPagesyById = data?.pages?.find((i) => i?.id === id);
    setCurrentPagesDataId(getPagesyById);
    setUpdatePage(!updatePage);
  };

  const handleDeletePages = (id) => {
    setCurrentPagesId(id);
    setDeletePage(!deletePage);
  };

  const handleOnDeletePages = () => {
    deletePagesMutate({ id: currentPagesId });
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
      <Breadcrumb currentPage={"Website Pages"} />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#dc395f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreatePage}
        />
      </div>
      <BaseTable
        tableHeadings={PageTableHeading}
        onPageData={data?.pages}
        onUpdate={handleUpdatePage}
        onDelete={handleDeletePages}
        totalPage={data?.pagination?.totalPage}
        onPaginationClick={onPaginationClick}
        pageLimit={limit}
      />
      {createcustomerpage && (
        <Popup open={createcustomerpage} onClose={handleCreatePage}>
          <PageForm
            onClose={handleCreatePage}
            button="Add New"
            loading={createPagesLoading}
            onSave={createPagesMutate}
          />
        </Popup>
      )}
      {updatePage && (
        <Popup open={updatePage} onClose={handleUpdatePage}>
          <PageForm
            button="Update"
            onUpdate={updatePagesMutate}
            onClose={handleUpdatePage}
            data={currentPagesDataId}
            currentPagesId={currentPagesId}
            loading={updatePagesLoading}
          />
        </Popup>
      )}

      {deletePage && (
        <Popup open={deletePage} onClose={handleDeletePages}>
          <DeleteItem
            onClose={handleDeletePages}
            loading={deletePagesLoading}
            onClick={handleOnDeletePages}
          />
        </Popup>
      )}
    </>
  );
};
