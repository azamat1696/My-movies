import React from 'react';
import { Link } from 'react-router-dom';

class  SearchBar extends React.Component {

   /*  state = {
        query : ""
    }
 */
handleFormSubmit = (event) => {
    event.preventDefault();
}


    render() {
        
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row">
          <div className="col-10" >
          <input 
          onChange={this.props.searchMovieProp} 
          className="form-control" 
          type="text" 
          placeholder="Search a movie" 
          />
          </div>
          <div className="col-2">
          <Link to="/add" type="button" className="btn btn-md btn-danger" 
          style={{float:"right"}}
          >Add Movie</Link>
          </div>
          </div>  
      </form> 
      
           
    )
    }
} 

export default SearchBar;
