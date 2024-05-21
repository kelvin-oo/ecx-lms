

import { currentServerRole } from "@/lib/serverAuthState";

import { notFound } from "next/navigation";

export const RoleGate = async ({
  children,
  allowedRole,
}) => {
  const role = await currentServerRole();

  if (role !== allowedRole) {
    return notFound()
  }

  return (
    <>
      {children}
    </>
  );
};
