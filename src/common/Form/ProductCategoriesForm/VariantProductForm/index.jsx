import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { Button } from "@/common/Button";
import style from "../index.module.css";

const schema = Yup.object({
  product_id: Yup.string().required("Product is required"),
  variant_products: Yup.array().of(Yup.string().required()).min(1, "At least one variant product is required"),
});

export const VariantProductForm = ({ onClose, button, data, onSave, loading, currentProductId, products, mappedVariants = [] }) => {
  console.log(mappedVariants, "mappedVariantsmappedVariants")

  const variantIds = mappedVariants?.products?.map(variant => variant.variant_id);
  console.log(variantIds, 'variantIds')

  return (
    <div className={style.wrapper}>
      <Formik
        enableReinitialize
        initialValues={{
          product_id: currentProductId,
          variant_products: variantIds || [],
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onSave(values);
          actions.setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="formInner overflow-column height-500">
            <div className="mb-3">
              <input
                type="hidden"
                name="product_id"
                className="form-control"
                placeholder="Product ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.product_id}
              />
              {errors.product_id && touched.product_id && <p style={{ color: "red" }}>{errors.product_id}</p>}
            </div>

            <label>Variant Products</label>
            <div className="mb-3">
              <Select
                isMulti
                name="variant_products"
                options={products.map(product => ({ value: product.id, label: product.name }))}
                value={values.variant_products.map(id => products.find(product => product.id === id)).filter(Boolean).map(product => ({ value: product.id, label: product.name }))}
                onChange={selected => setFieldValue('variant_products', selected.map(option => option.value))}
                onBlur={handleBlur}
              />
              {errors.variant_products && touched.variant_products && <p style={{ color: "red" }}>{errors.variant_products}</p>}
            </div>

            <div className={style.btnWrapper}>
              <Button name="Close" border="1px solid #dc395f" color="#000" onClick={onClose} />
              <Button name={button} bg="#dc395f" type="submit" color="#fff" isSubmitting={loading} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

// Assume fetchProducts API call
const fetchProducts = async () => {
  // Fetch products from the server
  return [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' },
    // More products...
  ];
};
