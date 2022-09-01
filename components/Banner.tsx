import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [ isPlay, setIsPlay ] = useState<boolean>(true);
  const [ showReplayButton, setShowReplayButton ] = useState<boolean>(false);
  const [ showDesc, setShowDesc ] = useState<boolean>(true);
  const [ showPoster, setShowPoster ] = useState<boolean>(false);
  const [ titleTransition, setTitleTransition ] = useState<boolean>(false);


  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer');
        setTrailer(data.videos?.results[index]?.key);
      }
    }
    fetchMovie();
  }, [movie]);
 

  const handleEndVideo = () => {
    setShowReplayButton(true);
    setIsPlay(false);
    setShowDesc(true);
    setTitleTransition(false);
    setShowPoster(true);
  }


  const handleStartVideo = () => {
    setTimeout(() => setShowDesc(false), 5000);
    setTimeout(() => setTitleTransition(true), 8000);
  }


  const handleReplay = useCallback(() => {
    setShowReplayButton(false);
    setIsPlay(true);
    setShowPoster(false)
    setTimeout(() => setShowDesc(false), 5000);
    setTimeout(() => setTitleTransition(true), 8000);
  }, [setIsPlay, setShowReplayButton, setShowDesc, setTitleTransition]);


  return (
    <div className='flex flex-col space-y-2 pl-[4%] py-16 md:space-y-4 h-[60vh] lg:h-[76vh] justify-end lg:pb-0'>
      <div className='absolute top-0 left-0 -z-10 h-[70vh] lg:h-[95vh] w-full'>
        { trailer ? 
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0', background: 'linear-gradient(0deg, rgb(24, 24, 24), transparent 50%)' }}
            playing={isPlay}
            muted={muted}
            onStart={handleStartVideo}
            onEnded={handleEndVideo}
            poster={`https://image.tmdb.org/t/p/w500${movie?.poster_path || movie?.backdrop_path}`}
          /> :
          <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout='fill' objectFit="cover" alt='banner' priority /> 
        }
        { showPoster && <Image className='transition animated-fadeIn' src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout='fill' objectFit="cover" alt='banner' priority /> }
      </div>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className={`max-w-xs md:max-w-lg lg:max-w-2xl text-2xl font-bold md:text-4xl lg:text-7xl ${titleTransition && 'mb-2 md:mb-4 lg:mb-8 lg:text-[85px]'}`}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className={`max-w-xs text-xs text-shadow-md my-2 md:max-w-lg md:text-base md:my-2 lg:max-w-2xl lg:text-lg lg:my-5 transition ${showDesc ? 'animate-fadeIn' : 'animate-fadeOut'} ${titleTransition && 'absolute top-0'}`}>
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
          <div className='flex space-x-2 z-10 mr-[4%]'>
            { showReplayButton && (
              <button className='modal-btn z-10' onClick={handleReplay}>
                <BsArrowClockwise className='h-4 w-4 md:h-6 md:w-6' />
              </button>
            )}
            <button className='modal-btn z-10' onClick={() => setMuted(!muted)}>
              { muted ? <VolumeOffIcon className='h-4 w-4 md:h-6 md:w-6' /> : <VolumeUpIcon className='h-4 w-4 md:h-6 md:w-6' /> }
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default Banner;