"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import authStyles from "@/components/css/authLayout.module.css";
import Link from "next/link";
import { newVerification } from "@/actions/auth actions/newVerification";
import ComponentLevelLoader from "@/components/Loader";

export default function NewVerification() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
  
    const searchParams = useSearchParams();
  

    const token = searchParams.get("token");
  
    const onSubmit = useCallback(() => {
      if (success || error) return;



  
      if (!token) {
        setError("Missing token!");
        return;
      }
  
      newVerification(token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    }, [token, success, error]);
  
    useEffect(() => {
      onSubmit();
    }, [onSubmit]);
  
    return (
      <>
        <header className="h-16 md:h-20 lg:h-24 p-4 lg:p-8 top-0 z-10 w-full bg-ecx-colors-secondary-blue flex flex-col items-center justify-center">
          <Image
            src="/ecx-logo-text-white.svg"
            className="scale-90 lg:scale-100"
            alt="logo"
            width={175}
            height={34}
          />
        </header>
  
        <main className="px-4">
          <Image
            className="fixed top-24 left-10 md:w-[100px] md:top-40 lg:w-[150px] xl:w-[225px] lg:top-96"
            src="/icons/vector-dart.svg"
            alt="logo"
            width={65}
            height={64}
          />
  
          <div className="flex flex-col items-center gap-8 mt-24 lg:mt-32">
            {!success && !error && (
              <h1 className={authStyles.auth__title}>
                Confirming Verification....
              </h1>
            )}
            {success && <h1 className={authStyles.auth__title}>{success}</h1>}
            {error && <h1 className={authStyles.auth__title}>{error}</h1>}
            {!success && !error && <ComponentLevelLoader />}
            <Link
              href="/auth/login"
              className="border-[3px] border-ecx-colors-secondary-blue text-ecx-colors-secondary-blue p-2"
            >
              <h6>Go to Login</h6>
            </Link>
          </div>
  
          <Image
            className="fixed bottom-16 right-10 -rotate-90 lg:w-[100px] lg:rotate-0"
            src="/icons/vector-swift.svg"
            alt="logo"
            width={70}
            height={50}
          />
        </main>
      </>
      )
}
