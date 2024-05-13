"use client";
import Link from "next/link";
import FormBox from "@/components/auth/AuthFormbox";
import FormInput from "@/components/auth/AuthFormInput";
import AuthLayout from "@/components/auth/AuthLayout";
import authStyles from "@/components/css/authLayout.module.css";


export default function Login() {
  return (
    <AuthLayout>
      <div className="flex justify-center">
        <form
          className="w-full flex justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
            // const loginForm = new FormData(e.target);
            // loginTutor(loginForm);
          }}
        >
          <FormBox>
            <FormInput
              variant="email"
              name="email"
              placeholder="Email Address"
            />
            <FormInput
              variant="password"
              name="password"
              placeholder="Password"
            />
            <Link
              href=""
              className="w-fit ms-auto text-xs lg:text-sm transition-colors hover:text-ecx-colors-dart"
            >
              Forgot Password?
            </Link>
            <button className={authStyles.auth__btn} type="submit">
              Continue
            </button>
          </FormBox>
        </form>
      </div>
      <p className={authStyles.auth__info_text}>
        <span>Don&apos;t have an account? </span>
        <Link href="/auth/register-1" className={authStyles.auth__link}>
          Register!
        </Link>
      </p>
    </AuthLayout>
  );
}
