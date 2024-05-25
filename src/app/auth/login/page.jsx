'use client';
import Link from 'next/link';
import FormBox from '@/components/auth/AuthFormbox';
import FormInput from '@/components/auth/AuthFormInput';
import AuthLayout from '@/components/auth/AuthLayout';
import authStyles from '@/components/css/authLayout.module.css';
import { login } from '@/actions/auth actions/login';
import { useState } from 'react';
import ComponentLevelLoader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password } = formData || {};

    if (!email) {
      setError('Please fill in your email!');
      setLoading(false);
      console.log(error);
      return;
    }

    if (!password) {
      setError('Please choose a password!');
      setLoading(false);
      console.log(error);
      return;
    }

    if (!isValidEmail(email || '')) {
      setError('Email is invalid');
      setLoading(false);
      console.log(error);
      return;
    }

    const body = {
      ...formData,
    };

    login(body, callbackUrl)
      .then((user) => {
        if (user.success) {
          console.log(user.success);
          setSuccess(user.success);
          router.push(callbackUrl || '/dashboard')
        }
        setError(user.error);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        console.log('hit finally');
      });
  };
  return (
    <AuthLayout>
      <div className='flex justify-center'>
        <form className='w-full flex justify-center'>
          <FormBox>
            <FormInput
              variant='email'
              name='email'
              placeholder='Email Address'
              onChange={handleChange}
            />
            <FormInput
              variant='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
            />
            <Link
              href=''
              className='w-fit ms-auto text-xs lg:text-sm transition-colors hover:text-ecx-colors-dart'
            >
              Forgot Password?
            </Link>
            <button
              type='submit'
              className={authStyles.auth__btn}
              onClick={handleFormSubmit}
            >
              {loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Login'}
            </button>
          </FormBox>
        </form>
      </div>
      <p className={authStyles.auth__info_text}>
        <span>Don&apos;t have an account? </span>
        <Link href='/auth/signup' className={authStyles.auth__link}>
          Sign up
        </Link>
      </p>
      {error && (
        <p className={authStyles.auth__info_text}>
          <span>{error}</span>
        </p>
      )}
      {success && (
        <p className={authStyles.auth__info_text}>
          <span>{success}</span>
        </p>
      )}
    </AuthLayout>
  );
}
