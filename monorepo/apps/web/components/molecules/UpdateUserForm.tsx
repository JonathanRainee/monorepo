"use client";

import { useEffect, useState } from "react";
import { UserData } from "../../apis/userApi";
import CustomTextField from "../atoms/CustomTextField";
import CustomButton from "../atoms/CustomButton";
import ErrorText from "../atoms/ErrorText";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUser, updateUser } from "@/store/action";
import { setError, setSuccess } from "@/store/userSlice";
import SuccessText from "../atoms/SuccessText";

export default function UpdateUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const { loading, error, successMessage } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user && !user.loading) {
      setEmail(user.email || "");
      setName(user.name || "");
      setAge(user.age || 0);
    }
  }, [user]);

  const updateUserData = async (userId: string, userData: Partial<UserData>, token: string) => {
    if (!email.trim() || !name.trim() || age < 0) {
      dispatch(setError('Please fill all the fields.'));
      return;
    }

    try {
      const resultAction = await dispatch(updateUser({userId: userId, userData: userData, token: token}));
      if (updateUser.fulfilled.match(resultAction)) {
        dispatch(setSuccess('Update successful.'));
      } else if (updateUser.rejected.match(resultAction)) {
        dispatch(setError('Failed to update user data.'));
      }
    } catch (error) {
      dispatch(setError('An unexpected error occurred.'));
    }
  }

  const getUserData = async () => {
    try {
      const resultAction = await dispatch(fetchUser({ userId: user.id, token: user.token }));
      if (fetchUser.fulfilled.match(resultAction)) {
        const userData = resultAction.payload;
        setEmail(userData.email);
        setName(userData.name);
        setAge(userData.age);
        
        dispatch(setSuccess('Fetch successful.'));
      } else if (fetchUser.rejected.match(resultAction)) {
        dispatch(setError('Failed to fetch user data.'));
      }
    } catch (error) {
      dispatch(setError('An unexpected error occurred.'));
    }
  }

  return (
    <form>
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
      
      {/* Display error message if there's an error */}
      {error && <ErrorText message={error} />}

      {/* Display success message when there's a success */}
      {successMessage && <SuccessText message={successMessage} />}

      <CustomButton onClick={getUserData} type="button">Fetch</CustomButton>
      <CustomButton onClick={async (e) => {
        e.preventDefault(); 
        await updateUserData(user.id, { email, name, age }, user.token);
      }} type="button">Update</CustomButton>
    </form>
  );
}
