import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode, useState } from "react";
import Button from "../button/Button";

type ButtonColor = "primary" | "secondary" | "default" | "danger";

interface ModalConfirmationProps {
  title: ReactNode;
  children: ReactNode;
  confirmText?: string;
  confirmColor?: ButtonColor;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  onSecondaryAction?: () => void;
  secondaryText?: string;
  secondaryColor?: ButtonColor;
  buttonContent?: ReactNode;
}

function ModalConfirmation({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  confirmColor = "primary",
  onSecondaryAction = null,
  secondaryText = null,
  secondaryColor = "primary",
  buttonContent = null,
}: ModalConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    const result = onConfirm();

    if (result && typeof (result as Promise<void>).then === "function") {
      setIsLoading(true);

      try {
        await result;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={true}
      onClose={isLoading ? undefined : onCancel}
      aria-labelledby="alert-dialog-title"
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            padding: 2,
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ color: "#000" }}>
        {title}
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions className="p-24 flex justify-between items-center overflow-y-auto w-full">
        {buttonContent && <div>{buttonContent}</div>}

        <div className="flex gap-4 justify-between w-full">
          <Button
            onClick={onCancel}
            label="Cancel"
            variant="contained"
            disabled={isLoading}
          />

          <div className="flex gap-4">
            {onSecondaryAction && secondaryText && secondaryColor && (
              <Button
                onClick={onSecondaryAction}
                color={secondaryColor}
                label={secondaryText}
                variant="outlined"
                disabled={isLoading}
              />
            )}

            <Button
              onClick={handleConfirm}
              color={confirmColor}
              label={confirmText}
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            />
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default ModalConfirmation;
