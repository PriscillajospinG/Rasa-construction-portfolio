"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import RasaLogo from "@/components/ui/Logo";
import { company } from "@/data/company";

const MIN_DURATION = 2600; // ms — feel intentional, not instant
const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return <>{children}</>;
}
