import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../constants/movie';
import { Element, Movie } from '../typings';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/outline';
import { BsArrowClockwise } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import ReactPlayer from 'react-player';

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [ movie, setMovie ] = useState<Movie | null>(null);
  const [ showModal, setShowModal ] = useRecoilState(modalState);
  const [ currentMovie, setCurrentMovie ] = useRecoilState(movieState);
  const [ trailer, setTrailer ] = useState<string>('');
  const [ muted, setMuted ] = useState<boolean>(true);
  const [ loop, setLoop ] = useState<boolean>(false);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer' || 'Teaser' || 'Clip' || 'Bloopers' || 'Featurette' || 'Behind the Scenes');
        setTrailer(data.videos?.results[index]?.key);
      }
    }
    fetchMovie();
  }, [netflixOriginals]);


  return (
    <div className='flex flex-col space-y-2 pl-[4%] py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pb-0'>
      <div className='absolute -top-1 left-0 -z-10 md:h-[42vh] lg:h-[95vh] w-full'>
        { trailer ? 
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0', background: 'linear-gradient(0deg, rgb(24, 24, 24), transparent 50%)' }}
            playing
            muted={muted}
            loop={loop}
            poster={`https://image.tmdb.org/t/p/w500${movie?.poster_path || movie?.backdrop_path}`}
          /> :
          <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout='fill' objectFit="cover" alt='banner' /> 
        }
      </div>
      <div className='flex items-end justify-between'>
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
            <button 
              className='banner-btn bg-[gray]/70'
              onClick={() => {
                setCurrentMovie(movie);
                setShowModal(true);
              }}
            >
              <InformationCircleIcon className='h-5 w-5 md:h-7 md:w-7' /> 
              More Info
            </button>
          </div>
        </div>
        { trailer && (
          <div className='flex space-x-2 z-10 mr-8'>
            <button className='modal-btn z-10' onClick={() => setLoop(!loop)}>
              <BsArrowClockwise className='h-6 w-6' />
            </button>
            <button className='modal-btn z-10' onClick={() => setMuted(!muted)}>
              { muted ? <VolumeOffIcon className='h-6 w-6' /> : <VolumeUpIcon className='h-6 w-6' /> }
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default Banner;