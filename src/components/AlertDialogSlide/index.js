import React from "react";
import MDButton from "components/MDButton";
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

export default function AlertDialogSlide({
  buttonText = "Open Dialog",
  dialogTitle = "Dialog Title",
  dialogContent = "Dialog Content",
  agreeText = "Agree",
  disagreeText = "Disagree",
  onAgree,
  onDisagree,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    if (onAgree) onAgree();
    handleClose();
  };

  const handleDisagree = () => {
    if (onDisagree) onDisagree();
    handleClose();
  };

  return (
    <React.Fragment>
      <MDButton onClick={handleClickOpen} color="primary">
        {buttonText}
      </MDButton>
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
    </React.Fragment>
  );
}

AlertDialogSlide.propTypes = {
  buttonText: PropTypes.string,
  dialogTitle: PropTypes.string,
  dialogContent: PropTypes.string,
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func,
};
