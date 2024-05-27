import React from "react";
import { Breadcrumb } from "../Breadcrumb";
import { MutatingDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import { getTitleFromPath } from "@/utils/getTitleFromPath";

export const Loader = ({ serachEnable }) => {
  const router = useRouter();
  return (
    <>
      <Breadcrumb
        currentPage={getTitleFromPath(router?.asPath)}
        serachEnable={serachEnable}
      />
      <div className="flex justify-content-center align-items-center h-80vh">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#dc395f"
          secondaryColor="#dc395f"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};
