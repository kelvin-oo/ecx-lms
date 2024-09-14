"use client";
import { logout } from "@/actions/auth/logout";

export const LogoutButton = ({ children }) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
