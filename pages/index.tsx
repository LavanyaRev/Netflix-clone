import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';


import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModel';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModelStore';

/*interface Movie {
  id: string;
  title: string;
  thumbnailUrl?: string;
}*/

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return { props: {} };
}

const Home: React.FC = () => {
  const { data: movies = [], isLoading: isLoadingMovies } = useMovieList();
  const { data: favorites = [], isLoading: isLoadingFavorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <InfoModal visible={isOpen} onClose={closeModal} />

      {/* Billboard */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Billboard />
        <div className="absolute bottom-10 left-10 md:left-20 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Featured Movie</h1>
          <p className="max-w-xl text-sm md:text-lg text-gray-300">
            Discover trending movies and build your personal watchlist.
          </p>
        </div>
      </section>

      {/* Movie Lists */}
      <main className="px-4 md:px-16 mt-12 space-y-16 pb-40">
        {/* Trending Now */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
          {isLoadingMovies ? (
            <p className="text-gray-400">Loading trending movies...</p>
          ) : (
            <MovieList data={movies} title="Trending Now" />
          )}
        </div>

        {/* My List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My List</h2>
          {isLoadingFavorites ? (
            <p className="text-gray-400">Loading your list...</p>
          ) : favorites.length === 0 ? (
            <p className="text-gray-400">You have no favorite movies yet.</p>
          ) : (
            <MovieList data={favorites} title="My List" />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
