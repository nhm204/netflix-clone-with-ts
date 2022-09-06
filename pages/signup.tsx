import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { BsCheck2 } from "react-icons/bs";


const SignUp = () => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className='relative flex h-screen w-screen flex-col items-center justify-center bg-white'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='fixed top-0 left-0 right-0 h-[90px] bg-none border-b py-[3%] lg:py-[3%]' >
        <img src='https://rb.gy/ulxxee' className='w-[120px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[160px]' alt='logo' />
        <button className='text-[#333] font-semibold md:text-lg hover:underline' onClick={logout}>Sign Out</button>
      </header>
      <div className='flex flex-col justify-center items-center text-[#333] w-[50%] lg:w-[25%]'>
        <img src='https://rb.gy/dld41a' className='w-[50px]' alt='illustration' />
        <span className='text-xs mt-6 mb-2'>STEP <b>1</b> OF <b>3</b></span>
        <h1 className='text-center text-3xl font-bold'>Choose your plan.</h1>
        <ul className='my-8'>
          <li className='flex items-center justify-center'>
            <BsCheck2 className='text-[#E50914] h-8 w-8 mr-2' />
            <span className='text-lg w-[70%] leading-6 lg:w-[80%]'>No commitments, cancel anytime.</span>
          </li>
          <li className='flex items-center justify-center mt-4'>
            <BsCheck2 className='text-[#E50914] h-8 w-8 mr-2' />
            <span className='text-lg w-[70%] leading-6 lg:w-[80%]'>Everything on Netflix for one low price.</span>
          </li>
          <li className='flex items-center justify-center mt-4'>
            <BsCheck2 className='text-[#E50914] h-8 w-8 mr-2' />
            <span className='text-lg w-[70%] leading-6 lg:w-[80%]'>No ads and no extra fees. Ever.</span>
          </li>
        </ul>
        <button className='w-[70%] rounded bg-[#E50914] py-3 text-2xl text-white mt-5 lg:w-[90%] hover:bg-[#F6121D]' onClick={() => router.push('/')} type='submit'>Next</button>
      </div>
    </div>
  )
}

export default SignUp;