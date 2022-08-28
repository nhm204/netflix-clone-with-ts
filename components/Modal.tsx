import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { baseUrl } from '../constants/movie';
import { modalState, movieState } from '../atoms/modalAtom';
import { useCallback, useEffect, useState } from 'react';
import { Element, Genre, Movie } from '../typings';
import useAuth from '../hooks/useAuth';
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactPlayer from 'react-player/lazy';
import { CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import { FaPlay } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';


const Modal = () => {
  const [ showModal, setShowModal ] = useRecoilState(modalState);
  const [ movie, setMovie ] = useRecoilState(movieState);
  const [ trailer, setTrailer ] = useState<string>('');
  const [ genres, setGenres ] = useState<Genre[]>([]);
  const [ muted, setMuted ] = useState<boolean>(false);
  const [ movies, setMovies ] = useState<DocumentData[] | Movie[]>([]);
  const [ addedToList, setAddedToList ] = useState<boolean>(false);
  const { user } = useAuth();

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  };

  useEffect(() => {
    if (!movie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        console.log(movie)
        const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer' || 'Teaser' || 'Clip' || 'Bloopers' || 'Featurette' || 'Behind the Scenes');
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);


  const handleClose = useCallback(() => {
    setShowModal(false);
    setMovie(null);
    toast.dismiss();
  }, [setShowModal, setMovie]);


  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id]);

  
  useEffect(() => setAddedToList(movies.findIndex((result) => result.data().id === movie?.id) !== -1), [movies]);

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      )
      toast(`${movie?.title || movie?.original_name} has been removed from My List`, { duration: 8000, style: toastStyle });
    } 
    else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!), { ...movie }
      )
      toast(`${movie?.title || movie?.original_name} has been added to My List.`, { duration: 8000, style: toastStyle });
    }
  };
  

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className='fixed !top-7 left-0 right-0 mb-4 z-50 mx-auto w-full max-w-4xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
    >
      <>
        <Toaster position='bottom-center' />
        <button className='modal-btn absolute right-5 top-5 border-none !z-40 h-9 w-9 bg-[#181818] hover:bg-[#181818]' onClick={handleClose}>
          <XIcon className='h-6 w-6' />
        </button>

        <div style={{position: 'absolute', top: '0', left: '0', right: '0', height:'72.25%', background: 'linear-gradient(0deg, rgb(24, 24, 24), transparent 50%)', zIndex: '1'}}></div>
        <div className='relative pt-[56.25%]'>
          { trailer ?
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width='100%'
              height='100%'
              style={{ position: 'absolute', top: '0', left: '0', background: 'linear-gradient(0deg, rgb(24, 24, 24), transparent 50%)' }}
              playing
              loop
              muted={muted}
              poster={`https://image.tmdb.org/t/p/w500${movie?.poster_path || movie?.backdrop_path}`}
            /> :      
            <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} style={{background: 'linear-gradient(0deg, rgb(24, 24, 24), transparent 50%)'}} className='absolute top-0 left-0 object-cover' layout='fill' alt='' />
          }
          <h1 className='absolute bottom-28 px-12 text-lg md:text-6xl text-white text-shadow-md font-bold w-[75%] z-10'>{movie?.name || movie?.title || movie?.original_name}</h1>
          <div className='absolute bottom-10 flex w-full items-center justify-between px-12'>
            <div className='flex space-x-2 z-10'>
              <button className='flex items-center gap-x-2 rounded bg-white px-8 text-lg font-bold text-black transition hover:bg-[#e6e6e6]'>
                <FaPlay className='h-6 w-6 text-black' />
                Play
              </button>
              <button className='modal-btn' onClick={handleList}>
                { addedToList ? <CheckIcon className='h-7 w-7' /> : <PlusIcon className='h-7 w-7' /> }
              </button>
              <button className='modal-btn'>
                <ThumbUpIcon className='h-6 w-6' />
              </button>
            </div>
            <button className='modal-btn z-10' onClick={() => setMuted(!muted)}>
              { muted ? <VolumeOffIcon className='h-6 w-6' /> : <VolumeUpIcon className='h-6 w-6' /> }
            </button>
          </div>
        </div>
        <div className='flex space-x-16 rounded-b-md bg-[#181818] px-12 py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-base'>
              <p className='font-semibold text-green-400'>
                { Math.floor(movie!.vote_average * 10) }% Match
              </p>
              <p className='font-light'>
                { movie?.release_date?.substr(0, 4) || movie?.first_air_date?.substr(0, 4) }
              </p>
              <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                HD
              </div>
            </div>
            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
              <p className='w-[70%] sm:text-sm lg:text-base'>{movie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <div>
                  <span className='text-[gray]'>Genres:</span>{' '}
                  { genres.map(genre => genre.name).join(', ') }
                </div>
                <div>
                  <span className='text-[gray]'>Original language:</span>
                  {' '}
                  { movie?.original_language }
                </div>
                <div>
                  <span className='text-[gray]'>Total votes:</span>
                  {' '}
                  { movie?.vote_count }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
};

export default Modal;