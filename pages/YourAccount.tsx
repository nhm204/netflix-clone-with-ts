import Head from 'next/head';
import Link from 'next/link';
import { Membership } from '../components';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import payments, { goToBillingPortal } from '../lib/stripe';
import { GetStaticProps } from 'next';


interface Props {
  products: Product[]
}

const YourAccount = ({products}: Props) => {
  const { user, logout, loading } = useAuth();
  const subscription = useSubscription(user);
  console.log(products)

  if (loading) return null;


  return (
    <div className='bg-[#f3f3f3] h-screen'>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='bg-[#080808]'>
        <Link href='/'>
          <img
            src='https://rb.gy/ulxxee'
            width={120}
            height={120}
            className='cursor-pointer object-contain'
          />
        </Link>
        <Link href='/YourAccount'>
          <img
            src='https://rb.gy/g1pwyx'
            alt='user avatar'
            className='cursor-pointer rounded'
          />
        </Link>
      </header>
      <main className='mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl text-[#333]'>Account</h1>
          <div className='-ml-0.5 flex items-center gap-x-1.5'>
            <img src='https://rb.gy/4vfk4r' alt='' className='h-7 w-7' />
            <p className='text-xs font-semibold text-[#555]'>Member since {subscription?.created}</p>
          </div>
        </div>

        <Membership />

        <div className='bg-white md:bg-transparent mt-2 md:mt-6 grid grid-cols-1 gap-x-4 border px-4 py-6 md:py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0 border-[#999]'>
          <h4 className='text-lg text-[gray]'>Plan details</h4>
          {/* Find the current plan */}
          <div className='col-span-2 font-bold text-[#333]'>
            { products?.filter(product => product.id === subscription?.product)[0]?.name }
          </div>
          <p className='cursor-pointer text-[#0073e6] hover:underline md:text-right' onClick={goToBillingPortal}>Change plan</p>
        </div>

        <div className='bg-white md:bg-transparent mt-2 md:mt-4 grid grid-cols-1 gap-x-4 border px-4 py-6 md:py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 border-[#999]'>
          <h4 className='text-lg text-[gray]'>Settings</h4>
          <div>
            <p className='cursor-pointer text-[#0073e6] hover:underline w-max py-1'>Test participation</p>
            <p className='cursor-pointer text-[#0073e6] hover:underline w-max py-1'>Manage download devices</p>
            <p className='cursor-pointer text-[#0073e6] hover:underline w-max py-1'>Recent device streaming activity</p>
            <p className='cursor-pointer text-[#0073e6] hover:underline w-max py-1' onClick={logout}>Sign out of all devices</p>
          </div>
        </div>
      </main>
    </div>
  )
};

export default YourAccount;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
};