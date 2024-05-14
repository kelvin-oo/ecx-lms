"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import Image from "next/image";
// import authStyles from "@/components/css/authLayout.module.css";
// import Link from "next/link";
// import { newVerification } from "@/actions/newVerification";
// import ComponentLevelLoader from "@/components/Loader";

export default function page() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
  
    const searchParams = useSearchParams();
  
    const token = searchParams.get("token");
  
    // const onSubmit = useCallback(() => {
    //   if (success || error) return;
  
    //   if (!token) {
    //     setError("Missing token!");
    //     return;
    //   }
  
    //   newVerification(token)
    //     .then((data) => {
    //       setSuccess(data.success);
    //       setError(data.error);
    //     })
    //     .catch(() => {
    //       setError("Something went wrong!");
    //     });
    // }, [token, success, error]);
  
    // useEffect(() => {
    //   onSubmit();
    // }, [onSubmit]);
  
    return (
      <h1>hi</h1>
      )
}
