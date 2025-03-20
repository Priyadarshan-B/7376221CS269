import React from "react";
import { Button } from "@heroui/button";

const CustomButton = ({
  as,
  href,
  type,
  target = "_blank",
  rel = "noopener noreferrer",
  color = "primary",
  size = "md",
  variant = "flat",
  className = "w-full sm:w-auto",
  onClick,
  isLoading = false,
  children = "Button",
  disabled,
  // dataaos,
}) => {
  return (
    <Button
      as={as}
      href={href}
      type={type}
      target={target}
      rel={rel}
      size={size}
      color={color}
      className={className}
      variant={variant}
      isLoading={isLoading}
      onPress={onClick}
      disabled={disabled}
      // data-aos={dataaos}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
