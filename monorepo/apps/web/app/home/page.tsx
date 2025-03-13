"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import CenteredLayout from "@/components/template/CenteredLayout";
import UpdateUserCard from "@/components/organism/UpdateCard";

export default function Page() {
  return (
    <CenteredLayout>
      <UpdateUserCard/>
    </CenteredLayout>
  );
}
