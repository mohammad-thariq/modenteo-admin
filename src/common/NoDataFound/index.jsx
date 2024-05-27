/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Breadcrumb } from "../Breadcrumb";
import { useRouter } from "next/router";
import { getTitleFromPath } from "@/utils/getTitleFromPath";

export const NoDataFound = ({ noHeader, message, messageContent }) => {
  const router = useRouter();
  const defaultMessage =
    "Whoopsie daisy! It looks like the data decided to play hide-and-seek";
  const defaultMessageContent =
    "While we banish them back to the digital realm, please make sure everything is fine from your side";
  return (
    <>
      {!noHeader && (
        <Breadcrumb currentPage={getTitleFromPath(router?.asPath)} />
      )}
      <div className="noData-wrapper">
        <img src="/assets/img/noDataFound.svg" alt="not-found" />
        <div className="noData-message-wrapper">
          <h4 className="noData-message">{message || defaultMessage}</h4>
          <p style={{ width: "360px" }}>
            {messageContent || defaultMessageContent}
          </p>
        </div>
      </div>
    </>
  );
};
