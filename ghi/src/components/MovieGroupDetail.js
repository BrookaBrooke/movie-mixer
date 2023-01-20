import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MovieGroupDetail = () => {
  const [movieGroup, setMovieGroup] = useState(null);
  const [movieItems, setMovieItems] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [token] = useContext(UserContext);


  useEffect(() => {
    const fetchMovieGroups = async () => {
      try {
        const movieGroupsResponse = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups/${id}`
        );
        const movieGroupData = await movieGroupsResponse.json();
        setMovieGroup(movieGroupData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieGroups();
  }, [id]);

  useEffect(() => {
    if (!movieGroup) {
      return;
    }
    const fetchMovieItems = async () => {
      try {
        const movieItemsResponse = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${id}`
        );
        const movieItemsData = await movieItemsResponse.json();
        setMovieItems(movieItemsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieItems();
  }, [movieGroup, id]);

  const fetchMovies = async () => {
    if (movieItems.length === 0) {
      return;
    }
    try {
      const movieIdList = movieItems.map((item) => item.movie_id);
      const movieIds = movieIdList.join(",");
      const movieResponse = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movies/ids/${movieIds}`
      );
      const movieData = await movieResponse.json();
      setMovies(movieData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchMovies();
    setLoading(false);
  }, [movieItems]);





    // let list = [1,2,3,4,5,6,7,'']
    let sourceElement = null

    // const [sortedList, setMovies] = React.useState(list)

    /* add a new entry at the end of the list.  */
    // const newLine = () => {
    //   console.log(sortedList)
    //   setMovies(sortedList.concat(''))
    // }

    /* change opacity for the dragged item.
    remember the source item for the drop later */
    const handleDragStart = (event) => {
      event.target.style.opacity = 0.5
      sourceElement = event.target
      event.dataTransfer.effectAllowed = 'move'
    }

    /* do not trigger default event of item while passing (e.g. a link) */
    const handleDragOver = (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    }

    /* add class .over while hovering other items */
    const handleDragEnter = (event) => {
      event.target.classList.add('over')
    }

    /* remove class .over when not hovering over an item anymore*/
    const handleDragLeave = (event) => {
      event.target.classList.remove('over')
    }

    const handleDrop = (event) => {
      /* prevent redirect in some browsers*/
      event.stopPropagation()

      /* only do something if the dropped on item is
      different to the dragged item*/
      if (sourceElement !== event.target) {

        /* remove dragged item from list */
        const list = movies.filter((item, i) =>
          i.toString() !== sourceElement.id)

        /* this is the removed item */
        const removed = movies.filter((item, i) =>
          i.toString() === sourceElement.id)[0]

        /* insert removed item after this number. */
        let insertAt = Number(event.target.id)

        console.log('list with item removed', list)
        console.log('removed:  line', removed)
        console.log('insertAt index', insertAt)

        let tempList = []

        /* if dropped at last item, don't increase target id by +1.
           max-index is arr.length */
        if (insertAt >= list.length) {
          tempList = list.slice(0).concat(removed)
          setMovies(tempList)
          event.target.classList.remove('over')
        } else
        if ((insertAt < list.length)) {
        /* original list without removed item until the index it was removed at */
          tempList = list.slice(0,insertAt).concat(removed)

          console.log('tempList', tempList)
          console.log('insert the rest: ', list.slice(insertAt))

          /* add the remaining items to the list */
          const newList = tempList.concat(list.slice(
            insertAt))
          console.log('newList', newList)

          /* set state to display on page */
          setMovies(newList)
          event.target.classList.remove('over')
        }
      }
      else console.log('nothing happened')
      event.target.classList.remove('over')
    }

    const handleDragEnd = (event) => {
      event.target.style.opacity = 1
      console.log('-------------------------------------------------------------')
    }

    /* log changes in current input field */
    const handleChange = (event) => {
      event.preventDefault()
      console.log('event.target.value', event.target.value)

      /* create new list where everything stays the same except that the current
      item replaces the existing value at this index */
      const list = movies.map((item, i) => {
        if (i !== Number(event.target.id)) {
          return item }
        else return event.target.value
      })
      setMovies(list)
    }

    const handleUpdate = async () => {
      const ordered_data = movies.map( (item, i) => ( {"id": item.id, "item_position": i,} ) )
        console.log(ordered_data)
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
              },
              body: JSON.stringify( ordered_data ),
            }
          );
          const data = await response.json();

        } catch (error) {
          console.error(error);
        }

    };

    /* filter list where only items with id unequal to current id's are allowed */
    const handleDelete = async (event) => {
      event.preventDefault()
      const item_id = movies[event.target.id].id
      console.log(item_id)
      const list = movies.filter((item, i) =>
        i !== Number(event.target.id))
      console.log(event.target.id)
      try {
        await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${item_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
      setMovies(list)
    }
    const handleEditMode = (event) => {
      event.preventDefault();
      setEditMode(true);}

    const handleCancel = async (event) => {
      event.preventDefault()
      setEditMode(false);
      fetchMovies();
      // fetch data again

    }

    /* create list of items */
    const listItems = () => {

      return movies?.map((item, i) => (
        <div key={i} className='dnd-list'>
       <div className="number-movies">
        {i+1}
        </div>
        { editMode && (
          <span
            id={i}
            className='input-item'
            draggable='true'
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onChange={handleChange}
          >
          {/* <Link className="text-secondary text-decoration-none h5"
                          to={`/movie-detail/${item.api3_id}`}> */}
                          {item.title}
          {/* </Link> */}
          </span>
          )}
          { !editMode && (
          <span
            id={i}
            className='input-item'
          >
          <Link className="text-secondary text-decoration-none h5"
                          to={`/movie-detail/${item.api3_id}`}>
                          {item.title}
          </Link>
          </span>
          )}
          { editMode && (<div id={i} className='delButton' onClick={handleDelete}>X</div>) }
        </div>
      )
      )
    }


    console.log('sorted', movies)

    // return (
    //   <div className='page'>
    //     <div className='container'>
    //       <h1 style={{ color: "white", textAlign: "center" }}>Today</h1>
    //       {listItems()}
    //       <button className='addButton' onClick={() => newLine()}>+</button>
    //     </div>
    //   </div>
    // )



  // ReactDOM.render(<App />, document.getElementById("root"));

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }



    return (
      <div className='page'>
        <div className='container'>
          <h1 style={{ color: "white", textAlign: "center" }}>{movieGroup?.name}</h1>
          {listItems()}
          {/* <button className='addButton' onClick={() => newLine()}>+</button> */}
          { !editMode && (<button className="btn btn-primary" onClick={handleEditMode}>
            Edit List
            </button> ) }
          { editMode && (<button className="btn btn-success" onClick={handleUpdate}>
            Save order
            </button> ) }
            <p></p>
          { editMode && (<button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
            </button>) }

        </div>
      </div>
    )





  };
//     <div className="container">
//       <h1 className="mb-3">{movieGroup && movieGroup.name}</h1>
//       <table className="table table-striped table-responsive">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Released</th>
//             <th>Plot</th>
//             <th>Rated</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map((movie) => (
//             <tr key={movie.id}>
//               <td>
//                 <Link
//                   className="text-secondary text-decoration-none h5"
//                   to={`/movie-detail/${movie.imdbID}`}
//                 >
//                   {movie.title}
//                 </Link>
//               </td>
//               <td>{movie.released}</td>
//               <td>{movie.plot}</td>
//               <td>{movie.vote_avr}</td>
//               <td>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteMovie(movie.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {movieItems.length === 0 && (
//         <div className="text-center">No movies in this group yet</div>
//       )}
//     </div>
//   );
// };

export default MovieGroupDetail;
