import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/outline';
import useAuth from '../../hooks/useAuth';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import payments from '../../lib/stripe';
import { Table } from '../../components';


interface Props {
  products: Product[]
}

const Plans = ({ products }: Props) => {
  const { logout, user } = useAuth();
  const [ selectedPlan, setSelectedPlan ] = useState<Product | null>(products[2]);

  console.log(products)
  

  return (
    <div className=' bg-white'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='relative top-0 left-0 right-0 h-[90px] bg-none border-b py-[3%] lg:py-[3%]' >
        <Link href='/'>
          <img src='https://rb.gy/ulxxee' className='w-[120px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[160px]' alt='logo' />
        </Link>
        <button className='text-[#333] font-semibold md:text-lg hover:underline' onClick={logout}>Sign Out</button>
      </header>

      <main className='mx-auto max-w-5xl px-5 pt-5 pb-12 transition-all text-[#333] md:px-10'>
        <span className='text-xs mt-10 mb-2 lg:w-[90%] md:leading-[27px]'>STEP <b>2</b> OF <b>3</b></span>
        <h1 className='mb-3 text-3xl font-bold leading-10'>
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className='flex items-center gap-x-2 text-lg md:mt-1'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Watch all you want.
            Ad-free.
          </li>
          <li className='flex items-center gap-x-2 text-lg md:mt-1'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Recommendations
            just for you.
          </li>
          <li className='flex items-center gap-x-2 text-lg md:mt-1'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-end self-end md:w-3/5'>
            {products?.map((product) => (
              <div
                className={`plan-box ${
                  selectedPlan?.id === product.id ? 'opacity-100 shadow-[0_0px_5px_0_#E50914] after:absolute after:top-full after:left-1/2 after:block after:-translate-x-1/2 after:border-8 after:border-b-0 after:border-transparent after:border-t-[#e50914] after:content-[""]' : 'opacity-60'
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button className='w-11/12 md:w-[420px] mx-auto rounded bg-[#E50914] py-3 md:py-4 text-2xl text-white !mt-14 hover:bg-[#F6121D]' type='submit'>
            Next
          </button>
        </div>
      </main>
    </div>
  )
};

export default Plans;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: { products }
  }
}