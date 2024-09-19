'use client';
import Link from 'next/link';
import FormBox from '@/components/auth/AuthFormbox';
import FormInput from '@/components/auth/AuthFormInput';
import AuthLayout from '@/components/auth/AuthLayout';
import authStyles from '@/components/css/authLayout.module.css';
import ComponentLevelLoader from '@/components/Loader';
import { useState } from 'react';
import Image from 'next/image';
import { register } from '@/actions/auth/register';
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
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
    
    setLoading(true);

    const { firstName, lastName, email, password, track, userName } =
      formData || {};

    if (!firstName) {
      toast.error("Please fill in your First Name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }

    if (!lastName) {
      toast.error("Please fill in your Last Name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }
    if (!userName) {
      toast.error("Please choose a username", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }

    if (!track) {
      toast.error("Please fill choose a track", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }

    if (!email) {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }

    if (!password) {
      toast.error("Please choose a password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }

    if (!isValidEmail(email || '')) {
      toast.error("Email is invalid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      
      return;
    }

    const body = {
      ...formData,
    };

    register(body)
      .then((user) => {
        if (user.success) {
          .log(user.success);
          toast.success(user.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        toast.error(user.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .finally(() => {
        setLoading(false);
        .log('finally activated');
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
                  choose track
                </option>
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
      <p className={authStyles.auth__info_text}>
        <span>Already have an account? </span>
        <Link href='/auth/login'>Login</Link>
      </p>
    </AuthLayout>
  );
}
