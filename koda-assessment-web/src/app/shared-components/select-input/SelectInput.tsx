import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import SelectIconComponent from "./SelectIcon";

interface SelectInputProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  options: Array<string | { [key: string]: any }>;
  className?: string;
  color?: "default" | "primary";
  optionLabel?: string;
  optionValue?: string;
  onChange?: (value: string) => void;
  value?: any;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  disabledValue?: string | string[];
  valueClassName?: string;
  readOnly?: boolean;
  readOnlyClass?: string;
}

function SelectInput({
  id,
  name,
  label = "",
  placeholder = "Select an option",
  options,
  className = "",
  color = "default",
  optionLabel = "label",
  optionValue = "value",
  onChange,
  value = "",
  errorMessage,
  required = false,
  disabled = false,
  disabledValue,
  valueClassName = "",
  readOnly = false,
  readOnlyClass = "",
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getNestedValue = (obj: Record<string, any>, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const isOptionDisabled = (optionValue: any) => {
    if (Array.isArray(disabledValue)) {
      return disabledValue.includes(optionValue);
    }

    return optionValue === disabledValue;
  };

  if (readOnly) {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label.replace(/select/gi, "")}
          </label>
        )}

        <div
          className={`min-h-[40px] flex items-center text-sm text-gray-700 ${readOnlyClass}`}
        >
          {value || "-"}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className} flex flex-col`} >
      {label && (
        <label>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <FormControl
        error={!!errorMessage}
        disabled={disabled}
        className={className}
        variant="outlined"
        size="small"
      >
        <Select
          labelId={`${id}-label`}
          id={id}
          name={name}
          value={value || ""}
          displayEmpty
          onChange={(event) => {
            if (onChange) {
              onChange(event.target.value);
            }
          }}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          IconComponent={SelectIconComponent}
          renderValue={(selected) => {
            if (!selected) {
              return <span className="text-gray-400">{placeholder}</span>;
            }

            const selectedOption = options.find((option) => {
              const optionVal =
                typeof option === "object"
                  ? getNestedValue(option, optionValue)
                  : option;

              return optionVal === selected;
            });

            if (!selectedOption) {
              return selected;
            }

            return typeof selectedOption === "object"
              ? getNestedValue(selectedOption, optionLabel)
              : selectedOption;
          }}
          sx={{
            backgroundColor: "#fff",

            borderRadius: "6px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: color === "primary" ? "#3b82f6" : "#d1d5db",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: color === "primary" ? "#2563eb" : "#9ca3af",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: color === "primary" ? "#2563eb" : "#6b7280",
              borderWidth: "1px",
            },

            "& .MuiSelect-select": {
              minHeight: "40px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              padding: "8px 40px 8px 14px",
            },

            "& .MuiSelect-icon": {
              right: "10px",
            },

            "&.Mui-disabled": {
              backgroundColor: "#f3f4f6",
            },

            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e5e7eb",
            },
          }}
          className={valueClassName}
        >
          {options?.map((option, index) => {
            const optionLabelValue =
              typeof option === "object"
                ? getNestedValue(option, optionLabel)
                : option;

            const optionValueValue =
              typeof option === "object"
                ? getNestedValue(option, optionValue)
                : option;

            return (
              <MenuItem
                key={index}
                value={optionValueValue}
                disabled={isOptionDisabled(optionValueValue)}
              >
                {optionLabelValue}
              </MenuItem>
            );
          })}
        </Select>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default SelectInput;
