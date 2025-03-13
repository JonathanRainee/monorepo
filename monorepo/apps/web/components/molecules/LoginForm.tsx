"use client";

import { useEffect, useState } from "react";
import CustomTextField from "../atoms/CustomTextField";
import CustomButton from "../atoms/CustomButton";
import ErrorText from "../atoms/ErrorText";
import AuthPrompt from "./AuthPrompt";
import { useRouter } from 'next/navigation';
import { LoginData } from "@/apis/userApi";
import { signIn } from "@/store/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { login, resetStatus, setError, setSuccess } from "@/store/userSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.user);


  useEffect(()=>{
    dispatch(resetStatus());
  }, [])
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetStatus());
    if (!email || !password) {
      dispatch(setError("Please fill all the fields."));
      return;
    }

    const loginData: LoginData = {email, password};

    try{
      const resultAction = await dispatch(signIn(loginData));
      if (signIn.fulfilled.match(resultAction)) {
        const response = resultAction.payload;
        dispatch(setError(""));
        dispatch(setSuccess('Sign-in successful.'));
        dispatch(
          login({
            id: response.user.uid,
            name: '',
            email: response.user.email,
            age: 0,
            token: response._tokenResponse.idToken,
          })
        );

        setTimeout(() => {
          router.push('/home');
        }, 100);
      } else if (signIn.rejected.match(resultAction)) {
        dispatch(setError('Invalid credential.'));
      }
    } catch (error: any) {
      dispatch(setError('An unexpected error occurred.'))
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomTextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <CustomTextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      {error && <ErrorText message={error} />}
      <AuthPrompt promptText="Don't Have An Account?" linkText="Register Here!" linkHref="/register"/>
      <CustomButton type="submit">Login</CustomButton>
    </form>
  );
}
