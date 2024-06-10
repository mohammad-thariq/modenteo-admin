import { Breadcrumb } from "@/common/Breadcrumb";
import * as Yup from "yup";
import ProfileCard from "@/common/ProfileCard";
import { Formik } from "formik";
import { ProfileApi } from "@/service/profile/profileAPI";
import { useQuery } from "react-query";

export const Profile = () => {

  const {profile} = new ProfileApi()
  const {data, isLoading} = useQuery(['profile'], profile)
  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Please Enter valid email")
      .required("Email is Required"),
  });

console.log(data, 'profile');
  return (
    <>
      <Breadcrumb currentPage={"Profile"} />
      <ProfileCard Name={data?.data?.name}  Title={data?.data?.email} >
        <div className="card-body ">
          <Formik
            initialValues={{
              email: data?.data?.email || "",
              name: data?.data?.name || "",
            }}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              handleLogin({
                name: values.name,
                email: values.email,
                password: values.password,
                rememberMe: rememberMe,
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
              isSubmitting,
            }) => (
              <form role="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Avatar</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                  />
                </div>
                <label>Name</label>
                <div className="mb-3">
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <label>Email</label>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <label>Password</label>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                  />
                </div>
                <label>Confirm Password</label>
                <div className="mb-3">
                  <input
                    type="email"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="form-control"
                    placeholder="Condirm Password"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn bg-gradient-info w-100 mt-4 mb-0"
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
