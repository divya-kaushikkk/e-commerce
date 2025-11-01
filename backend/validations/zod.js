import { z } from "zod";

export const userSchema = z.object({
<<<<<<< HEAD
  firstName: z.string().min(3, {message:"First name must be at least 3 characters"}),
  lastName: z.string().min(3, {message: "Last name must be at least 3 characters"}),
  email: z.email({message: "Invalid email address"}),
  password: z.string().regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character"}),
  phone: z.string().regex(/^[0-9]{10}$/, {message: "Phone must be 10 digits"}),
  address: z.string().min(5, {message: "Address must be at least 5 characters"}),
});
=======
  firstName: z.string().trim().min(3, {message:"First name must be at least 3 characters"}),
  lastName: z.string().trim().min(3, {message: "Last name must be at least 3 characters"}),
  email: z.email({message: "Invalid email address"}).trim(),
  password: z.string().trim().regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character"}),
  phone: z.string().trim().regex(/^[0-9]{10}$/, {message: "Phone must be 10 digits"}),
  address: z.string().trim().min(5, {message: "Address must be at least 5 characters"}),
});

export const loginSchema = z.object({
  email: z.email({message: "Invalid email address."}).trim(),
  password: z.string().trim().min(1,{message: "Password is required."}),
});
>>>>>>> 9b5cf8f (Initial commit)
