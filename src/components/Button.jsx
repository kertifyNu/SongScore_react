import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  onClick,
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
}) => {
  return (
    <Button variant={variant} color={color} size={size} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
