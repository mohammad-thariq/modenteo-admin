/* eslint-disable @next/next/no-img-element */
import { Formik } from "formik";
import style from "../index.module.css";
import { Button } from "@/common/Button";
import { useState } from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BaseUrls } from "../../../../../env";
import * as Yup from "yup";
import {
  tinyMceContentStyle,
  tinyMcePlugin,
  tinyMceToolbar,
} from "@/constant/tableHeading";
import { InputFileUpload } from "../../common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

const schema = Yup.object({
  name: Yup.string().required("Name is Required"),
  short_name: Yup.string().required("Short Name is Required"),
  category: Yup.string().required("Category is Required"),
  sub_category: Yup.string().required("Sub Category is Required"),
  quantity: Yup.string().required("Stock Quantity is Required"),
  sku: Yup.string().required("Sku is Required"),
  price: Yup.string().required("Price is Required"),
  short_description: Yup.string().required("Short Description is Required"),
  status: Yup.string().required("Status is Required"),
});

export const ProductForm = ({
  onClose,
  button,
  data,
  onSave,
  currentProductId,
  onUpdate,
  loading,
  category,
  subCategory,
  collection,
  brand,
}) => {
  const editorRef = useRef("");
  const [topProduct, setTopProduct] = useState(
    data?.top_product === 1 ? true : false || false
  );
  const [newArrival, setNewArrival] = useState(
    data?.new_product === 1 ? true : false || false
  );
  const [bestProduct, setBestProduct] = useState(
    data?.best_product === 1 ? true : false || false
  );
  const [featuredProduct, setFeaturedProduct] = useState(
    data?.featured_product === 1 ? true : false || false
  );

  const [imagePreview, setImagePreview] = useState();

  const toggleTopProduct = () => {
    setTopProduct(!topProduct);
  };

  const toggleNewArrival = () => {
    setNewArrival(!newArrival);
  };
  const toggleBestProduct = () => {
    setBestProduct(!bestProduct);
  };

  const toggleFeaturedProduct = () => {
    setFeaturedProduct(!featuredProduct);
  };

  const getLongDescription =
    editorRef.current && editorRef.current.getContent();

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          short_name: data?.short_name || "",
          name: data?.name || "",
          image: imagePreview,
          category: data?.category_id || "",
          sub_category: data?.sub_category_id || "",
          collection: data?.collection_id || "",
          brand: data?.brand_id || "",
          quantity: data?.stock_quantity || "",
          sku: data?.sku || "",
          price: data?.price || "",
          offer_price: data?.offer_price || "",
          short_description: data?.short_description || "",
          long_description: data?.long_description || getLongDescription || "",
          status: data?.status + 1 || "",
          weight: data?.weight || "",
          seo_title: data?.seo_title || "",
          seo_description: data?.seo_description || "",
          top_product: topProduct === false ? 0 : 1,
          new_arrival: newArrival === false ? 0 : 1,
          best_product: bestProduct === false ? 0 : 1,
          featured_product: featuredProduct === false ? 0 : 1,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (!imagePreview) {
            actions.setFieldError("image", "Image is required");
            return;
          }
          if (!getLongDescription) {
            actions.setFieldError(
              "long_description",
              "Long Description is required"
            );
            return;
          }
          onUpdate
            ? onUpdate({
                id: currentProductId,
                short_name: values?.short_name,
                name: values?.name,
                image: imagePreview,
                category: values?.category,
                sub_category: values?.sub_category,
                collection: values?.collection,
                brand: values?.brand,
                quantity: values?.quantity,
                sku: values?.sku,
                price: values?.price,
                offer_price: values?.offer_price,
                short_description: values?.short_description,
                long_description: getLongDescription,
                status: values?.status - 1,
                weight: values?.weight,
                seo_title: values?.seo_title,
                seo_description: values?.seo_description,
                top_product: topProduct === false ? 0 : 1,
                new_arrival: newArrival === false ? 0 : 1,
                best_product: bestProduct === false ? 0 : 1,
                featured_product: featuredProduct === false ? 0 : 1,
              })
            : onSave({
                short_name: values?.short_name,
                name: values?.name,
                image: imagePreview,
                category: values?.category,
                sub_category: values?.sub_category,
                collection: values?.collection,
                brand: values?.brand,
                quantity: values?.quantity,
                sku: values?.sku,
                price: values?.price,
                offer_price: values?.offer_price,
                short_description: values?.short_description,
                long_description: getLongDescription,
                status: values?.status - 1,
                weight: values?.weight,
                seo_title: values?.seo_title,
                seo_description: values?.seo_description,
                top_product: topProduct === false ? 0 : 1,
                new_arrival: newArrival === false ? 0 : 1,
                best_product: bestProduct === false ? 0 : 1,
                featured_product: featuredProduct === false ? 0 : 1,
              });
          actions.setSubmitting(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="formInner overflow-column height-500">
            <div className="mb-3">
              <InputFileUpload
                label="Thumb Image"
                onChange={(e) => FilePreviewChange(e, setImagePreview)}
                onBlur={handleBlur}
                name="image"
                value={values?.image}
                accept="image/*"
                onData={data?.image}
                previewImage={imagePreview}
                setPreviewImage={setImagePreview}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.image && touched.image && errors.image}
              </p>
            </div>
            <label>Short Name</label>
            <div className="mb-2">
              <input
                type="text"
                name="short_name"
                className="form-control"
                placeholder="Short Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.short_name}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.short_name && touched.short_name && errors.short_name}
              </p>
            </div>
            <label>Name</label>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="Icon-addon"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <InputSelect
              label="Category"
              name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values?.category}
              onData={category}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.category && touched.category && errors.category}
            </p>
            {/* <InputSelect
              label="Sub Category"
              name="sub_category_id"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.sub_category_id}
              onData={subCategory}
            /> */}
            <label>Sub Category</label>
            <select
              className="form-select"
              name="sub_category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sub_category}
            >
              <option hidden>Select Sub Category</option>
              {subCategory?.map(
                (i) =>
                  values.category == i?.category_id && (
                    <option key={i?.id} value={i?.id}>
                      {i?.name}
                    </option>
                  )
              )}
            </select>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.sub_category &&
                touched.sub_category &&
                errors.sub_category}
            </p>
            <InputSelect
              label="Collection"
              name="collection"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.collection}
              onData={collection}
            />
            <InputSelect
              label="Brand"
              name="brand"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.brand}
              onData={brand}
            />
            <label>SKU</label>
            <div className="mb-2">
              <input
                type="text"
                name="sku"
                className="form-control"
                placeholder="SKU"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sku}
              />
            </div>
            <label>Price</label>
            <div className="mb-2">
              <input
                type="text"
                name="price"
                className="form-control"
                placeholder="Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.price && touched.price && errors.price}
              </p>
            </div>
            <label>Offer Price</label>
            <div className="mb-2">
              <input
                type="text"
                name="offer_price"
                className="form-control"
                placeholder="Offer Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.offer_price}
              />
            </div>
            <label>Stock Quantity</label>
            <div className="mb-2">
              <input
                type="text"
                name="quantity"
                className="form-control"
                placeholder="Stock Quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
              />
            </div>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.quantity && touched.quantity && errors.quantity}
            </p>
            <label>Weight</label>
            <div className="mb-2">
              <input
                type="text"
                name="weight"
                className="form-control"
                placeholder="Weight"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.weight}
              />
            </div>
            <label>Short Description</label>
            <div className="mb-2">
              <textarea
                rows="4"
                cols="50"
                name="short_description"
                className="form-control"
                placeholder="Short Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.short_description}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.short_description &&
                  touched.short_description &&
                  errors.short_description}
              </p>
            </div>
            <label>Long Description</label>
            <div className="mb-2">
              <Editor
                apiKey={BaseUrls.TINYMCE_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={values?.long_description}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: tinyMcePlugin,
                  toolbar: tinyMceToolbar,
                  content_style: tinyMceContentStyle,
                }}
              />
            </div>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.long_description &&
                touched.long_description &&
                errors.long_description}
            </p>
            <label>Highlight</label>
            <div className="flex align-items-center gap-2">
              <div className="mb-2 flex align-item-center">
                <input
                  type="checkbox"
                  style={{
                    background: "#000",
                  }}
                  checked={topProduct}
                  onChange={toggleTopProduct}
                />
                <label className="mt-2">Top Product</label>
              </div>
              <div className="mb-2 flex align-item-center">
                <input
                  type="checkbox"
                  checked={newArrival}
                  onChange={toggleNewArrival}
                />
                <label className="mt-2">New Arrival</label>
              </div>
              <div className="mb-2 flex align-item-center">
                <input
                  type="checkbox"
                  checked={bestProduct}
                  onChange={toggleBestProduct}
                />
                <label className="mt-2">Best Product</label>
              </div>
              <div className="mb-2 flex align-item-center">
                <input
                  type="checkbox"
                  checked={featuredProduct}
                  onChange={toggleFeaturedProduct}
                />
                <label className="mt-2">Featured Product</label>
              </div>
            </div>

            <InputSelect
              label="Status"
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
              isValue
              onData={statusConstantOption}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.status && touched.status && errors.status}
            </p>
            <label>SEO Title</label>
            <div className="mb-2">
              <input
                type="text"
                name="seo_title"
                className="form-control"
                placeholder="SEO Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.seo_title}
              />
            </div>
            <label>SEO Description</label>
            <div className="mb-2">
              <textarea
                rows="4"
                cols="50"
                name="seo_description"
                className="form-control"
                placeholder="SEO Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.seo_description}
              />
            </div>
            <div className={style.btnWrapper}>
              <Button
                name="Close"
                border="1px solid #dc395f"
                color="#000"
                onClick={onClose}
              />
              <Button
                name={button}
                bg="#dc395f"
                type="submit"
                color="#fff"
                onClick={handleSubmit}
                isSubmitting={loading}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
