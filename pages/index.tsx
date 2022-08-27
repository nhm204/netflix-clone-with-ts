import Head from 'next/head';
import { Banner, Header, MovieList } from '../components';
import useAuth from '../hooks/useAuth';
import { Movie } from '../typings';
import requests from '../utils/requests';


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
}

const Home: React.FC<Props> = (props) => {
  const { netflixOriginals, misteryMovies, actionMovies, comedyMovies, documentaries, horrorMovies, romanceMovies, topRated, trendingNow } = props;
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] w-full'>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className='relativepb-24 lg:space-y-24'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-12">
          <MovieList title="Trending Now" movies={trendingNow} />
          <MovieList title="Top Rated" movies={topRated} />
          <MovieList title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          <MovieList title="Comedies" movies={comedyMovies} />
          <MovieList title="Mistery Movies" movies={misteryMovies} />
          <MovieList title="Scary Movies" movies={horrorMovies} />
          <MovieList title="Romance Movies" movies={romanceMovies} />
          <MovieList title="Documentaries" movies={documentaries} />
        </section>
      </main>

    </div>
  )
};

export default Home;


export const getServerSideProps = async () => {

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    misteryMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then(res => res.json()),
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchActionMovies).then(res => res.json()),
    fetch(requests.fetchComedyMovies).then(res => res.json()),
    fetch(requests.fetchMisteryMovies).then(res => res.json()),
    fetch(requests.fetchHorrorMovies).then(res => res.json()),
    fetch(requests.fetchRomanceMovies).then(res => res.json()),
    fetch(requests.fetchDocumentaries).then(res => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      misteryMovies: misteryMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results
    },
  }
}
