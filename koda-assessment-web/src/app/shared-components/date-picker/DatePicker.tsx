import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { colors } from "@mui/material";
import {
  DatePicker as BaseDatePicker,
  DateTimePicker,
  PickerDay,
  PickerDayProps,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CrudField from "../crud/field/CrudField";
import DateFormat from "../../utils/DateFormat";

interface DatePickerProps {
  label?: string;
  className?: string;
  color?: "primary" | "default";
  value?: string;
  onChange?: (T: string) => void;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  valueType?: "date" | "datetime" | "time";
  highlightDates?: (params: {
    startOfMonth: string;
    endOfMonth: string;
  }) => Promise<string[]>;
  readOnly?: boolean;
  readOnlyClass?: string;
  isAmPm?: boolean;
}

function DatePicker({
  label,
  className,
  color = "default",
  value,
  onChange,
  errorMessage,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  valueType = "date",
  highlightDates,
  readOnly = false,
  readOnlyClass = "",
  isAmPm = false,
}: DatePickerProps) {
  const styles: string[] = [];
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

  switch (color) {
    case "primary":
      styles.push("border-blue-800 text-blue-800");
      break;
    case "default":
      styles.push("border-gray-300");
      break;
    default:
      break;
  }

  const muiStyles = {
    width: "100%",
    ".MuiInputBase-input": {
      fontSize: "13px",
      padding: "0.8rem 1rem",
      color: color === "primary" && colors.orange[800],
    },
    ".MuiInputBase-root": {
      // "border": "1px solid rgb(189 189 189)",
      minHeight: "37.59px",
      background: "white",
      borderRadius: "0.6rem",
      ":hover": {
        // border: "1px solid rgb(189 189 189)",
      },
    },
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  function Day(props: PickerDayProps<Dayjs>) {
    const { day, ...other } = props;
    const isHighlighted = highlightedDates.some((highlightedDay) =>
      day.isSame(dayjs(highlightedDay), "day"),
    );

    return (
      <PickerDay
        {...other}
        day={day}
        className={`${isHighlighted ? "bg-blue-50" : ""}`}
      />
    );
  }

  const handleChangeView = async (dateValue: Dayjs) => {
    const startOfMonth = dateValue.startOf("month").format("YYYY-MM-DD");
    const endOfMonth = dateValue.endOf("month").format("YYYY-MM-DD");
    highlightDates({ startOfMonth: startOfMonth, endOfMonth: endOfMonth }).then(
      (dates) => {
        setHighlightedDates(dates.map((date) => new Date(date)));
      },
    );
  };

  const handleOpen = () => {
    const dateValue = value && dayjs(value).isValid() ? dayjs(value) : dayjs();
    handleChangeView(dateValue);
  };

  const handleClose = () => {
    setHighlightedDates([]);
  };

  if (readOnly) {
    return (
      <CrudField
        label={`${label}${label?.length ? ":" : ""} `}
        className={readOnlyClass}
      >
        {value
          ? valueType === "datetime"
            ? dayjs(value).format("DD MMM YYYY hh:mm A")
            : DateFormat(value)
          : "-"}
      </CrudField>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`w-full rounded-md
        border ${styles.join(" ")}`}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {valueType === "datetime" && (
            <DateTimePicker
              format={isAmPm ? "DD/MM/YYYY hh:mm A" : "DD/MM/YYYY HH:mm:ss"}
              value={value ? dayjs(value) : null}
              onChange={(newValue) => {
                if (onChange) {
                  onChange(newValue?.format("YYYY-MM-DD HH:mm:ss") || "");
                }
              }}
              minDate={minDate ? dayjs(minDate) : null}
              maxDate={maxDate ? dayjs(maxDate) : null}
              disabled={disabled}
              sx={muiStyles}
              slots={{
                openPickerIcon: CalendarMonthIcon,
              }}
            />
          )}

          {valueType === "date" && (
            <BaseDatePicker
              {...(highlightDates && {
                onOpen: handleOpen,
                onClose: handleClose,
                onMonthChange: handleChangeView,
                onYearChange: handleChangeView,
              })}
              format="DD/MM/YYYY"
              value={value ? dayjs(value) : null}
              onChange={(newValue) => {
                if (onChange) {
                  onChange(newValue?.format("YYYY-MM-DD") || "");
                }
              }}
              minDate={minDate ? dayjs(minDate) : null}
              maxDate={maxDate ? dayjs(maxDate) : null}
              disabled={disabled}
              sx={muiStyles}
              slots={{
                openPickerIcon: CalendarMonthIcon,
                day: Day,
              }}
            />
          )}

          {valueType === "time" && (
            <TimePicker
              format="HH:mm"
              value={value ? dayjs(value) : null}
              onChange={(newValue) => {
                if (onChange) {
                  onChange(newValue?.toString() || "");
                }
              }}
              disabled={disabled}
              sx={muiStyles}
            />
          )}
        </LocalizationProvider>
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default DatePicker;
