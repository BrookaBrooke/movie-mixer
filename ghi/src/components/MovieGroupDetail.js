import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MovieGroupDetail = () => {
  const [movieGroup, setMovieGroup] = useState(null);
  const [movieItems, setMovieItems] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [token] = useContext(UserContext);
  const [deleteQueue, setDeleteQueue] = useState([]);
  const [ownerEditAllowed, setOwnerEditAllowed] = useState(false);
  const navigate = useNavigate();

  const fetchMovieItems = async () => {
    try {
      const movieItemsResponse = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${id}`
      );
      const movieItemsData = await movieItemsResponse.json();
      setMovieItems(movieItemsData);
      console.log("movieItemsData: ", movieItemsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMovieGroups = async () => {
      try {
        const movieGroupsResponse = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups/${id}`
        );
        console.log(movieGroupsResponse);
        const movieGroupData = await movieGroupsResponse.json();
        console.log(movieGroupData);
        setMovieGroup(movieGroupData);
        console.log("movieGroupData: ", movieGroupData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieGroups();
    fetchMovieItems();
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!movieGroup) {
      return;
    }
    fetchMovieItems();
    console.log("movieGroup.owner: ", movieGroup.owner, "1");
    console.log("localstorage.owner: ", parseInt(localStorage.getItem("user_id")) );
    if ( movieGroup.owner === parseInt(localStorage.getItem("user_id"))) {
      setOwnerEditAllowed(true);
      console.log("show edit button: make true", ownerEditAllowed, movieGroup.owner, localStorage.getItem("user_id") );
    }
    else {
      setOwnerEditAllowed(false);
      console.log("show edit button: make false", ownerEditAllowed, movieGroup.owner, parseInt(localStorage.getItem("user_id")) );
    };
  }, [movieGroup, id]);

  let sourceElement = null;

  // const [sortedList, setMovies] = React.useState(list)

  /* add a new entry at the end of the list.  */
  // const newLine = () => {
  //   console.log(sortedList)
  //   setMovies(sortedList.concat(''))
  // }

  /* change opacity for the dragged item.
    remember the source item for the drop later */
  const handleDragStart = (event) => {
    event.target.style.opacity = 0.5;
    sourceElement = event.target;
    event.dataTransfer.effectAllowed = "move";
  };

  /* do not trigger default event of item while passing (e.g. a link) */
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  /* add class .over while hovering other items */
  const handleDragEnter = (event) => {
    event.target.classList.add("over");
  };

  /* remove class .over when not hovering over an item anymore*/
  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  const handleDrop = (event) => {
    /* prevent redirect in some browsers*/
    event.stopPropagation();

    /* only do something if the dropped on item is
      different to the dragged item*/
    if (sourceElement !== event.target) {
      /* remove dragged item from list */
      const list = movieItems.filter(
        (item, i) => i.toString() !== sourceElement.id
      );

      /* this is the removed item */
      const removed = movieItems.filter(
        (item, i) => i.toString() === sourceElement.id
      )[0];

      /* insert removed item after this number. */
      let insertAt = Number(event.target.id);

      // console.log('list with item removed', list)
      // console.log('removed:  line', removed)
      // console.log('insertAt index', insertAt)

      let tempList = [];

      /* if dropped at last item, don't increase target id by +1.
           max-index is arr.length */
      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed);
        setMovieItems(tempList);
        event.target.classList.remove("over");
      } else if (insertAt < list.length) {
        /* original list without removed item until the index it was removed at */
        tempList = list.slice(0, insertAt).concat(removed);

        // console.log('tempList', tempList)
        // console.log('insert the rest: ', list.slice(insertAt))

        /* add the remaining items to the list */
        const newList = tempList.concat(list.slice(insertAt));
        // console.log('newList', newList)

        /* set state to display on page */
        setMovieItems(newList);
        event.target.classList.remove("over");
      }
    } else console.log("nothing happened");
    event.target.classList.remove("over");
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
    console.log(
      "-------------------------------------------------------------"
    );
  };

  /* log changes in current input field */
  const handleChange = (event) => {
    event.preventDefault();
    // console.log('event.target.value', event.target.value)

    /* create new list where everything stays the same except that the current
      item replaces the existing value at this index */
    const list = movieItems.map((item, i) => {
      if (i !== Number(event.target.id)) {
        return item;
      } else return event.target.value;
    });
    setMovieItems(list);
  };

  const handleUpdate = async () => {
    const ordered_data = movieItems.map((item, i) => ({
      id: item.id,
      item_position: i,
    }));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
          },
          body: JSON.stringify(ordered_data),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }

    deleteQueue?.map(async (item_id) => {
      try {
        console.log("deleting item id: ", item_id);
        await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${item_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    });

    setDeleteQueue([]);
    setEditMode(false);
  };

  /* filter list where only items with id unequal to current id's are allowed */
  const handleDelete = (event) => {
    event.preventDefault();
    const item_id = movieItems[event.target.id].id;
    deleteQueue.push(item_id);
    console.log("deleteQueue: ", deleteQueue);
    const list = movieItems.filter((item, i) => i !== Number(event.target.id));

    setMovieItems(list);
  };
  const handleEditMode = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    setEditMode(false);
    setDeleteQueue([]);

    fetchMovieItems();
  };

  /* create list of items */
  const listItems = () => {
    return movieItems?.map((item, i) => (
      <div key={i} className="dnd-list">
        <div className="number-movies">{i + 1}</div>
        {editMode && (
          <span
            id={i}
            className="input-item"
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onChange={handleChange}
          >
            {item.title}
          </span>
        )}
        {!editMode && (
          <span id={i} className="input-item">
            <Link
              className="text-secondary text-decoration-none h5"
              to={`/movie-detail/${item.api3_id}`}
            >
              {item.title}
            </Link>
          </span>
        )}
        {editMode && (
          <div id={i} className="delButton" onClick={handleDelete}>
            X
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ color: "white", textAlign: "center" }}>
          {movieGroup?.name}
        </h1>
        {listItems()}
        {movieItems.length === 0 && (
          <div className="text-center text-light">
            No movies in this group yet
          </div>
        )}
        {/* <button className='addButton' onClick={() => newLine()}>+</button> */}
        <span>
          {!editMode && ownerEditAllowed && movieItems.length > 0 && (
            <button className="btn btn-primary" onClick={handleEditMode}>
              Edit List
            </button>
          )}
          {editMode && (
            <button className="btn btn-success" onClick={handleUpdate}>
              Save changes
            </button>
          )}
          <span>. </span>
          {editMode && (
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </span>
        <div>
          <p></p>
          <button type="button" onClick={goBack} class="btn btn-dark">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieGroupDetail;
