'use client';
import Link from 'next/link';
import FormBox from '@/components/auth/AuthFormbox';
import FormInput from '@/components/auth/AuthFormInput';
import AuthLayout from '@/components/auth/AuthLayout';
import authStyles from '@/components/css/authLayout.module.css';
import ComponentLevelLoader from '@/components/Loader';
import { useState } from 'react';
import Image from 'next/image';
import { register } from '@/actions/register';

export default function Register() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => !isSelected && setIsSelected(true);

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

    const { firstName, lastName, email, password, track, userName } =
      formData || {};

    if (!firstName) {
      setError('Please fill in your First Name');
      setLoading(false);
      console.log(error);
      return;
    }

    if (!lastName) {
      setError('Please fill in your last Name');
      setLoading(false);
      console.log(error);
      return;
    }
    if (!userName) {
      setError('Please choose a User Name');
      setLoading(false);
      console.log(error);
      return;
    }

    if (!track) {
      setError('Please fill choose a track');
      setLoading(false);
      console.log(error);
      return;
    }

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

    register(body)
      .then((user) => {
        if (user.success) {
          console.log(user.success);
          setSuccess(user.success);
        }
        setError(user.error);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        console.log('finally activated');
      });
  };

  return (
    <AuthLayout>
      <div className='flex justify-center'>
        <form className='w-full flex justify-center'>
          <FormBox>
            <FormInput
              variant='text'
              name='firstName'
              placeholder='Firstname'
              required
              onChange={handleChange}
            />
            <FormInput
              variant='text'
              name='lastName'
              placeholder='Lastname'
              required
              onChange={handleChange}
            />
            <FormInput
              variant='text'
              name='userName'
              placeholder='Username'
              required
              onChange={handleChange}
            />
            <FormInput
              variant='email'
              name='email'
              placeholder='Email Address'
              required
              onChange={handleChange}
            />
            <div
              className={`w-full flex border-2 border-black outline-none py-2 lg:py-3 px-2 lg:text-xl truncate bg-transparent relative col-span-2`}
            >
              <select
                onChange={handleChange}
                onClick={handleSelect}
                id='track'
                name='track'
                className={authStyles.auth__select}
              >
                <option value='Frontend development'>
                  Frontend development
                </option>
                <option value='Backend development'>Backend development</option>
                <option value='Python'>Python</option>
                <option value='Data Analytics'>Data Analytics</option>
                <option value='Data Science'>Data Science</option>
                <option value='Data Structures and Algorithms'>
                  Data Structures and Algorithms
                </option>
              </select>

              <Image
                className='absolute top-1/2 right-2 -translate-y-1/2'
                src='/icons/chevron-down-black.svg'
                alt='arrow'
                width={20}
                height={20}
              />
            </div>
            <FormInput
              variant='password'
              name='password'
              placeholder='Password'
              required
              onChange={handleChange}
            />
            <button
              onClick={handleFormSubmit}
              className={authStyles.auth__btn}
              type='submit'
            >
              {loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Sign up'}
            </button>
          </FormBox>
        </form>
      </div>
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
      <p className={authStyles.auth__info_text}>
        <span>Already have an account? </span>
        <Link href='/auth/login'>Login</Link>
      </p>
    </AuthLayout>
  );
}
