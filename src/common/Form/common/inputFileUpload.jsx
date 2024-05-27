/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { BaseUrls } from "../../../../env";

export const InputFileUpload = ({
    onChange,
    onBlur,
    value,
    label,
    previewImage,
    setPreviewImage,
    onData,
    accept,
    name
}) => {
  
  useEffect(() => {
    if(onData){
      setPreviewImage(`${BaseUrls.IMAGE_URL}/${onData}`)
    }
  }, [onData, setPreviewImage])

  return (
    <>
      <div className="imageSelect">
        <img
          className="imageSelect mb-3"
          src={previewImage || "/assets/img/placeholder.jpg"}
          alt="Preview"
          style={{ maxWidth: "100%" }}
        />
      </div>
      <label>{label}</label>
      <div className="mb-2">
        <input
          accept={accept}
          onChange={onChange}
          type="file"
          name={name}
          className="form-control"
          placeholder="Image"
          onBlur={onBlur}
          value={value}
        />
      </div>
    </>
  );
};
