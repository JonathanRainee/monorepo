import Link from "next/link";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";

export default function CustomLink({ href, children, noUnderline = true }: { href: string; children: React.ReactNode,  noUnderline?: boolean; }) {

    const router = useRouter();

  return (
    <Link
        href={href}
        style={{
        color: "#1976d2",
        textDecoration: noUnderline ? "none" : "underline",
        paddingBottom: "10px",
        }}>
        {children}
    </Link>
  );
}
