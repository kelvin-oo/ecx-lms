import * as z from "zod";


const SignupSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  userName: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  track: z.string().min(1, {
    message: "Track is required",
  }),
});

export default SignupSchema;