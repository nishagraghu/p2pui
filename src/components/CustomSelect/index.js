// CustomSelect.js
import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const CustomSelect = ({ name, label, options }) => {
  const { setFieldValue, values, errors, touched, handleBlur } = useFormikContext();

  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        value={values[name]}
        label={label}
        onChange={(e) => setFieldValue(name, e.target.value)}
        onBlur={handleBlur}
        style={{ width: "100%", minHeight: "50px" }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touched[name] && errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomSelect;
