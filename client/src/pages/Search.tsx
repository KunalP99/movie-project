import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchForMovie } from '../api/api';

// Models
import ISearchMovies  from '../models/ISearchMovies';

// Images
import RatingStar from '../images/rating-star.svg';
import ImageNotFound from '../images/image-not-found.svg';
import WhiteArrow from '../images/white-arrow.svg';
import BlueArrow from '../images/blue-arrow.svg';

type SearchParams = {
  searchQuery: string;
}

const Search = () => {
  const [movies, setMovies] = useState<ISearchMovies[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const { searchQuery } = useParams<SearchParams>();

  // Get searchQuery from params and pass results into the sort function
  useEffect(() => {
    if (searchQuery) {
      searchForMovie(searchQuery, page)
        .then(data => {
          console.log(data);
          sortMovies(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        });
    }
  }, [page]);

  // Sort the returned movies from search query in descending order based on movie popularity
  const sortMovies = (allMovies: ISearchMovies[]) => {
    allMovies.sort((movie1, movie2) => {
      if (movie1.popularity > movie2.popularity) {
        return -1;
      } else if  (movie1.popularity < movie2.popularity) {
        return 1;
      }
      return 0;
    });

    setMovies(allMovies);
  };

  return (
    <section className="search-container">
      <h2>Search results for <span>&quot;</span>{searchQuery}<span>&quot;</span></h2>
      <p className='search-total-results'>{`${totalResults} results found`}</p>
      <div className='search-flex-container'>
        <div className='underline'></div>
        {movies.map(movie => (
          <>
            <div key={movie.id} className='search-movie-container' title={movie.title}>
              <div className='search-movie-img-container'>
                {movie.vote_average !== 0 && 
                <div className='search-movie-rating-container'>
                  <img src={RatingStar} alt='Rating star' />
                  <p>{Math.round(movie.vote_average * 10) / 10}</p>
                </div>
                }
                <a href={`/movie/${movie.id}`}>
                  <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w154/${movie.poster_path}` : ImageNotFound} alt={`Poster for ${movie.title}`} />
                </a>
              </div>
              <div className='search-movie-information'>
                <p className='search-movie-date'>{movie.release_date.slice(0, 4)}</p>
                <a href={`/movie/${movie.id}`}>
                  <p className='search-movie-title'>{movie.title}</p>
                </a>
                <p className='search-movie-overview'>{movie.overview}</p>
              </div>
            </div>
            <div className='underline'></div>
          </>
        ))}
      </div>
      {totalResults !== 0 && 
        <div className='search-pagination'>
          {page !== 1 &&
            <button className='search-pagination-prev-btn' onClick={() => setPage(page => page - 1)}><img src={WhiteArrow} alt="Previous page" /></button>
          }
          <div className='search-pagination-box-page'>
            <p>{page}</p>
          </div>
          <p>of</p>
          <div className='search-pagination-box-total-page'>
            <p>{totalPages}</p>
          </div>
          {page !== totalPages &&
            <button className='search-pagination-next-btn' onClick={() => setPage(page => page + 1)}><img src={BlueArrow} alt="Next page" /></button>
          }
        </div>
      }
    </section>
  );
};

export default Search;