import { Button, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  CustomButton: {
    background: "linear-gradient(45deg,#2980b9 30%, #3498db 90%)",
    backgroundSize: "200%",
    transition: "0.3s",
    "&:hover": {
      backgroundPosition: "right",
    },
    border: 0,
    color: "white",
    height: 40,
    padding: "0 30px",
    boxShadow: "0 0px 2px 2px #2980b9",
    borderRadius: "5px",
  },
}));
function CustomButton(props) {
  const {
    title = "",
    type = "button",
    size = "medium",
    variant = "text",
    fullWidth = false,
    css = false,
    color = "default",
  } = props;
  const classes = useStyles();
  return (
    <Button
      size={size}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      color={color}
      className={css && classes.CustomButton}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
