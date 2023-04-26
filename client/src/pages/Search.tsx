import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchForMovie } from '../api/api';

// Models
import ISearchMovies  from '../models/ISearchMovies';

type SearchParams = {
  searchQuery: string;
}

const Search = () => {
  const [movies, setMovies] = useState<ISearchMovies[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { searchQuery } = useParams<SearchParams>();

  // Get searchQuery from params and pass results into the sort function
  useEffect(() => {
    if (searchQuery) {
      searchForMovie(searchQuery, page)
        .then(data => {
          console.log(data);
          sortMovies(data.results);
          setTotalPages(data.total_pages);
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
    <section className="search-container" style={{'marginTop': '200px'}}>
      <h2>Search results for <span>&quot;</span>{searchQuery}<span>&quot;</span></h2>
      {movies.map(movie => (
        <div key={movie.id}>
          <p>{movie.title}</p>
        </div>
      ))}
      <button onClick={() => setPage(page => page - 1)}>Prev</button>
      <button onClick={() => setPage(page => page + 1)}>Next</button>
    </section>
  );
};

export default Search;