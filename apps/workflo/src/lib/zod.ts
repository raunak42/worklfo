
import { z } from "zod";

export const fullNameInput = z.string().min(3).max(50);
export const passwordInput = z.string().min(5).max(30);
export const emailInput = z.string().email().min(6).max(100);