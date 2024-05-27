import React from "react";

export const ProductType = ({ top, best, featured, newProduct }) => {
  return (
    <div className="flex align-items-center justify-content-c gap-1">
      {top === 1 && (
        <p className="text-warning border border-warning text-xxs font-weight-bold badge badge-xxs">
          top
        </p>
      )}
      {best === 1 && (
        <p className="text-danger border border-danger text-xxs font-weight-bold badge badge-xxs">
          best
        </p>
      )}
      {featured === 1 && (
        <p className="text-success border border-success  text-xxs font-weight-bold badge badge-xxs">
          featured
        </p>
      )}
      {newProduct === 1 && (
        <p className="text-info border border-info text-xxs font-weight-bold badge badge-xxs">
          new
        </p>
      )}
    </div>
  );
};
