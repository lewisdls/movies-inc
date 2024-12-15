const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBkYzE0Njg5YjRjMGUyOWRkNzcyMmJjYmExYTU3MCIsIm5iZiI6MTczNDA1MTc3NC42ODEsInN1YiI6IjY3NWI4N2JlMDJhM2QzMzBjNWVlNTFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YV32kZCxjCjEe2fnXFGF-zQG5_YmflczcMRi4EnRFeY",
  },
};

export const getNowPlayingMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/account/21685060/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
      options
    );

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieStatesById = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/account_states`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCastById = async (movieId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      options
    );
    const data = await res.json();
    return data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilarMoviesById = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const addRating = async (movieId, rating) => {
  const postingOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBkYzE0Njg5YjRjMGUyOWRkNzcyMmJjYmExYTU3MCIsIm5iZiI6MTczNDA1MTc3NC42ODEsInN1YiI6IjY3NWI4N2JlMDJhM2QzMzBjNWVlNTFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YV32kZCxjCjEe2fnXFGF-zQG5_YmflczcMRi4EnRFeY",
    },
    body: JSON.stringify({ value: rating }),
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating`,
      postingOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding rating:", error);
  }
};

export const addFavorite = async (movieId) => {
  const postingOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBkYzE0Njg5YjRjMGUyOWRkNzcyMmJjYmExYTU3MCIsIm5iZiI6MTczNDA1MTc3NC42ODEsInN1YiI6IjY3NWI4N2JlMDJhM2QzMzBjNWVlNTFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YV32kZCxjCjEe2fnXFGF-zQG5_YmflczcMRi4EnRFeY",
    },
    body: JSON.stringify({
      media_id: movieId,
      media_type: "movie",
      favorite: true,
    }),
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/account/21685060/favorite`,
      postingOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFavorite = async (movieId) => {
  const postingOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTBkYzE0Njg5YjRjMGUyOWRkNzcyMmJjYmExYTU3MCIsIm5iZiI6MTczNDA1MTc3NC42ODEsInN1YiI6IjY3NWI4N2JlMDJhM2QzMzBjNWVlNTFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YV32kZCxjCjEe2fnXFGF-zQG5_YmflczcMRi4EnRFeY",
    },
    body: JSON.stringify({
      media_id: movieId,
      media_type: "movie",
      favorite: false,
    }),
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/account/21685060/favorite`,
      postingOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
