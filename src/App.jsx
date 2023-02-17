import { useState, useEffect } from "react";

import './App.css'
import searchIcon from './search.svg'

import MovieCard from './MovieCard'

// key api - c428adbf
const API_URL = "http://www.omdbapi.com?apikey=c428adbf";

function App() {
  
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  // Promisse
  async function fetchDataApi (title) {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
      console.log(data.Search);
  }

  useEffect(() => {
      fetchDataApi('Batman');
  }, [])

  return (
    <div className="App">
        <h1>MovieLand</h1>

        <div className="search">
            <input
            placeholder="search for movies"
            value={searchTitle}
            onChange={(e) => {setSearchTitle(e.target.value)}}
            />
            <img
              src={searchIcon}
              alt="search icon"
              onClick={() => {fetchDataApi(searchTitle)}}
            />
        </div>

        {
          movies?.length > 0
          ? (
            <div className="container">
              {
                movies.map( (movie, key) => 
                    <MovieCard movie={movie} key={key}/>
                )
              }
            </div>
          )
          : (
            <div className="empty">
              
            </div>
          )
        }
        
    </div>
  )
}

export default App;
