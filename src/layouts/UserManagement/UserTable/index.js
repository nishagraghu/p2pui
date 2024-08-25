import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import projectsTableData from "layouts/tables/data/projectsTableData";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search"; // Import the Search icon
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import { useMediaQuery } from "@mui/material";
import UserInfo from "../UserInfo";
import {
  setOnlyActive,
  setAddUser,
  setUnsavedChanges,
} from "../../../redux/features/management/managementSlice";
import { useSelector, useDispatch } from "react-redux";
import AddEditUser from "../AddEditUser";

const UserTable = () => {
  const { columns, rows } = projectsTableData();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [followsMe, setFollowsMe] = React.useState(true);
  const dispatch = useDispatch();
  const { onlyActive, addUser } = useSelector((state) => state.management);
  const updateOnlyActive = (value) => dispatch(setOnlyActive(value));
  const addnewUser = () => {
    dispatch(setAddUser(true));
    dispatch(setUnsavedChanges(true));
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
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
              <MDBox mt={0.5}>
                <Switch checked={onlyActive} onChange={() => updateOnlyActive(!onlyActive)} />
              </MDBox>
              {!isSmallScreen && (
                <MDTypography variant="button" fontWeight="regular" color="text" ml={2}>
                  INCLUDE ONLY ACTIVE
                </MDTypography>
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
              <MDButton color="dark" onClick={addnewUser}>
                <Icon>add</Icon> NEW USER
              </MDButton>
            </MDBox>
            {!isSmallScreen && (
              <MDBox ml="auto">
                <TextField
                  fullWidth
                  placeholder="Search user"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </MDBox>
            )}
          </MDBox>
          {isSmallScreen && (
            <MDBox mt={0.5}>
              <TextField
                fullWidth
                placeholder="Search user"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </MDBox>
          )}
        </Card>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {addUser && (
              <AddEditUser
                onSubmit={(values) => {
                  console.log(values);
                }}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  role: "user",
                }}
              />
            )}
            <UserInfo name="John Doe" role="User" email="dd@gmail.com" vat="12345678" />
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>dd</Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
};

export default UserTable;
