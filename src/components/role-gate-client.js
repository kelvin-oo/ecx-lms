"use client";

import { useCurrentRole } from "@/hooks/use-current-client-role";



export const RoleGate = ({
  children,
  allowedRole,
}) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
     <h1>You do not have permission to view this</h1>
    )
  }

  return (
    <>
      {children}
    </>
  );
};
