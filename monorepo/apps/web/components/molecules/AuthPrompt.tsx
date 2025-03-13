import Typography from "@mui/material/Typography";
import CustomLink from "../atoms/CustomLink";

interface AuthPromptProps {promptText: string; linkText: string; linkHref: string;}

export default function AuthPrompt({ promptText, linkText, linkHref }: AuthPromptProps) {
  return (
    <Typography variant="body2" mt={2} textAlign="center">
      {promptText} <CustomLink href={linkHref}>{linkText}</CustomLink>
    </Typography>
  );
}
