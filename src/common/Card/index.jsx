import React from "react";
import { Button } from "../Button";

export const Card = (props) => {
  const { bgImage, name, description, action, onClick } = props;
  return (
    <div className="col-lg-5">
      <div className="card h-100 p-3">
        <div
          className="overflow-hidden position-relative border-radius-lg bg-cover h-100"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <span className="mask bg-gradient-dark"></span>
          <div className="card-body position-relative d-flex flex-column h-100 p-3">
            <h5 className="text-white font-weight-bolder mb-4 pt-2">{name}</h5>
            <p className="text-white">{description}</p>
            <a className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto cursor-pointer">
              <Button
                name={action}
                bg="#dc395f"
                color="#fff"
                onClick={onClick}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
