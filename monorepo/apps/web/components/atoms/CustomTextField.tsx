import { TextField, TextFieldProps } from "@mui/material";

export default function CustomTextField(props: TextFieldProps) {
  return <TextField fullWidth variant="outlined" margin="normal" {...props} 
    sx={{
      '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
      WebkitTextFillColor: 'black',
      fontFamily: 'roboto',
      fontSize: '16px'
    },
    }}
  />;
}
