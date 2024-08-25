import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { useFormikContext } from "formik";
import * as Yup from "yup";
import CustomSelect from "components/CustomSelect";
import {
  setOnlyActive,
  setAddUser,
  setUnsavedChanges,
} from "../../../redux/features/management/managementSlice";
import { useSelector, useDispatch } from "react-redux";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
});
const AddEditUser = ({ initialValues, onSubmit }) => {
  const [age, setAge] = React.useState("");
  const dispatch = useDispatch(); // Move useDispatch inside the component body

  const onCancel = () => {
    dispatch(setAddUser(false));
    dispatch(setUnsavedChanges(false));
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Grid container>
      <Grid item xs={12} ml={3}>
        <Card>
          <MDBox
            display="flex"
            alignItems="center"
            pt={3}
            pb={1}
            px={2}
            justifyContent="space-between"
          >
            <MDBox display="flex" alignItems="center">
              <MDTypography variant="button" fontWeight="regular" color="text" ml={2}>
                ADD NEW USER
              </MDTypography>
            </MDBox>
          </MDBox>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
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
                <MDBox mb={2} ml={2} display="flex" justifyContent="space-between">
                  <MDBox flex={1} mr={1}>
                    <Field name="firstName">
                      {({ field }) => (
                        <MDInput
                          type="text"
                          label="First Name"
                          {...field}
                          fullWidth
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      )}
                    </Field>
                  </MDBox>
                  <MDBox flex={1} ml={2} mr={2}>
                    <Field name="lastName">
                      {({ field }) => (
                        <MDInput
                          type="text"
                          label="Last Name"
                          {...field}
                          fullWidth
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      )}
                    </Field>
                  </MDBox>
                </MDBox>
                <MDBox mb={2} ml={2} mr={2}>
                  <Field name="email">
                    {({ field }) => (
                      <MDInput
                        type="text"
                        label="Email"
                        {...field}
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    )}
                  </Field>
                </MDBox>
                {/* role drop dowm */}
                <MDBox mb={2} ml={2} mr={2}>
                  <CustomSelect
                    name="role"
                    label="Role"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "superAdmin", label: "SuperAdmin" },
                    ]}
                  />
                </MDBox>

                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    style={{ float: "right", marginRight: "20px", marginBottom: "20px" }}
                    onClick={handleSubmit}
                  >
                    submit
                  </MDButton>
                  <MDButton
                    variant="gradient"
                    color="error"
                    style={{ float: "right", marginRight: "20px", marginBottom: "20px" }}
                    onClick={onCancel}
                  >
                    cancel
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};
AddEditUser.defaultProps = {
  initialValues: {
    name: "",
    email: "",
    role: "",
    status: "",
  },
};
AddEditUser.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
export default AddEditUser;
