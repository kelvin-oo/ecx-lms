"use client";
import Link from "next/link";
import FormBox from "@/components/auth/AuthFormbox";
import FormInput from "@/components/auth/AuthFormInput";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthSelect from "@/components/auth/AuthSelect";
import authStyles from "@/components/css/authLayout.module.css";


export default function Register() {
  return (
    <AuthLayout>
      <div className="flex justify-center">
        <form
          className="w-full flex justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
            // const registerForm = new FormData(e.target);
            // signupParticipant(registerForm);
          }}
        >
          <FormBox>
            <FormInput
              variant="text"
              name="firstname"
              placeholder="Firstname"
              required
            />
            <FormInput
              variant="text"
              name="lastname"
              placeholder="Lastname"
              required
            />
            <FormInput
              variant="text"
              name="username"
              placeholder="Username"
              required
            />
            <FormInput
              variant="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <AuthSelect
              className="col-span-2"
              title="Track"
              options={[
                "Frontend development",
                "Backend development",
                "Python",
                "Data Analytics",
                "Data Science",
                "Data Structures and Algorithms",
              ]}
            />
            <FormInput
              variant="password"
              name="password"
              placeholder="Password"
              required
            />
            <button className={authStyles.auth__btn} type="submit">
              Sign up
            </button>
          </FormBox>
        </form>
      </div>
      <p className={authStyles.auth__info_text}>
        <span>Already have an account? </span>
        <Link href="/auth/participant/login">Login</Link>
      </p>
    </AuthLayout>
  );
}
