import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types"; // Import PropTypes
import Icon from "@mui/material/Icon";
import styled from "@emotion/styled"; // Import styled from @emotion/styled
import CustomDialog from "components/CustomDialog";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #000; // Custom indicator color
  }
`;

const CustomTab = styled(Tab)`
  &.Mui-selected {
    color: white !important; // Custom selected tab color
    background-color: #3e82e8; // Custom selected tab background color
  }
`;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function SoftUITabs({ tabs = [] }) {
  const [value, setValue] = React.useState(0);
  const [selectRequested, setSelectRequested] = React.useState(0);
  const [unsavedChanges, setUnsavedChanges] = React.useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setSelectRequested(newValue);
    setUnsavedChanges(true);
  };

  const handleAgree = () => {
    setValue(selectRequested);
    setUnsavedChanges(false);
  };

  const handleDisagree = () => {
    setUnsavedChanges(false);
  };
  const displayLabel = (label) => {
    if (isSmallScreen) {
      return "";
    }
    return label;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CustomTabs
          value={value}
          onChange={handleChange}
          indicatorColor="inherit"
          textColor="dark"
          variant="fullWidth"
          aria-label="icon label tabs example"
        >
          {tabs.map((tab, index) => (
            <CustomTab key={index} label={displayLabel(tab.label)} icon={tab.icon} />
          ))}
        </CustomTabs>
      </Box>
      <CustomDialog
        open={unsavedChanges}
        buttonText="Show Alert"
        dialogTitle="There is unsaved changes"
        dialogContent="Are you sure you want to leave this page?"
        agreeText="Agree"
        disagreeText="Disagree"
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
      />
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

SoftUITabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default SoftUITabs;
