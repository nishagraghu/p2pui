import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types"; // Import PropTypes

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({
  open,
  handleClose,
  dialogTitle,
  dialogContent,
  agreeText,
  disagreeText,
  handleAgree,
  handleDisagree,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>{disagreeText}</Button>
        <Button onClick={handleAgree}>{agreeText}</Button>
      </DialogActions>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogContent: PropTypes.string.isRequired,
  agreeText: PropTypes.string.isRequired,
  disagreeText: PropTypes.string.isRequired,
  handleAgree: PropTypes.func.isRequired,
  handleDisagree: PropTypes.func.isRequired,
};
