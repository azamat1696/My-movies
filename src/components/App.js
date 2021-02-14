import React from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import axios from "axios";
import AddMovie from "./AddMovie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditMovie from "./EditMovie";
require("dotenv").config();
//console.log(process.env.REACT_APP_API_KEY)

class App extends React.Component {
  state = {
    movies: [],

    query: "",
  };
  // fetching data////////////////////////////////////////////////////////////
  /*   async componentDidMount(){
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.log(response)
        const data = await response.json();
        console.log(data)
        this.setState({ movies: data})

    } */
  //Real api
  //https://api.themoviedb.org/3/list/7076300?api_key=${process.env.REACT_APP_API_KEY}&language=tr-TR
  async componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    const response = await axios.get(`http://localhost:3002/movies`);
    // console.log(response)
    this.setState({ movies: response.data });
  }

  /*    deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m =>  m.id !== movie.id
        );

 /*        this.setState({
            movies: newMovieList
        });  
        this.setState(state => ({
            movies : newMovieList
        }))
    } */

  // Fetch api ile delete fonksiyonu

  /*    deleteMovie = async (movie) => {
        const baseURL = `http://localhost:3002/movies/${movie.id}`;
       await fetch(baseURL, {
           method : "DELETE"
       })
        const newMovieList = this.state.movies.filter(
            m =>  m.id !== movie.id
        );

 /* this.setState({
            movies: newMovieList
        });  
        this.setState(state => ({
            movies : newMovieList
        }))
    }
 */
  //REAL WORLD DELETE APİ
  //https://api.themoviedb.org/3/list/7076300/remove_item?media_id=${movie.id}&session_id=${process.env.REACT_APP_SESSION_ID}&api_key=${process.env.REACT_APP_API_KEY}
  // axios api ile delete
  deleteMovie = (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`);

    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    /*  this.setState({
        movies: newMovieList
    });   */

    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  searchMovie = (event) => {
    /*  console.log(event.target.value) */

    this.setState({
      query: event.target.value,
    });
  };

  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));
    
    this.getMovies();

  };

  /*   editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
   
  }
 */
  // EDIT MOVIE
  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie);
    this.getMovies();
  };

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !==
          -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
    //(koşul ? doğru : yanlış)
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row pb-5 pt-2">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    deleteMovieProp={this.deleteMovie}
                    movies={filteredMovies}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                    history.push("/");
                  }}
                />
              )}
            ></Route>

            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                  {...props}
                  onEditMovie={(id, movie) => {
                    this.editMovie(id, movie);
                  }}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
