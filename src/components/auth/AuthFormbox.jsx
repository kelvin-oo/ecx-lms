import React from "react";

const AuthFormBox = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-4 border-2 border-black py-8 px-4 w-full max-w-[37.5rem]">
      {children}
    </div>
  );
};

export default AuthFormBox;
