/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react


Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";
import apiHelper from "helpers/apiHelper";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import Header from "layouts/profile/components/Header";

export default function data() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await apiHelper.getProtected("private/users");
      setData(result.content?.users);
      // dispatchRedux(setUser(result.content?.user));
    };
    fetchData();
  }, []);
  const formatData = (info = []) => {
    return info?.map((item) => {
      return {
        name: `${item.firstName} ${item.lastName}`,
        email: item.email,
        phone: "123-456-7890",
        role: item.role,
        status: item.status,
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon style={{ cursor: "pointer", marginRight: "12px" }}>edit</Icon>
            <Icon>visibility</Icon>
          </MDTypography>
        ),
      };
    });
  };

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "User Name", accessor: "name", width: "20%", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Phone", accessor: "phone", align: "center" },
      { Header: "role", accessor: "role", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    // rows: [
    //   {
    //     project: <Project image={LogoAsana} name="Asana" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $2,500
    //       </MDTypography>
    //     ),
    //     phone: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         123-456-7890
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         working
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="info" value={60} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon style={{ cursor: "pointer", marginRight: "12px" }}>edit</Icon>
    //         <Icon>visibility</Icon>
    //       </MDTypography>
    //     ),
    //   },
    // ],
    rows: formatData(data),
  };
}
