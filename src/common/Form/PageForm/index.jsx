import { Button } from "@/common/Button";
import style from "../ManageWebsiteForm/index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  tinyMceContentStyle,
  tinyMcePlugin,
  tinyMceToolbar,
} from "@/constant/tableHeading";
import { InputSelect } from "../common/inputSelect";
import { pageTypeConstantOption, statusConstantOption } from "@/constant/statusConst";
import { BaseUrls } from "../../../../env";
export const PageForm = ({
  onSave,
  onClose,
  currentPagesId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const editorRef = useRef("");
  const schema = Yup.object({
    title: Yup.string().required("Title is Required"),
    // content: Yup.string().required("Description is Required"),
    status: Yup.string().required("Status is Required"),
    // page_type:Yup.string().required("Page Type is Required"),

  });

  const getContent =
    editorRef.current && editorRef.current.getContent();
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          title: data?.title,
          content: data?.content || getContent || "",

          status: data?.status + 1 || "",
          page_type: data?.page_type || ""
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (!getContent) {
            actions.setFieldError(
              "content",
              "Content is required"
            );
            return;
          }
          onUpdate
            ? onUpdate({
              id: currentPagesId,
              title: values?.title,
              content: getContent,
              status: values?.status - 1,
              page_type: values?.page_type
            })
            : onSave({
              title: values?.title,
              content: getContent,
              status: values?.status - 1,
              page_type: values?.page_type

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
            <label>Title</label>
            <div className="mb-3">
              <input
                type="name"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <label>Description</label>
            <div className="mb-2">
              <Editor
                apiKey={BaseUrls.TINYMCE_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={values?.content}
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
              {errors.content &&
                touched.content &&
                errors.content}
            </p>
            <InputSelect
              label={"Page Type"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"page_type"}
              values={values?.page_type}
              isValue
              onData={pageTypeConstantOption}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.page_type && touched.page_type && errors.page_type}
            </p>
            <InputSelect
              label={"Status"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"status"}
              values={values?.status}
              isValue
              onData={statusConstantOption}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.status && touched.status && errors.status}
            </p>
            <div className={style.btnWrapper}>
              <Button
                name="Close"
                border="1px solid #dc395f"
                color="#000"
                onClick={() => onClose()}
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
