import React from "react";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

import Status from "../status/Status";

interface Breadcrumb {
  name: string;
  path: string;
}

interface PanelHeaderProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
  status?: string;
}

function PanelHeader({
  breadcrumbs,
  title,
  children,
  headerContent,
  status,
}: PanelHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          px: 2.5,
          py: 1.25,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {/* BREADCRUMBS */}
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" color="action" />}
          >
            {breadcrumbs.map(({ name, path }, index) => (
              <Link
                key={index}
                to={path}
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    textDecorationColor: "transparent",
                  }}
                >
                  {name}
                </span>
              </Link>
            ))}
          </Breadcrumbs>

          {/* TITLE + STATUS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              {title}
            </Box>

            {status && <Status label={status} />}
          </Box>
        </Box>

        {/* HEADER CONTENT */}
        {headerContent && <Box>{headerContent}</Box>}
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default PanelHeader;
