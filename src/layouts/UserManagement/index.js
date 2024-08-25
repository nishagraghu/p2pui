import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AlertDialogSlide from "components/AlertDialogSlide";
import SoftUITabs from "components/SoftUITabs";

import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDBox from "components/MDBox";
import projectsTableData from "layouts/tables/data/projectsTableData";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import useAuth from "../../hooks/useAuth";
import Icon from "@mui/material/Icon";
import UserTable from "./UserTable";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const UserManagement = () => {
  const tabs = [
    {
      label: "User Managment",
      component: <UserTable />,
      icon: <Icon fontSize="small">people</Icon>,
    },
    {
      label: "Device Managment",
      component: <div>Item Two</div>,
      icon: <Icon fontSize="small">devices</Icon>,
    },
    {
      label: "payment Managment",
      component: <div>Item Three</div>,
      icon: <Icon fontSize="small">payment</Icon>,
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <SoftUITabs tabs={tabs} />
      </MDBox>
    </DashboardLayout>
  );
};

export default UserManagement;
