import { Paper } from "@mui/material";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store/store";
import HeadingText from "../atoms/HeadingText";
import UpdateUserForm from "../molecules/UpdateUserForm";

export default function UpdateUserCard() {

  const user = useSelector((state: RootState) => state.user);
  
  if (user.loading) return <HeadingText text="Loading..."/>;

  return (
    <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
      <HeadingText text="User Data" />
      <UpdateUserForm />
    </Paper>
  );
}
