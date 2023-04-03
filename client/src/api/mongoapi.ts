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
  release_date: string,
  user_id: string
) => {
  return fetch('http://localhost:5000/watchlist-movies', {
    method: 'POST',
    body: JSON.stringify({
      movieId,
      title,
      overview,
      rating,
      poster_path, 
      release_date,
      user_id
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

export const addUser = (
  email: string,
  given_name: string,
  name: string,
  picture: string,
  sub: string
) => {
  return fetch('http://localhost:5000/user/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      email,
      given_name,
      name,
      picture,
      sub
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