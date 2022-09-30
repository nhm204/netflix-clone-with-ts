import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { Inputs } from '../typings';


const Login = () => {
  const [ login, setLogin ] = useState<boolean>(false);
  const [ emailValue, setEmailValue ] = useState<string>('');
  const [ passwordValue, setPasswordValue ] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { signIn } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password);
    } 
  }


  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image 
        src='https://rb.gy/fafrpf' 
        layout='fill' 
        className='-z-10 !hidden opacity-60 sm:!inline' 
        objectFit='cover' 
        alt='background' 
      />
      <header style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)' }} className='fixed top-0 left-0 right-0 h-[90px]'>
        <img 
          src='https://rb.gy/ulxxee' 
          className='left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6' 
          width={160} 
          height={160} 
          alt='logo' 
        />
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='relative mt-24 space-y-8 rounded bg-black/75 py-14 px-6 md:mt-0 md:max-w-md md:px-16'>
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
          <label className='group relative inline-block w-full'>
            <span className={emailValue.length > 0 ? `absolute left-5 top-1.5 text-black text-[11px] group-focus-within:text-[#8c8c8c]` : 'hidden'}>Email</span>
            <input
              type='text'
              placeholder='Email'
              className={`input ${errors.email && 'border-b-2 border-orange-500'} ${emailValue.length > 0 && 'pt-4 bg-[#e8f0fe] text-black focus:text-white'}`}
              {...register('email', { 
                required: {
                  value: true,
                  message: 'Email is required!'
                }, 
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email.'
                }
              })}
              onChange={e => setEmailValue(e.target.value)}
            />
            { errors.email?.message && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                {errors.email?.message}
              </p>
            )}
          </label>
          <label className='group relative inline-block w-full'>
            <span className={passwordValue.length > 0 ? 'absolute left-5 top-1.5 text-black text-[11px] group-focus-within:text-[#8c8c8c]' : 'hidden'}>Password</span>
            <input
              type='password'
              placeholder='Password'
              className={`input ${errors.password && 'border-b-2 border-orange-500'} ${passwordValue.length > 0 && 'pt-4 bg-[#e8f0fe] text-black focus:text-white'}`}
              {...register('password', { 
                required: {
                  value: true, 
                  message: 'Password is required!'
                }, 
                minLength: {
                  value: 6,
                  message: 'Your password must contain between 6 and 60 characters.'
                },
                maxLength: {
                  value: 60,
                  message: 'Your password must contain between 6 and 60 characters.'
                }
              })}
              onChange={e => setPasswordValue(e.target.value)}
            />
            { errors.password?.message && (
              <p className='p-1 text-[13px] font-light  text-orange-500'>
                {errors.password?.message}
              </p>
            )}
          </label>
        </div>
        <button 
          className='w-full rounded bg-[#E50914] py-3 font-semibold hover:bg-[#F6121D]' 
          onClick={() => setLogin(true)} 
          type='submit'
        >
          Sign In
        </button>
        <div className='text-[gray]'>
          New to Netflix?{' '}
          <button 
            className='cursor-pointer text-white hover:underline' 
            onClick={() => { 
              setLogin(false); 
              router.push('/register') 
            }} 
            type='submit'
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
};

export default Login;