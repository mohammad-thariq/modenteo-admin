/* eslint-disable @next/next/no-img-element */
import { Formik, FieldArray } from "formik";
import style from "../index.module.css";
import { Button } from "@/common/Button";
import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BaseUrls } from "../../../../../env";
import * as Yup from "yup";
import { uploadFiles } from "@/constant/fileupload";
import { tinyMceContentStyle, tinyMcePlugin, tinyMceToolbar, } from "@/constant/tableHeading";
import { InputFileUpload } from "../../common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption, colorConstantOption } from "@/constant/statusConst";

const schema = Yup.object({
  name: Yup.string().required("Name is Required"),
  short_name: Yup.string().required("Short Name is Required"),
  category: Yup.string().required("Category is Required"),
  sub_category: Yup.string().required("Sub Category is Required"),
  sku: Yup.string().required("Sku is Required"),
  short_description: Yup.string().required("Short Description is Required"),
  status: Yup.string().required("Status is Required"),
  color: Yup.string().required("Color is Required"),
  product_details: Yup.array().of(
    Yup.object().shape({
      product_quantity: Yup.number().required("Product Quantity is Required"),
      product_price: Yup.number().required("Product Price is Required"),
      product_size: Yup.string().required("Product Size is Required"),
    })
  ),
});

const editSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  short_name: Yup.string().required("Short Name is Required"),
  category: Yup.string().required("Category is Required"),
  sub_category: Yup.string().required("Sub Category is Required"),
  sku: Yup.string().required("Sku is Required"),
  short_description: Yup.string().required("Short Description is Required"),
  status: Yup.string().required("Status is Required"),
  color: Yup.string().required("Color is Required"),
});
export const ProductForm = ({ onClose, button, data, onSave, currentProductId, onUpdate, loading, category, subCategory, collection, brand,size }) => {

  const editorRef = useRef("");
  const fileInputRef = useRef(null);
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
  const [galleryPreviews, setGalleryPreviews] = useState([]);

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
  useEffect(() => {
    if (data?.gallery != null) {
      let galleryData = data?.gallery.split(',');
      setGalleryPreviews(galleryData);
    }
  }, [data])
  const getLongDescription =
    editorRef.current && editorRef.current.getContent();
  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    // Upload files and get the URLs
    const galleryURLs = await uploadFiles(e.target.files);

    // Update gallery previews with the URLs
    setGalleryPreviews((prev) => [
      ...prev,
      ...galleryURLs
    ]);
    e.target.value = null; // Clear the file input value
  };

  const handleRemoveImage = (index) => {
    setGalleryPreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      if (newPreviews.length === 0) {
        fileInputRef.current.value = null; // Reset the file input if no images left
      }
      return newPreviews;
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const galleryURLs = await uploadFiles(files);
    // Update gallery previews with the URLs
    setGalleryPreviews((prev) => [
      ...prev,
      ...galleryURLs
    ]);
    fileInputRef.current.value = null; // Clear the file input value
  };
  return (
    <div className={style.wrapper} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <Formik initialValues={{
        short_name: data?.short_name || "", name: data?.name || "", image: imagePreview, category: data?.category_id || "", sub_category: data?.sub_category_id || "", collection: data?.collection_id || "", brand: data?.brand_id || "", color: data?.color, sku: data?.sku || "", short_description: data?.short_description || "", long_description: data?.long_description || getLongDescription || "", status: data?.status + 1 || "", seo_title: data?.seo_title || "", seo_description: data?.seo_description || "", top_product: topProduct === false ? 0 : 1, new_arrival: newArrival === false ? 0 : 1, best_product: bestProduct === false ? 0 : 1, featured_product: featuredProduct === false ? 0 : 1, gallery: [], product_details: data?.product_details || [{ product_quantity: '', product_price: '', offer_price: '', product_size: '' }],
      }}
        validationSchema={currentProductId ? editSchema : schema}
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
              sku: values?.sku,
              short_description: values?.short_description,
              long_description: getLongDescription,
              status: values?.status - 1,
              color: values?.color,
              seo_title: values?.seo_title,
              seo_description: values?.seo_description,
              top_product: topProduct === false ? 0 : 1,
              new_arrival: newArrival === false ? 0 : 1,
              best_product: bestProduct === false ? 0 : 1,
              featured_product: featuredProduct === false ? 0 : 1,
              gallery: galleryPreviews,
              product_details: values?.product_details,

            })
            : onSave({
              short_name: values?.short_name,
              name: values?.name,
              image: imagePreview,
              category: values?.category,
              sub_category: values?.sub_category,
              collection: values?.collection,
              brand: values?.brand,
              sku: values?.sku,
              short_description: values?.short_description,
              long_description: getLongDescription,
              status: values?.status - 1,
              seo_title: values?.seo_title,
              color: values?.color,
              seo_description: values?.seo_description,
              top_product: topProduct === false ? 0 : 1,
              new_arrival: newArrival === false ? 0 : 1,
              best_product: bestProduct === false ? 0 : 1,
              featured_product: featuredProduct === false ? 0 : 1,
              gallery: galleryPreviews, product_details: values?.product_details,

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
            <div className="mb-3">
              <label>Product Gallery </label>
              <input ref={fileInputRef} type="file" name="gallery" className="form-control" multiple
                accept="image/jpeg, image/jpg, image/png" onChange={handleGalleryChange} />
              <div className="gallery-preview mt-2">
                {
                  galleryPreviews.map((src, index) => (
                    <div key={index} className="img-thumbnail" style={{ position: "relative", display: "inline-block" }}>
                      <img src={src} alt={`Gallery Preview ${index}`} style={{
                        maxWidth: "100px", maxHeight: "100px", margin: "5px"
                      }} />
                      <button type="button" onClick={() => handleRemoveImage(index)}
                        style={{
                          position: "absolute", top: "0", right: "0", background: "red", color: "white", border: "none", borderRadius:
                            "50%", cursor: "pointer",
                        }}>&times;</button>
                    </div>
                  ))}
              </div>
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
              <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }} > {errors.short_description && touched.short_description && errors.short_description} </p>
            </div>
            <label>Long Description</label>
            <div className="mb-2">
              <Editor apiKey={BaseUrls.TINYMCE_API_KEY} onInit={(_evt, editor) => (editorRef.current = editor)} initialValue={values?.long_description} init={{ height: 350, menubar: false, plugins: tinyMcePlugin, toolbar: tinyMceToolbar, content_style: tinyMceContentStyle, }} />
            </div>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}> {errors.long_description && touched.long_description && errors.long_description} </p>
            <label>Highlight</label>
            <div className="flex align-items-center gap-2">
              <div className="mb-2 flex align-item-center">
                <input type="checkbox" style={{ background: "#000", }} checked={topProduct} onChange={toggleTopProduct} />
                <label className="mt-2">Top Product</label>
              </div>
              <div className="mb-2 flex align-item-center">
                <input type="checkbox" checked={newArrival} onChange={toggleNewArrival} />
                <label className="mt-2">New Arrival</label>
              </div>
              <div className="mb-2 flex align-item-center">
                <input type="checkbox" checked={bestProduct} onChange={toggleBestProduct} />
                <label className="mt-2">Best Product</label>
              </div>
              <div className="mb-2 flex align-item-center">
                <input type="checkbox" checked={featuredProduct} onChange={toggleFeaturedProduct} />
                <label className="mt-2">Featured Product</label>
              </div>
            </div>
            {!currentProductId && <FieldArray name="product_details">
              {({ insert, remove, push }) => (
                <div className="product-details">
                  {values.product_details.length > 0 &&
                    values.product_details.map((product_detail, index) => (
                      <div key={index}>
                        <div className="row">
                          <div className="col-6">
                            <InputSelect
                              label="Size"
                              name={`product_details.${index}.product_size`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={product_detail.product_size}
                              onData={size}
                            />
                          </div>
                          <div className="col-6">
                            <label>Product Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="product quantity"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`product_details.${index}.product_quantity`}
                              value={product_detail.product_quantity}
                            />
                            <p
                              style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
                            >
                              {errors.product_details &&
                                errors.product_details[index]?.product_quantity &&
                                touched.product_details &&
                                touched.product_details[index]?.product_quantity &&
                                errors.product_details[index]?.product_quantity}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label>Product Price</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="product price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`product_details.${index}.product_price`}
                              value={product_detail.product_price}
                            />
                            <p
                              style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
                            >
                              {errors.product_details &&
                                errors.product_details[index]?.product_price &&
                                touched.product_details &&
                                touched.product_details[index]?.product_price &&
                                errors.product_details[index]?.product_price}
                            </p>
                          </div>
                          <div className="col-5">
                            <label>Offer Price</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="offer price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`product_details.${index}.offer_price`}
                              value={product_detail.offer_price}
                            />
                            <p
                              style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
                            >
                              {errors.product_details &&
                                errors.product_details[index]?.offer_price &&
                                touched.product_details &&
                                touched.product_details[index]?.offer_price &&
                                errors.product_details[index]?.offer_price}
                            </p>
                          </div>
                          <div className="col-1 d-flex align-items-center">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => remove(index)}
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "5px",
                                padding: "5px 10px",
                              }}
                            >
                              x
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => push({ product_quantity: "", product_price: "", offer_price: "" })}
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      borderRadius: "5px",
                      padding: "10px 20px",
                    }}
                  >
                    Add Product Detail
                  </button>
                </div>
              )}
            </FieldArray>}
            <InputSelect label="Status" name="status" onChange={handleChange} onBlur={handleBlur} value={values.status} isValue onData={statusConstantOption} />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}> {errors.status && touched.status && errors.status} </p>

            <label>Color</label>
            <div className="mb-2">
              <input
                type="text"
                name="color"
                className="form-control"
                placeholder="Color"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.color}
              />
            </div>
            <label>SEO Title</label>
            <div className="mb-2">
              <input type="text" name="seo_title" className="form-control" placeholder="SEO Title" onChange={handleChange} onBlur={handleBlur} value={values.seo_title} />
            </div>
            <label>SEO Description</label>
            <div className="mb-2">
              <textarea rows="4" cols="50" name="seo_description" className="form-control" placeholder="SEO Description" onChange={handleChange} onBlur={handleBlur} value={values.seo_description} />
            </div>
            <div className={style.btnWrapper}>
              <Button name="Close" border="1px solid #dc395f" color="#000" onClick={onClose} />
              <Button name={button} bg="#dc395f" type="submit" color="#fff" onClick={handleSubmit} isSubmitting={loading} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
