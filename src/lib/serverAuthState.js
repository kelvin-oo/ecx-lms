import { auth } from "@/auth";

export const currentServerUser = async () => {
  const session = await auth();

  return session?.user;
};


export const currentServerRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
