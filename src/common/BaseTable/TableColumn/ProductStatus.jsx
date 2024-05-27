import React from "react";

export const ProductStatus = ({ status }) => {
  return (
    <>
      <span
        className={
          status === 1
            ? "text-success border border-success  text-xxs font-weight-bold badge badge-xxs"
            : status === 0
            ? "text-warning border border-warning text-xxs font-weight-bold badge badge-xxs"
            : ""
        }
      >
        {status === 1 ? "Active" : "Inactive"}
      </span>
    </>
  );
};
