import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Control, Controller, useForm } from "react-hook-form";

import TextInput from "../text-input/TextInput";

interface PanelFilterProps {
  children?: React.ReactNode;
  onSearch?: (s: string) => void;
  control?: Control<any>;
  controlName?: string;
  className?: string;
  disabled?: boolean;
}

function PanelFilter({
  children,
  onSearch,
  control,
  controlName = "search",
  className = "",
  disabled = false,
}: PanelFilterProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { control: ctrl } = useForm({});

  const handleChange = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch?.(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      {/* SEARCH */}
      <div
        style={{
          width: "300px",
          flexShrink: 0,
        }}
      >
        <Controller
          name={controlName}
          control={control || ctrl}
          render={({ field }) => (
            <TextInput
              value={field.value ?? ""}
              placeholder="Search"
              startIcon={<SearchIcon sx={{ fontSize: 20 }} />}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              name={controlName}
              id={controlName}
              disabled={disabled}
            />
          )}
        />
      </div>

      {/* OTHER FILTERS */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PanelFilter;
