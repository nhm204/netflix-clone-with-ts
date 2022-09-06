import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/outline';
import useAuth from '../../hooks/useAuth';
import { Product } from '@stripe/firestore-stripe-payments';


interface Props {
  products: Product[]
}


const Plans = ({ products }: Props) => {
  const { logout, user } = useAuth();

  return (
    <div className='h-screen w-screen bg-white'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='fixed top-0 left-0 right-0 h-[90px] bg-none border-b py-[3%] lg:py-[3%]' >
        <Link href='/'>
          <img src='https://rb.gy/ulxxee' className='w-[120px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[160px]' alt='logo' />
        </Link>
        <button className='text-[#333] font-semibold md:text-lg hover:underline' onClick={logout}>Sign Out</button>
      </header>

      <main className='mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all text-[#333] md:px-10'>
        <span className='text-xs mt-10 mb-2 lg:w-[90%]'>STEP <b>2</b> OF <b>3</b></span>
        <h1 className='mb-3 text-3xl font-bold'>
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Watch all you want.
            Ad-free.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Recommendations
            just for you.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-end self-end md:w-3/5'>
            {products?.map((product) => (
              <div
                className='planBox'
                key={product.id}
              >
                {product.name}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
};

export default Plans;