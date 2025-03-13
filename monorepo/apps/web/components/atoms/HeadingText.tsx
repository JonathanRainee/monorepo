import { Typography } from "@mui/material";

export default function HeadingText({ text }: { text: string }) {
  return (
    <Typography variant="h5" mb={2} textAlign="center">
      {text}
    </Typography>
  );
}
