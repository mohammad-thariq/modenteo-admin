import { Breadcrumb } from "@/common/Breadcrumb";
import * as Yup from "yup";
import ProfileCard from "@/common/ProfileCard";
import { Formik, FieldArray } from "formik";
import { useQuery, useMutation } from "react-query";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { SettingsAPI } from "@/service/settings/settings";
import { useEffect, useState } from "react";

export const WebsiteSettings = () => {
  const { productActiveCategory, productActiveSubCategory } = new ManageCategoriesApi();
  const { createSettings, getSettings } = new SettingsAPI();
  const { collectionsActive, brandsActive } = new productCateoriesAPI();
  const { data: settings, refetch } = useQuery(["settings"], getSettings);
  const { data: collection } = useQuery(["collection"], collectionsActive);
  const { data: brands } = useQuery(["brands"], brandsActive);
  const { data: category } = useQuery(["category"], productActiveCategory);
  const { data: sub_category } = useQuery(["sub-category"], productActiveSubCategory);

  const schema = Yup.object({
    sections: Yup.array().of(
      Yup.object({
        enabled: Yup.boolean(),
      })
    ),
    typeSections: Yup.array().of(
      Yup.object({
        section: Yup.string().required("Section is required"),
        type: Yup.string().required("Type is required"),
        value: Yup.string().required("Value is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      })
    ),
  });

  const [sections, setSections] = useState([
    { name: "banner", label: "Banner Section" },
    { name: "discount", label: "Discount Banner Section" },
    { name: "spotlight", label: "Spotlight Section" },
    { name: "popular", label: "Popular Product Section" },
    { name: "fashion", label: "Fashion Section" },
    { name: "service", label: "Customer Service Section" },
  ]);

  const [typeSections, setTypeSections] = useState([
    { type: '', value: '', section: '', title: '', description: '' }
  ]);

  const getSectionByName = (name) => {
    return sections.find(section => section.name === name);
  };

  useEffect(() => {
    if (settings && settings?.settings && settings?.settings.length > 0) {
      let tempSection = [];
      settings?.settings.forEach((item) => {
        let sectionDetails = getSectionByName(item?.type);
        item.name = sectionDetails?.name;
        item.label = sectionDetails?.label;
        tempSection.push(item);
      });
      setSections(tempSection);
    }
    if (settings && settings?.home_settings) {
      setTypeSections(settings?.home_settings);
    }
  }, [settings, getSectionByName]);

  const { mutate: createSettingsMutate } = useMutation(createSettings, {
    onSuccess: () => {
      ToastifySuccess("Website Settings Saved Successfully");
    },
    onError: () => {
      refetch();
      ToastifyFailed("Failed to save website settings");
    },
  });

  const onSave = (values) => {
    let section = [];
    values?.sections.forEach((data, index) => {
      data.type = sections[index].name;
      section.push(data);
    });
    let data = { section: section, home_settings: values?.typeSections };
    createSettingsMutate(data);
  };

  return (
    <>
      <Breadcrumb currentPage={"Settings"} />
      <ProfileCard>
        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={{
              sections: sections.map(section => ({
                title: section?.title || "",
                description: section?.description || "",
                enabled: section?.enabled || false,
              })),
              typeSections: typeSections,
            }}
            // validationSchema={schema}
            onSubmit={(values, actions) => {
              onSave(values);
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
              setFieldValue,
              isSubmitting,
            }) => (
              <form role="form" onSubmit={handleSubmit}>
                <FieldArray name="sections">
                  {() => (
                    <>
                      {values.sections.map((section, index) => (
                        <div key={index} className="mb-3">
                          <label>{sections[index].label}</label>
                          <div className="form-check form-switch">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={`sections.${index}.enabled`}
                              onChange={(e) => setFieldValue(`sections.${index}.enabled`, e.target.checked)}
                              onBlur={handleBlur}
                              checked={section.enabled}
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
                <label>Product Listing Sections</label><br />
                <FieldArray name="typeSections">
                  {({ remove, push }) => (
                    <>
                      {values.typeSections.map((section, index) => (
                        <div key={index} className="mb-3">
                          <label>Choose After Section</label>
                          <select
                            name={`typeSections.${index}.section`}
                            value={section?.section || section?.after_section}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          >
                            <option value="" label="Select section" />
                            {sections.map((sec) => (
                              <option key={sec.name} value={sec.name} label={sec.label} />
                            ))}
                          </select>
                          {errors.typeSections?.[index]?.section && touched.typeSections?.[index]?.section && (
                            <div className="field-error">{errors.typeSections[index].section}</div>
                          )}
                          <label>Title</label>
                          <div className="mb-3">
                            <input
                              type="text"
                              name={`typeSections.${index}.title`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={section?.title}
                              className="form-control"
                              placeholder="Title"
                            />
                            {errors.typeSections?.[index]?.title && touched.typeSections?.[index]?.title && (
                              <div className="error">{errors.typeSections[index].title}</div>
                            )}
                          </div>
                          <label>Description</label>
                          <div className="mb-3">
                            <input
                              type="text"
                              name={`typeSections.${index}.description`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={section.description}
                              className="form-control"
                              placeholder="Description"
                            />
                            {errors.typeSections?.[index]?.description && touched.typeSections?.[index]?.description && (
                              <div className="error">{errors.typeSections[index].description}</div>
                            )}
                          </div>
                          <label>Choose Type</label>
                          <select
                            name={`typeSections.${index}.type`}
                            value={section.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          >
                            <option value="" label="Select type" />
                            <option value="main_category" label="Main Category" />
                            <option value="sub_category" label="Sub Category" />
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
                            {section.type === 'main_category' &&
                              category?.categories.map((item) => (
                                <option key={item.id} value={item.id} label={item.name} />
                              ))}
                            {section.type === 'collection' &&
                              collection?.collections.map((item) => (
                                <option key={item.id} value={item.id} label={item.name} />
                              ))}
                            {section.type === 'brands' &&
                              brands?.brands.map((item) => (
                                <option key={item.id} value={item.id} label={item.name} />
                              ))}
                            {section.type === 'sub_category' &&
                              sub_category?.sub_categories.map((item) => (
                                <option key={item.id} value={item.id} label={item.name} />
                              ))}
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
                        onClick={() => push({ type: '', value: '', section: '', title: '', description: '' })}
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
