import React, { useState } from 'react';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import { Inputs } from '../../typings';


const RegForm = () => {
  const [ signup, setSignup ] = useState<boolean>(false);
  const [ emailValue, setEmailValue ] = useState<string>(() => localStorage.getItem('email') ?? '');
  const [ passwordValue, setPasswordValue ] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { signUp, error } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (signup) {
      await signUp(data.email, data.password);
    }
  }

  
  return (
    <div className='relative flex h-screen w-screen flex-col bg-white items-center'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='fixed top-0 left-0 right-0 h-[90px] bg-none border-b py-[3%] lg:py-[3%]' >
        <img src='https://rb.gy/ulxxee' className='w-[120px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[160px]' alt='logo' />
        <button className='text-[#333] font-semibold md:text-lg' onClick={() => router.push('/login')}>Sign In</button>
      </header>
      <div className='flex flex-col text-[#333] w-[50%] lg:w-[30%] mt-[100px]'>
        <span className='text-xs mt-10 mb-2 lg:w-[90%]'>STEP <b>1</b> OF <b>3</b></span>
        <h1 className='text-3xl font-bold lg:w-[90%]'>Create a password to start your membership</h1>
        <span className='text-lg mt-4 lg:w-[90%]'>Just a few more steps and you're done!</span>
        <span className='text-lg mb-4 lg:w-[90%]'>We hate paperwork, too.</span>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <label className='group relative inline-block w-full'>
            <span className={ emailValue.length > 0 ? `absolute left-3 top-1.5 text-black text-[11px] group-focus-within:text-[#8c8c8c]` : 'hidden'}>Email</span>
            <input
              type='text'
              placeholder='Email'
              value={emailValue}
              className={`w-full border h-14 px-3 rounded-sm outline-none ${errors.email ? 'border-[#B92D2B]' : 'border-black'} ${!errors.email && emailValue.length >= 5 && emailValue.length <= 50 && 'border-[#5FA53F]'} ${emailValue.length > 0 && 'pt-4 bg-white text-black'}`}
              {...register('email', { 
                required: {
                  value: true,
                  message: 'Email is required!'
                }, 
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email.'
                },
                minLength: {
                  value: 5,
                  message: 'Email should be between 5 and 50 characters'
                },
                maxLength: {
                  value: 50,
                  message: 'Email should be between 5 and 50 characters'
                }
              })}
              onChange={e => setEmailValue(e.target.value)}
            />
            { errors.email?.message && (
              <p className='text-[13px] font-light text-[#B92D2B]'>
                {errors.email?.message}
              </p>
            )}
          </label>
          <label className='group relative inline-block w-full'>
            <span className={passwordValue.length > 0 ? 'absolute left-3 top-6 text-black text-[11px] group-focus-within:text-[#8c8c8c]' : 'hidden'}>Password</span>
            <input
              type='password'
              placeholder='Add a password'
              className={`w-full mt-4 border h-14 px-3 rounded-sm outline-none ${!errors.password && passwordValue.length >= 6 && passwordValue.length <= 60 && 'border-[#5FA53F]'} ${errors.password ? 'border-[#B92D2B]' : 'border-black'} ${passwordValue.length > 0 && 'pt-4 bg-white text-black'}`}
              {...register('password', { 
                required: {
                  value: true, 
                  message: 'Password is required!'
                }, 
                minLength: {
                  value: 6,
                  message: 'Password should be between 6 and 60 characters'
                },
                maxLength: {
                  value: 60,
                  message: 'Password should be between 6 and 60 characters'
                }
              })}
              onChange={e => setPasswordValue(e.target.value)}
            />
            { errors.password?.message && (
              <p className='text-[13px] font-light text-[#B92D2B]'>
                {errors.password?.message}
              </p>
            )}
          </label>
          <button className='w-full rounded bg-[#E50914] py-3 text-2xl text-white mt-14 hover:bg-[#F6121D]' onClick={() => setSignup(true)} type='submit'>
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegForm;