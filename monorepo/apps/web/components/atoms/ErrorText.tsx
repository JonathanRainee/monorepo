import theme from "@/theme/theme";
import { Typography } from "@mui/material";

export default function ErrorText({ message }: { message: string }) {
  return (
    <Typography color="error" variant="body2" mb={2}
      sx={{
        color: theme.palette.error.main
      }}
    >
      {message}
    </Typography>
  );
}
