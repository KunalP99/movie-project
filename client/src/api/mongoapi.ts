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