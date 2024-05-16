import bcrypt from "bcryptjs";
import LoginSchema from "./schemas/login";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./data/user";
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log(`credentials ${credentials}`)
        console.log('before schema')
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log('after schema')
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log('after schema')
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          console.log('before password match')
          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );
          console.log('after password match')
          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
}
