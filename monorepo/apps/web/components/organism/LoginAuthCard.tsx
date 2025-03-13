import { Paper } from "@mui/material";
import HeadingText from "../atoms/HeadingText";
import RegisterForm from "../molecules/RegisterForm";
import LoginForm from "../molecules/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function LoginAuthCard() {

  const user = useSelector((state: RootState) => state.user);

  if (user.loading) return <HeadingText text="Loading..."/>;

  return (
    <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
      <HeadingText text="Login" />
      <LoginForm />
    </Paper>
  );
}
