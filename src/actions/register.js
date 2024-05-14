"use server";
// import { sendMail } from "@/lib/nMailer";
// import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import SignupSchema from "@/schemas/register";
import { getUserByEmail } from "@/data/user";
import { getUserByUsername } from "@/data/user";
import { sendVerificationMail } from "@/lib/mails";
// import { generateVerificationToken } from "@/lib/tokens";
import { generateVerificationToken } from "@/lib/token";

export const register = async (values) => {
  
  console.log(values);
  const result = SignupSchema.safeParse(values);
  console.log(result);
  if (!result.success) {
    return { error: "Invalid fields!" };
  }
  const { firstName, lastName, email, password, track, userName } =
    result.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const existingUserName = await getUserByUsername(userName);
  if (existingUserName) {
    return { error: "Username already in use!" };
  }

  await db.user.create({
    data: {
      firstName,
      lastName,
      userName,
      email,
      track,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationMail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
