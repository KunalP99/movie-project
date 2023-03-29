export const getWatchlistMovies = () => {
  return fetch('http://localhost:5000/watchlist-movies')
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const createWatchlistMovie = (
  movieId: number, 
  title: string, 
  overview: string, 
  rating: number, 
  poster_path: string, 
  release_date: string
) => {
  return fetch('http://localhost:5000/watchlist-movies', {
    method: 'POST',
    body: JSON.stringify({
      movieId,
      title,
      overview,
      rating,
      poster_path, 
      release_date
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};