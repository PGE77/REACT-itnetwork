import React, { useState, useEffect } from 'react';
import { apiGet, apiDelete } from '../common/api';
import MovieTable from './MovieTable';
import MovieFilter from './MovieFilter';

const MovieIndex = (props) => {
    const [directorListState, setDirectorList] = useState([]);
    const [actorListState, setActorList] = useState([]);
    const [genreListState, setGenreList] = useState([]);
    const [moviesState, setMovies] = useState([]);
    const [filterState, setFilter] = useState({
    directorID: undefined,
    actorID: undefined,
    genre: undefined,
    fromYear: undefined,
    toYear: undefined,
    limit: undefined,
    });


   const deleteMovie = async (id) => {
      await apiDelete("/api/movies/" + id);
      setMovies(moviesState.filter((movie) => movie._id !== id));
   };

    useEffect(() => {
        apiGet('/api/directors').then((data) => setDirectorList(data));
        apiGet('/api/actors').then((data) => setActorList(data));
        apiGet('/api/genres').then((data) => setGenreList(data));
        apiGet('/api/movies').then((data) => setMovies(data));
    }, []);

    const handleChange = (e) => {
        // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value}
            });
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = filterState;

    const data = await apiGet("/api/movies", params);
    setMovies(data);
  };

    return (
        <div>
            <h3>Seznam filmů</h3>
            <hr />
            <MovieFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                directorList={directorListState}
                actorList={actorListState}
                genreList={genreListState}
                filter={filterState}
                confirm="Filtrovat filmy"
            />
            <hr />
            <MovieTable deleteMovie={deleteMovie} items={moviesState} label="Počet filmů:" />
        </div>
    );
};

export default MovieIndex;
