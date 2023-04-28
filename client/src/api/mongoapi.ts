export const getWatchlistMovies = () => {
  return fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/watchlist-movies`)
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
  backdrop_path: string,
  release_date: string,
  runtime: number,
  user_id: string
) => {
  return fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/watchlist-movies`, {
    method: 'POST',
    body: JSON.stringify({
      movieId,
      title,
      overview,
      rating,
      poster_path, 
      backdrop_path,
      release_date,
      runtime,
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

export const deleteWatchlistMovie = async (userId: string ,movieId: number) => {
  return await fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/watchlist-movies/${userId}/${movieId}`, {
    method: 'DELETE',
  });
};

export const addUser = (
  email: string,
  given_name: string,
  name: string,
  picture: string,
  sub: string
) => {
  return fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/user/sign-up`, {
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

export const getHistoryMovies = (userId: string) => {
  return fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/history/${userId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const addMovieToHistory = (
  user_id: string,
  movie_id: number,
  title: string,
  user_rating: number,
  poster_path: string,
  watch_date: Date,
  rewatch: boolean,
  points: number
) => {
  return fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/history`, {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      movie_id,
      title,
      user_rating,
      poster_path,
      watch_date,
      rewatch,
      points
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

export const editHistoryMovie = (_id: string, watch_date: Date, user_rating: number, rewatch: boolean) => {
  return fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/history/${_id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      watch_date,
      user_rating,
      rewatch
    }),
    headers: {
      'Content-Type': 'application/json',
    },
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

export const deleteHistoryMovie = async (user_id: string, _id: string ) => {
  return await fetch(`${process.env.REACT_APP_MONGO_API_BASE_URL}/history/${user_id}/${_id}`, {
    method: 'DELETE',
  });
};