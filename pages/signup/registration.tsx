import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';


const Registration = () => {
  const router = useRouter();

  return (
    <div className='relative flex h-screen w-screen flex-col items-center justify-center bg-white'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='fixed top-0 left-0 right-0 h-[90px] bg-none border-b py-[3%] lg:py-[3%]' >
        <img src='https://rb.gy/ulxxee' className='w-[120px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[160px]' alt='logo' />
        <button className='text-[#333] font-semibold md:text-lg hover:underline' onClick={() => router.push('/login')}>Sign In</button>
      </header>
      <div className='flex flex-col justify-center items-center text-[#333] w-[50%] lg:w-[25%] mt-[90px]'>
        <img src='https://rb.gy/uhhakw' className='w-[260px]' alt='illustration' />
        <span className='text-xs mt-10 mb-2'>STEP <b>1</b> OF <b>3</b></span>
        <h1 className='text-center text-3xl font-bold'>Finish setting up your account</h1>
        <span className='text-center text-lg w-[70%] mt-4 leading-6 lg:w-[80%]'>Netflix is personalized for you.</span>
        <span className='text-center text-lg w-[70%] leading-6 lg:w-[80%]'>Create a password to watch on any device at any time.</span>
        <button className='w-[70%] rounded bg-[#E50914] py-3 text-2xl text-white mt-5 lg:w-[90%] hover:bg-[#F6121D]' onClick={() => router.push('/signup/regform')} type='submit'>Next</button>
      </div>
    </div>
  )
}

export default Registration;