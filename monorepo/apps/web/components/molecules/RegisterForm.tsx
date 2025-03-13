"use client";

import { useEffect, useState } from "react";
import { signUpUser, UserData } from "../../apis/userApi";
import CustomTextField from "../atoms/CustomTextField";
import CustomButton from "../atoms/CustomButton";
import ErrorText from "../atoms/ErrorText";
import AuthPrompt from "./AuthPrompt";
import { useRouter } from 'next/navigation';
import { AppDispatch } from "@/store/store";
import { signUp } from "@/store/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { resetStatus, setError, setSuccess } from "@/store/userSlice";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.user);
  
  useEffect(()=>{
    dispatch(resetStatus());
  }, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(setError("Please fill all the fields."));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(setError("Password didn't match."));
      return;
    }

    const userData: UserData = { email, password, age, name };

    try {
      const resultAction = await dispatch(signUp(userData));
      if (signUp.fulfilled.match(resultAction)) {
        router.push('/');
        dispatch(setSuccess('Sign-up successful.'));
        
      } else if (signUp.rejected.match(resultAction)) {
        dispatch(setError('Failed to sign up.'));
      }
    } catch (error: any) {
      dispatch(setError('An unexpected error occurred.'))
    }
    dispatch(resetStatus())
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
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <CustomTextField
        label="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        type="number"
      />      
      <CustomTextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <CustomTextField
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
      />
      {error && <ErrorText message={error} />}
      <AuthPrompt promptText="Already Have An Account?" linkText="Login Here!" linkHref="/"/>
      <CustomButton type="submit">Register</CustomButton>
    </form>
  );
}
