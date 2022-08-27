import React, { useCallback, useRef, useState } from 'react';
import { Movie } from '../typings';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Thumbnail from './Thumbnail';
import { DocumentData } from 'firebase/firestore';

interface Props {
  title: string
  movies: Movie[] | DocumentData[]
}

const MovieList = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [ isMoved, setIsMoved ] = useState<boolean>(false);

  const handleClick = useCallback((direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - ((91.6 / 100) * clientWidth) : scrollLeft + ((91.6 / 100) * clientWidth);
      rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'});
    }
  }, [setIsMoved, rowRef]);
  // console.log(rowRef.current!.scrollLeft, rowRef.current!.clientWidth)
  
  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-xl pl-[4%]'>
        {title}
      </h2>
      <div className={`group relative md:-ml-2 ${!isMoved && 'pl-[4%]'}`}>
        <div className={`absolute top-0 bottom-0 left-0 h-28 w-[3.6%] opacity-0 bg-black/60 z-40 md:h-32 group-hover:opacity-100 ${ !isMoved && 'hidden' }`} />
        <ChevronLeftIcon 
          onClick={() => handleClick('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 h-full w-10 cursor-pointer opacity-0 py-auto transition hover:scale-125 group-hover:opacity-100
            ${ !isMoved && 'hidden' }`}
        />
        <div ref={rowRef} className='flex items-center overflow-x-scroll scrollbar-hide md:pl-2'>
          { movies?.map(movie => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <div className='absolute top-0 bottom-0 right-0 h-28 w-[3.5%] opacity-0 bg-black/60 z-40 md:h-32 group-hover:opacity-100' />
        <ChevronRightIcon 
          onClick={() => handleClick('right')}
          className='absolute top-0 bottom-0 right-1 z-40 h-full w-10 cursor-pointer opacity-0 py-auto transition hover:scale-125 group-hover:opacity-100' 
        />
      </div>
    </div>
  )
};

export default MovieList;