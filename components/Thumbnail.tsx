import { Movie } from '../typings';
import Image from 'next/image';

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  console.log(movie)
  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-32 md:min-w-[230px] mx-[0.2vw] md:first:ml-0'>
      <span className='absolute left-2 bottom-1 text-sm font-semibold text-white z-10'>{movie.name || movie.title || movie.original_name}</span>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} className='rounded-sm object-cover md:rounded' layout="fill" />
    </div>
  )
};

export default Thumbnail;