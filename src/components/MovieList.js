import React from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {


 /*    function handleClick(event) {
       const hi = props.deleteMovieProp(event);
       console.log(hi)
    }
 */

 //truncate 

 const truncateOverview = (string, maxLength) => {
   if (!string) return null ;
   if (string.length <= maxLength) return string ;
   return `${string.substring(0, maxLength)}... `;
 }
  
    return (
      <div className="row">

        {props.movies.map((movie, i) => (

          <div className="col-lg-4" key={i}>
            <div className="card mb-4 shadow-sm">
              <img
                src={movie.imageURL}
                className="card-img-top"
                alt="Matrix"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                  onClick={(e) => props.deleteMovieProp(movie)}
                    type="button"
                    className="btn btn-md btn-outline-danger"
                  >
                    Delete
                  </button>
                    <Link
                     to={`/edit/${movie.id}`}
                    type="button" 
                    className="btn btn-md btn-outline-warning"
                    >Edit</Link>
                  <h2>
                    <span className="badge badge-info">{movie.rating}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

        ))}

      </div>
    );
  }

export default MovieList;
