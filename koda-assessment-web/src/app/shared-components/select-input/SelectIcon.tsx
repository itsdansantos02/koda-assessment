import React, { forwardRef } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface SelectIconComponentProps {
  isOpen?: boolean;
  styles?: string[];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SelectIconComponent = forwardRef<
  HTMLDivElement,
  SelectIconComponentProps
>(({ isOpen, styles = [], className, onClick, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={`${className ?? ""} ${styles.join(" ")}`}
      onClick={onClick}
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {isOpen ? (
        <KeyboardArrowUpIcon fontSize="small" />
      ) : (
        <KeyboardArrowDownIcon fontSize="small" />
      )}
    </span>
  );
});

SelectIconComponent.displayName = "SelectIconComponent";

export default SelectIconComponent;
