import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Inputs } from '../typings';
import { BsChevronRight } from "react-icons/bs";


interface emailInput {
  email: string
}

const Register = () => {
  const [ emailValue, setEmailValue ] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<emailInput> = (data) => {
    if (emailValue) {
      localStorage.setItem('email', data.email);
    }
  }

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black items-center justify-center md:bg-transparent' style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0, transparent 60%, rgba(0, 0, 0, 0.8))' }}>
      <Head>
        <title>Netflix Vietnam - Watch TV Shows & Movies Online</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image 
        src='https://rb.gy/fafrpf' 
        layout='fill' 
        className='-z-10 !hidden opacity-60 sm:!inline' 
        objectFit='cover' 
        alt='background' 
      />
      <header style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)' }} className='fixed top-0 left-0 right-0 h-[100px]' >
        <img 
          src='https://rb.gy/ulxxee' 
          className='left-4 top-4 w-[120px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[170px] md:h-[170px]' 
          alt='logo' 
        />
        <button className='w-20 h-8 md:w-24 md:h-9 rounded bg-[#E50914] text-center outline-none hover:bg-[#F6121D]' onClick={() => router.push('/login')}>Sign In</button>
      </header>
      <div className='flex flex-col items-center w-[80%] lg:w-[50%] z-10'>
        <h1 className='text-2xl md:text-5xl lg:text-6xl font-bold text-center lg:w-[80%]'>Unlimited movies, TV shows, and more.</h1>
        <h3 className='text-sm md:text-xl lg:text-2xl py-6 text-center'>Watch anywhere. Cancel anytime.</h3>
        <h4  className='text-xs md:text-sm lg:text-lg pb-4 text-center'>Ready to watch? Enter your email to create or restart your membership.</h4>
        <form onSubmit={handleSubmit(onSubmit)} className='group relative flex flex-col items-center w-full md:flex-row md:h-[60px] lg:h-[70px]'>
          <span className={`absolute left-3 top-2 text-[#8c8c8c] text-xs font-semibold md:group-focus-within:block hidden ${emailValue.length > 0 ? 'md:block' : 'hidden'}`}>Email address</span>
          <input
            type='text'
            placeholder='Email address'
            className={`w-full md:h-full rounded-sm outline-none px-3 h-12 text-black md:group-focus-within:pt-4 ${emailValue.length > 0 && 'pt-4'} ${errors.email && 'border-b-4 border-orange-500'}`}
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
            // onChange={e => setEmailValue(e.target.value)}
            onBlur={e => setEmailValue(e.target.value)}
          />
          { errors.email?.message && (
            <p className='absolute left-0 -bottom-6 text-sm font-light text-orange-500'>
              {errors.email?.message}
            </p>
          )}
          <button 
            type='submit' 
            onClick={() => router.push('/signup/registration')} 
            className='w-[50%] mt-3 md:mt-0 md:h-full flex justify-center items-center rounded-sm bg-[#E50914] py-3 text-sm md:text-xl lg:text-3xl hover:bg-[#F6121D]'
          >
            Get Started
            <BsChevronRight className='h-3 md:ml-3 md:h-4 lg:h-6' />
          </button>
        </form>
      </div>
    </div>
  )
};

export default Register;