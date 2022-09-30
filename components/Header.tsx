import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const [ isScrolled, setIsScrolled ] = useState<boolean>(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  
  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img 
          src='https://rb.gy/ulxxee' 
          width={100} 
          height={100} 
          className='cursor-pointer object-contain' 
        />
        <ul className='hidden space-x-4 md:flex'>
          <li className='header-link cursor-default font-semibold text-white hover:text-white'>Home</li>
          <li className='header-link'>TV Shows</li>
          <li className='header-link'>Movies</li>
          <li className='header-link'>New &amp; Popular</li>
          <li className='header-link'>My List</li>
        </ul>
      </div>
      <div className='flex items-center space-x-4 text-sm'>
        <SearchIcon className='sm hidden h-6 w-6 sm:inline' />
        <p className='hidden lg:inline'>Kids</p>
        <BellIcon className='h-6 w-6' />
        <Link href='/account'>
          <img 
            src='https://rb.gy/g1pwyx' 
            alt='user avatar' 
            className='cursor-pointer rounded' 
          />
        </Link>
      </div>
    </header>
  )
};

export default Header;