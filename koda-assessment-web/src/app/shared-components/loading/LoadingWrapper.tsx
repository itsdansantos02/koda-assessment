import { ReactNode } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
}

export default function LoadingWrapper({
  children,
  isLoading = true,
}: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
