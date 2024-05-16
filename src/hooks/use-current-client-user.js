import { useSession } from "next-auth/react";

export const useCurrentClientUser = () => {
  const session = useSession();

  return session.data?.user;
};
