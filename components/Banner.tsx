import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../constants/movie';
import { Movie } from '../typings';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/outline';

interface Props {
    netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [ movie, setMovie ] = useState<Movie | null>(null);

  useEffect(() => setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]), [netflixOriginals]);


  return (
    <div className='flex flex-col space-y-2 pl-[4%] py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pb-0'>
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-full'>
        <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout='fill' objectFit="cover"/>
      </div>
      <div className=''>
        <h1 className='max-w-xs md:max-w-lg lg:max-w-2xl text-2xl font-bold md:text-4xl lg:text-7xl'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-lg lg:my-5'>
          {movie?.overview}
        </p>
        <div className='flex space-x-3'>
          <button className='banner-btn bg-white text-black'>
            <FaPlay className='h-4 w-4 text-black md:h-6 md:w-6' />
            Play
          </button>
          <button className='banner-btn bg-[gray]/70'>
            <InformationCircleIcon className='h-5 w-5 md:h-7 md:w-7' /> 
            More Info
          </button>
        </div>
      </div>
    </div>
  )
};

export default Banner;