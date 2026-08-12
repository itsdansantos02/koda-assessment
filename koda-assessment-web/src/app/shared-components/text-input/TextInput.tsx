import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CrudField from "../crud/field/CrudField";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "date" | "email" | "password" | "tel";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  onChange?: (value: string | number | null) => void;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
  hasReadOnlyLabel?: boolean;
  readOnly?: boolean;
  readOnlyClass?: string;
}

function TextInput({
  label = "",
  placeholder = "",
  type = "text",
  startIcon,
  endIcon,
  id,
  name,
  className = "",
  value = "",
  onChange,
  errorMessage,
  required = false,
  disabled = false,
  min,
  max,
  step,
  readOnly = false,
  readOnlyClass = "",
  hasReadOnlyLabel = true,
}: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (readOnly) {
    return (
      <CrudField
        label={
          hasReadOnlyLabel ? `${label}${label?.length ? ":" : ""} ` : undefined
        }
        className={readOnlyClass}
      >
        {value ?? "-"}
      </CrudField>
    );
  }

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const inputValue = event.target.value;

    if (type === "tel") {
      const regex = /^[0-9+]+$/;

      if (inputValue === "" || regex.test(inputValue)) {
        onChange(inputValue);
      }

      return;
    }

    if (type === "number") {
      onChange(inputValue === "" ? null : parseFloat(inputValue));

      return;
    }

    onChange(inputValue);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <TextField
        id={id}
        name={name}
        placeholder={placeholder}
        type={inputType}
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        error={!!errorMessage}
        helperText={errorMessage || ""}
        fullWidth
        size="small"
        variant="outlined"
        className={className}
        slotProps={{
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : undefined,

            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    edge="end"
                    size="small"
                    disabled={disabled}
                  >
                    {isPasswordVisible ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : endIcon ? (
                <InputAdornment position="end">{endIcon}</InputAdornment>
              ) : undefined,

            inputProps: {
              min,
              max,
              step,
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: "6px",
            minHeight: "40px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: errorMessage ? "#ef4444" : "#d1d5db",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: errorMessage ? "#ef4444" : "#9ca3af",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: errorMessage ? "#ef4444" : "#6b7280",
              borderWidth: "1px",
            },

            "&.Mui-disabled": {
              backgroundColor: "#f3f4f6",
            },

            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e5e7eb",
            },
          },

          "& .MuiOutlinedInput-input": {
            minHeight: "40px",
            boxSizing: "border-box",
            padding: "8px 14px",
            fontSize: "0.875rem",
          },

          "& .MuiInputLabel-root": {
            fontSize: "0.875rem",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#374151",
          },

          "& .MuiFormHelperText-root": {
            marginLeft: "0px",
            marginTop: "4px",
            fontSize: "0.75rem",
          },

          "& .MuiInputAdornment-root": {
            color: "#6b7280",
          },
        }}
      />
    </div>
  );
}

export default TextInput;
