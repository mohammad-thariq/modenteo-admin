import React from "react";

export const InputSelect = ({
  name,
  label,
  onChange,
  onBlur,
  values,
  onData,
  isValue,
  isCode,
  noLabel,
}) => {
  return (
    <>
      {noLabel ? null : <label>{label}</label>}
      <div className="mb-2">
        <select
          className="form-select"
          aria-label="Default select example"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={values}
        >
          <option hidden>Select {label}</option>
          {onData?.map((i) => (
            <option
              key={isValue ? i?.value : isCode ? i?.code : i?.id}
              value={isValue ? i?.value : isCode ? i?.code : i?.id}
            >
              {i?.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
