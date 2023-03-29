import { useState } from 'react';
import { searchForMovie } from '../api/api';

// Models
import ISearchMovies  from '../models/ISearchMovies';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [movies, setMovies] = useState<ISearchMovies[]>([]);
  
  // Get searchQuery from user and pass results into the sort function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    searchForMovie(searchQuery)
      .then(data => {
        sortMovies(data.results);
      });

    setSearchQuery('');
  };

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
    <section className="search-container" style={{'marginTop': '150px'}}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-movie">Search for a movie: 
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}  />
        </label>
        <button>Search</button>
      </form>
      {movies.map(movie => (
        <div key={movie.id}>
          <p>{movie.title}</p>
        </div>
      ))}
    </section>
  );
};

export default Search;