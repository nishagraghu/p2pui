/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react


Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import apiHelper from "~/helpers/apiHelper";
import apiHelper, { setAuthToken } from "../../../helpers/apiHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const data = await apiHelper.post("auth/login", values);
                const { tokens, user } = data.content;
                console.log("data", tokens);
                localStorage.setItem("token", tokens.accessToken.token);
                localStorage.setItem("refreshToken", tokens.refreshToken.token);
                localStorage.setItem("user", JSON.stringify(user));
                // // setAuthToken(token);
                toast("logged in successfully", { type: "success" });
                const token = localStorage.getItem("token");
                if (user.id) {
                  // get token  from  localStorage
                  setAuthToken(tokens.accessToken);
                  navigate("/dashboard");
                }
              } catch (error) {
                toast("user does not exist", { type: "error" });
              } finally {
                setSubmitting(false);
              }
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
              <MDBox component="form" role="form" onSubmit={handleSubmit}>
                <MDBox mb={2}>
                  {/* <MDInput type="email" label="Email" value={values.email} fullWidth /> */}
                  <Field name="email">
                    {({ field }) => (
                      <MDInput
                        type="email"
                        label="Email"
                        {...field}
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    )}
                  </Field>
                </MDBox>
                <MDBox mb={2}>
                  <Field name="password">
                    {({ field }) => (
                      <MDInput
                        type="password"
                        label="Password"
                        {...field}
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    )}
                  </Field>
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                    sign in
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
