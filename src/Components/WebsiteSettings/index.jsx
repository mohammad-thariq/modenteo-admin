import { Breadcrumb } from "@/common/Breadcrumb";
import * as Yup from "yup";
import ProfileCard from "@/common/ProfileCard";
import { Formik, FieldArray } from "formik";
import { ProfileApi } from "@/service/profile/profileAPI";
import { useQuery } from "react-query";

export const WebsiteSettings = () => {
  const { profile } = new ProfileApi();
  const { data, isLoading } = useQuery(['profile'], profile);

  const schema = Yup.object({
    field: Yup.string().required("Field is required"),
    sections: Yup.array().of(
      Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        toggle: Yup.boolean(),
      })
    ),
    typeSections: Yup.array().of(
      Yup.object({
        section: Yup.string().required("Section is required"),
        type: Yup.string().required("Type is required"),
        value: Yup.string().required("Value is required"),
      })
    ),
  });

  const sections = [
    { name: "bannerToggle", label: "Banner Section" },
    { name: "discountToggle", label: "Discount Banner Section" },
    { name: "spotlightToggle", label: "Spotlight Section" },
    { name: "popularToggle", label: "Popular Product Section" },
    { name: "fashionToggle", label: "Fashion Section" },
    { name: "serviceToggle", label: "Customer Service Section" },
  ];

  return (
    <>
      <Breadcrumb currentPage={"Settings"} />
      <ProfileCard Name={data?.data?.name} Title={data?.data?.email} >
        <div className="card-body">
          <Formik
            initialValues={{
              sections: sections.map(section => ({
                title: '',
                description: '',
                toggle: false,
              })),
              typeSections: [{ type: '', value: '', section: '' }],
            }}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              // handle submission
              console.log('Submitted values:', values);
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form role="form" onSubmit={handleSubmit}>
                <FieldArray name="sections">
                  {({ push }) => (
                    <>
                      {values.sections.map((section, index) => (
                        <div key={index} className="mb-3">
                          <label>{sections[index].label}</label>
                          <div className="form-check form-switch">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={`sections.${index}.toggle`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              checked={section.toggle}
                            />
                            <label className="form-check-label">Yes/No</label>
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              name={`sections.${index}.title`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={section.title}
                              className="form-control"
                              placeholder="Title"
                            />
                            {errors.sections?.[index]?.title && touched.sections?.[index]?.title && (
                              <div className="error">{errors.sections[index].title}</div>
                            )}
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              name={`sections.${index}.description`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={section.description}
                              className="form-control"
                              placeholder="Description"
                            />
                            {errors.sections?.[index]?.description && touched.sections?.[index]?.description && (
                              <div className="error">{errors.sections[index].description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
                <label>Product Listing Sections</label><br/>

                <FieldArray name="typeSections">
                  {({ insert, remove, push }) => (
                    <>
                      {values.typeSections.map((section, index) => (
                        <div key={index} className="mb-3">
                          <label>Choose After Section</label>
                          <select
                            name={`typeSections.${index}.section`}
                            value={section.section}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          >
                            <option value="" label="Select section" />
                            <option value="banner" label="Banner Section" />
                            <option value="discount" label="Discount Section" />
                            <option value="spotlight" label="Spotlight Section" />
                            <option value="popular" label="Popular Section" />
                            <option value="fashion" label="Fashion Section" />
                            <option value="customservice" label="Customer Section" />
                          </select>
                          {errors.typeSections?.[index]?.section && touched.typeSections?.[index]?.section && (
                            <div className="field-error">{errors.typeSections[index].section}</div>
                          )}
                          <label>Choose Type</label>
                          <select
                            name={`typeSections.${index}.type`}
                            value={section.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          >
                            <option value="" label="Select type" />
                            <option value="main category" label="Main Category" />
                            <option value="sub category" label="Sub Category" />
                            <option value="collection" label="Collection" />
                            <option value="brands" label="Brands" />
                          </select>
                          {errors.typeSections?.[index]?.type && touched.typeSections?.[index]?.type && (
                            <div className="field-error">{errors.typeSections[index].type}</div>
                          )}
                          <label>Choose Type Value</label>
                          <select
                            name={`typeSections.${index}.value`}
                            value={section.value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          >
                            <option value="" label="Select value" />
                            {/* Add options for values based on the chosen type */}
                          </select>
                          {errors.typeSections?.[index]?.value && touched.typeSections?.[index]?.value && (
                            <div className="field-error">{errors.typeSections[index].value}</div>
                          )}
                          <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => push({ type: '', value: '', section: '' })}
                      >
                        Add Section
                      </button>
                    </>
                  )}
                </FieldArray>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn bg-gradient-info w-100 mt-4 mb-0"
                    disabled={isSubmitting}
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </Formik>

        </div>
      </ProfileCard>
    </>
  );
};
