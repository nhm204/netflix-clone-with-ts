import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Banner, Header, MovieList, Modal, HoverModal } from '../components';
import useAuth from '../hooks/useAuth';
import { Movie } from '../typings';
import requests from '../utils/requests';
import useList from '../hooks/useList';


interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  misteryMovies: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  tvPopular: Movie[]
  moviesLatest: Movie[]
  tvShows: Movie[]
  sciFi: Movie[]
  western: Movie[]
  animation: Movie[]
}

const Home: React.FC<Props> = (props) => {
  const { 
    netflixOriginals, 
    misteryMovies, 
    actionMovies, 
    comedyMovies, 
    documentaries, 
    horrorMovies, 
    romanceMovies, 
    topRated, 
    trendingNow, 
    tvPopular, 
    moviesLatest, 
    tvShows, 
    sciFi,
    western,
    animation } = props;
  const { user, loading } = useAuth();
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);

  // console.log(tvShows)
  if (loading) return null;

  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] w-full overflow-hidden'>
      <Head>
        <title>{movie?.title || movie?.name || movie?.original_name || 'Home'} - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className='relative pb-24 lg:space-y-24'>
        <Banner netflixOriginals={animation} />
        <section className="md:space-y-12">
          { trendingNow && <MovieList title="Trending Now" movies={trendingNow} /> }
          { topRated && <MovieList title="Top Rated" movies={topRated} /> }
          { animation && <MovieList title="Animation" movies={animation} /> }
          { list.length > 0 && <MovieList title="My List" movies={list} />}
          { tvShows && <MovieList title="TV Shows" movies={tvShows} /> }
          { netflixOriginals && <MovieList title="Only on Netflix" movies={netflixOriginals} /> }
          { moviesLatest && <MovieList title="New Release" movies={moviesLatest} /> }
          { tvPopular && <MovieList title="TV Popular" movies={tvPopular} /> }
          { sciFi && <MovieList title="Sci-Fi Movies" movies={sciFi} /> }
          { actionMovies && <MovieList title="Action Thrillers" movies={actionMovies} /> }
          { comedyMovies && <MovieList title="Comedies" movies={comedyMovies} /> }
          { misteryMovies && <MovieList title="Mistery Movies" movies={misteryMovies} /> }
          { western && <MovieList title="Western Movies" movies={western} /> }
          { horrorMovies && <MovieList title="Scary Movies" movies={horrorMovies} /> } 
          { romanceMovies && <MovieList title="Romance Movies" movies={romanceMovies} /> }
          { documentaries && <MovieList title="Documentaries" movies={documentaries} /> }
        </section>
      </main>
      { showModal && <Modal />}
    </div>
  )
};

export default Home;


export const getServerSideProps = async () => {
 
  const [
    netflixOriginals,
    tvShows,
    tvPopular,
    moviesLatest,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    misteryMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    sciFi,
    western,
    animation
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then(res => res.json()),
    fetch(requests.fetchTVShows).then(res => res.json()),
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchActionMovies).then(res => res.json()),
    fetch(requests.fetchComedyMovies).then(res => res.json()),
    fetch(requests.fetchMisteryMovies).then(res => res.json()),
    fetch(requests.fetchHorrorMovies).then(res => res.json()),
    fetch(requests.fetchRomanceMovies).then(res => res.json()),
    fetch(requests.fetchDocumentaries).then(res => res.json()),
    fetch(requests.fetchTVPopular).then(res => res.json()),
    fetch(requests.fetchMoviesLatest).then(res => res.json()),
    fetch(requests.fetchSciFi).then(res => res.json()),
    fetch(requests.fetchWestern).then(res => res.json()),
    fetch(requests.fetchAnimation).then(res => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results || null,
      tvShows: tvShows.results || null,
      trendingNow: trendingNow.results || null,
      topRated: topRated.results || null,
      actionMovies: actionMovies.results || null,
      comedyMovies: comedyMovies.results || null,
      misteryMovies: misteryMovies.results || null,
      horrorMovies: horrorMovies.results || null,
      romanceMovies: romanceMovies.results || null,
      documentaries: documentaries.results || null,
      tvPopular: tvPopular.results || null,
      moviesLatest: moviesLatest.results || null,
      sciFi: sciFi.results || null,
      western: western.results || null,
      animation: animation.results || null,
    }
  }
}
