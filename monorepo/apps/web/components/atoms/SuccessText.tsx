import theme from "@/theme/theme";
import { Typography } from "@mui/material";

export default function SuccessText({ message }: { message: string | null }) {
  return (
    <Typography color="error" variant="body2" mb={2}
      sx={{
        color: theme.palette.success.main
      }}
    >
      {message}
    </Typography>
  );
}
