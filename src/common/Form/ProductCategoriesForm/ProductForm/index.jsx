/* eslint-disable @next/next/no-img-element */
import { Formik } from "formik";
import style from "../index.module.css";
import { Button } from "@/common/Button";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BaseUrls } from "../../../../../env";
import * as Yup from "yup";
import {
  tinyMceContentStyle,
  tinyMcePlugin,
  tinyMceToolbar,
} from "@/constant/tableHeading";

const schema = Yup.object({
  name: Yup.string().required("Name is Required"),
  short_name: Yup.string().required("Short Name is Required"),
  category: Yup.string().required("Category is Required"),
  price: Yup.string().required("Price is Required"),
  weight: Yup.string().required("weight is Required"),
  short_description: Yup.string().required("Short Description is Required"),
  // long_description: Yup.string().required("Long Description is Required"),
  // thumb_image: Yup.string().required("Image is Required"),
  slug: Yup.string().required("Slug is Required"),
  status: Yup.string().required("Status is Required"),
  // keys: Yup.array().required("Keys is Required"),
  // specifications: Yup.array().required("Specifications is Required"),
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
  childCategory,
  brand,
  keys,
}) => {
  const editorRef = useRef("");
  const [topProduct, setTopProduct] = useState(
    data?.is_top === 1 ? true : false || false
  );
  const [newArrival, setNewArrival] = useState(
    data?.new_product === 1 ? true : false || false
  );
  const [bestProduct, setBestProduct] = useState(
    data?.is_best === 1 ? true : false || false
  );
  const [featuredProduct, setFeaturedProduct] = useState(
    data?.is_featured === 1 ? true : false || false
  );
  const [isSpecification, setIsSpecification] = useState(
    data?.is_specification || true
  );
  const [inputPairs, setInputPairs] = useState([{ key: "", value: "" }]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (data) {
      setImagePreview(`${BaseUrls?.IMAGE_URL}/${data?.thumb_image}`);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new input pair
  const addInputPair = () => {
    setInputPairs([...inputPairs, { key: "", value: "" }]);
  };

  // Function to remove an input pair
  const removeInputPair = (index) => {
    const pairs = [...inputPairs];
    pairs.splice(index, 1);
    setInputPairs(pairs);
  };

  // Function to handle changes in input field values for a pair
  const handleInputChange = (index, field, event) => {
    const pairs = [...inputPairs];
    pairs[index][field] = event.target.value;
    setInputPairs(pairs);
  };

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

  const toggleIsSpecification = () => {
    setIsSpecification(!isSpecification);
  };

  const getLongDescription =
    editorRef.current && editorRef.current.getContent();

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          short_name: data?.short_name || "",
          name: data?.name || "",
          slug: data?.slug || "",
          thumb_image: imagePreview,
          category: data?.category?.name || "",
          sub_category: data?.sub_category_id || "",
          child_category: data?.child_category_id || "",
          brand: data?.brand?.name || "",
          quantity: data?.qty || "",
          sku: data?.sku || "",
          price: data?.price || "",
          offer_price: data?.offer_price || "",
          short_description: data?.short_description || "",
          long_description: data?.long_description || getLongDescription || "",
          tags: data?.tags || "",
          status: data?.status || "",
          weight: data?.weight || "",
          is_specification: isSpecification || "",
          seo_title: data?.seo_title || "",
          seo_description: data?.seo_description || "",
          top_product: topProduct === false ? 0 : 1,
          new_arrival: newArrival === false ? 0 : 1,
          best_product: bestProduct === false ? 0 : 1,
          is_featured: featuredProduct === false ? 0 : 1,
          keys: [],
          specifications: [],
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentProductId,
                short_name: values?.short_name,
                name: values?.name,
                slug: values?.slug,
                thumb_image: imagePreview,
                category: values?.category,
                sub_category: values?.sub_category,
                child_category: values?.child_category,
                brand: values?.brand,
                quantity: values?.quantity,
                sku: values?.sku,
                price: values?.price,
                offer_price: values?.offer_price,
                short_description: values?.short_description,
                long_description: getLongDescription,
                tags: values?.tags,
                status: values?.status,
                weight: values?.weight,
                is_specification: isSpecification === false ? 0 : 1,
                seo_title: values?.seo_title,
                seo_description: values?.seo_description,
                top_product: topProduct === false ? 0 : 1,
                new_arrival: newArrival === false ? 0 : 1,
                best_product: bestProduct === false ? 0 : 1,
                is_featured: featuredProduct === false ? 0 : 1,
                keys: [...values?.keys],
                specifications: [...values?.specifications],
              })
            : onSave({
                short_name: values?.short_name,
                name: values?.name,
                slug: values?.slug,
                thumb_image: imagePreview,
                category: values?.category,
                sub_category: values?.sub_category,
                child_category: values?.child_category,
                brand: values?.brand,
                quantity: values?.quantity,
                sku: values?.sku,
                price: values?.price,
                offer_price: values?.offer_price,
                short_description: values?.short_description,
                long_description: getLongDescription,
                tags: values?.tags,
                status: values?.status,
                weight: values?.weight,
                is_specification: isSpecification === false ? 0 : 1,
                seo_title: values?.seo_title,
                seo_description: values?.seo_description,
                top_product: topProduct === false ? 0 : 1,
                new_arrival: newArrival === false ? 0 : 1,
                best_product: bestProduct === false ? 0 : 1,
                is_featured: featuredProduct === false ? 0 : 1,
                keys: [...values?.keys],
                specifications: [...values?.specifications],
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
            <label>Thumb Image</label>
            <div className="mb-2">
              <input
                accept="image/*"
                onChange={handleFileChange}
                type="file"
                name="thumb_image"
                className="form-control"
                placeholder="Thumb Image"
                onBlur={handleBlur}
                value={values.thumb_image}
              />
            </div>
            <div className={style.imageSelect}>
              <img
                className={style.imageSelect}
                src={imagePreview || "/assets/img/placeholder.jpg"}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
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
            <label>Slug</label>
            <div className="mb-2">
              <input
                type="text"
                name="slug"
                className="form-control"
                placeholder="Slug"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.slug}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.slug && touched.slug && errors.slug}
              </p>
            </div>

            <label>Category</label>
            <select
              className="form-select"
              name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category}
            >
              <option hidden>Select Category</option>
              {category?.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.category && touched.category && errors.category}
            </p>
            <label>Sub Category</label>
            <select
              className="form-select"
              name="sub_category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sub_category}
            >
              <option hidden>Select Sub Category</option>
              {subCategory?.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
            <label>Child Category</label>
            <select
              className="form-select"
              name="child_category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.child_category}
            >
              <option hidden>Select Child Category</option>
              {childCategory?.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>

            <label>Brand</label>
            <select
              className="form-select"
              name="brand"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.brand}
            >
              <option hidden>Select Child Category</option>

              {brand?.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
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
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.weight && touched.weight && errors.weight}
              </p>
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
                // tagName="long_description"
                init={{
                  height: 350,
                  menubar: false,
                  plugins: tinyMcePlugin,
                  toolbar: tinyMceToolbar,
                  content_style: tinyMceContentStyle,
                }}
              />
            </div>
            {/* <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.long_description &&
                  touched.long_description &&
                  errors.long_description}
              </p> */}
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

            <label>Status</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option hidden>Select Status</option>
              <option value={0}>Inactive</option>
              <option value={1}>Active</option>
            </select>
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

            <label>Specifications</label>
            <br />
            <div className="mb-2 switchToggle" onClick={toggleIsSpecification}>
              <input
                className="toggleInput"
                type="checkbox"
                checked={isSpecification}
              />

              <span className="sliderToggle roundToggle"></span>
            </div>
            {isSpecification && (
              <div className="flex justify-content-fs align-items-center gap-3 ease flex-direction-column">
                {inputPairs.map((pair, index) => (
                  <div
                    className="flex justify-content-fs align-items-center gap-3 ease flex-direction-row"
                    key={index}
                  >
                    <div style={{ width: "180px" }}>
                      <label>Key</label>
                      <div className="mb2">
                        <select
                          className="form-select"
                          name="keys"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.keys}
                        >
                          {keys?.map((i) => (
                            <option key={i?.id} value={i?.id}>
                              {i?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>Specification</label>
                      <div className="mb2">
                        <input
                          type="text"
                          name="specifications"
                          className="form-control"
                          placeholder="Specifications"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.specifications}
                        />
                      </div>
                    </div>
                    {index === 0 && (
                      <Button
                        name="A"
                        bg="#dc395f"
                        type="button"
                        color="#fff"
                        onClick={addInputPair}
                      />
                    )}
                    {index !== 0 && (
                      <Button
                        border="1px solid red"
                        color="red"
                        name="D"
                        onClick={() => removeInputPair(index)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
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
