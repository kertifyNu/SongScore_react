import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  onClick,
  children,
  variant = "contained",
  color = "primary",
  size = "large",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      sx={{
        borderRadius: "50px",
        padding: "8px 24px",
        fontFamily: "Inter, sans-serif",
        font: "16px",
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
