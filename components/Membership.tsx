import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import { goToBillingPortal } from '../lib/stripe';
import Loader from './Loader';


function Membership() {
  const { user } = useAuth();
  const subscription = useSubscription(user);
  const [ isBillingLoading, setBillingLoading ] = useState<boolean>(false);


  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true);
      goToBillingPortal();
    }
  };
  console.log(subscription);


  return (
    <div className='bg-white md:bg-transparent mt-6 grid grid-cols-1 gap-x-4 border px-4 py-3 md:py-0 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 border-[#999]'>
      <div className='space-y-2 py-4'>
        <h4 className='text-lg text-[gray]'>Membership &amp; Billing</h4>
        <button
          disabled={isBillingLoading || !subscription}
          className='h-9 w-3/5 whitespace-nowrap bg-[#e6e6e6] py-2 text-sm font-medium rounded-sm shadow-[0_1px_0px_0px_rgba(0,0,0,0.2)] text-black shadow-md hover:bg-[#eaeaea] md:w-4/5'
          onClick={manageSubscription}
        >
          { isBillingLoading ? (<Loader color='dark:fill-[#e50914]' />) : ('Cancel Membership') }
        </button>
      </div>

      <div className='col-span-3'>
        <div className='flex flex-col justify-between border-b border-white/10 py-4 md:flex-row'>
          <div>
            <p className='font-bold text-[#333]'>{user?.email}</p>
            <p className='text-[#737373]'>Password: ********</p>
          </div>
          <div className='md:text-right'>
            <p className='membership-link'>Change email</p>
            <p className='membership-link'>Change password</p>
          </div>
        </div>

        <div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'>
          <div>
            <p className='text-[#333] font-semibold'>
              { subscription?.cancel_at_period_end ? 'Your membership will end on ' : 'Your next billing date is ' }
              { subscription?.current_period_end }
            </p>
          </div>
          <div className='md:text-right'>
            <p className='membership-link'>Manage payment info</p>
            <p className='membership-link'>Add backup payment method</p>
            <p className='membership-link'>Billing Details</p>
            <p className='membership-link'>Change billing day</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Membership;