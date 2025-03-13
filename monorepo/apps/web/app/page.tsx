"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import CenteredLayout from "@/components/template/CenteredLayout";
import LoginAuthCard from "@/components/organism/LoginAuthCard";

export default function Home() {

  return (
      <CenteredLayout>
        <LoginAuthCard/>
      </CenteredLayout>
  );
}
