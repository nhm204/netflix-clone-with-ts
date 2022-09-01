import { Movie } from '../typings';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import Modal from './Modal';

interface Props {
  movie: Movie | DocumentData
  id: number[]
}

function Thumbnail({ movie, id }: Props) {
  const [ showModal, setShowModal ] = useRecoilState(modalState);
  const [ currentMovie, setCurrentMovie ] = useRecoilState(movieState);


  return (
    <div className='relative group'>
      <div 
        className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-32 md:min-w-[230px] mx-[0.4vw] md:mx-[0.2vw] md:group-first:ml-0'
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
        }}
      >
        { id.includes(movie.id) && <img src='static/netflix_icon.png' className='absolute top-2 left-[0.2rem] z-10 h-5 w-5' alt='netflix-logo' /> }
        <span className='absolute left-2 bottom-1 text-xs md:text-sm font-semibold text-white z-10'>{movie.name || movie.title || movie.original_name}</span>
        <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} className='rounded-sm object-cover md:rounded' layout='fill' alt={movie.name || movie.title || movie.original_name} />
      </div>
    </div>
  )
};

export default Thumbnail;