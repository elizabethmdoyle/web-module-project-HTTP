import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate  } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import EditMovieForm from './components/EditMovieForm';

import AddMovieForm from "./components/AddMovieForm";

import axios from 'axios';


const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    // Make a DELETE request using Axios - axios request is in the movie.js file and the request below is to filter through the movies by the id, so that it will only delete the one selected by the id
    // On success update the movies list in state
    // and navigate the user to /movies
    // Hand this function down to the correct component

    setMovies(movies.filter(item =>(item.id !== Number(id))))

  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>

            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies}/>} />
            <Route path="movies/edit/:id" element={<EditMovieForm  setMovies={setMovies} />}  />

            <Route path="movies/:id" element={<Movie movies={movies} deleteMovie={deleteMovie}/>} />

            <Route path="movies" element={<MovieList movies={movies}  />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
