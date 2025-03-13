import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function CenteredLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      {children}
    </Box>
  );
}
