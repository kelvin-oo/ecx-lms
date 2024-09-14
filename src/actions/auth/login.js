"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationMail } from "@/lib/mails";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/token";
import LoginSchema from "@/schemas/login";
import bcrypt from "bcryptjs";

export const login = async (body) => {
  const validatedFields = LoginSchema.safeParse(body);
  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);



  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  console.log("running 2");
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationMail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation email sent!" };
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!passwordsMatch) {
    return { error: "Wrong email or password" };
  }


  try {
    console.log("running 3");
    await signIn("credentials", {
      email,
      password,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    console.log(error);
  }

  return { success: "Login success" };
};
