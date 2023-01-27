import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const MovieGroupDetail = () => {
  const [movieGroup, setMovieGroup] = useState(null);
  const [movieItems, setMovieItems] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState([]);
  const [ownerEditAllowed, setOwnerEditAllowed] = useState(false);
  const navigate = useNavigate();
  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Click for details</strong>
    </Tooltip>
  );
  const tooltipEdit = (
    <Tooltip id="tooltipEdit">Click and drag to change order</Tooltip>
  );

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
    fetchMovieItems();
    setLoading(false);
  }, [fetchMovieItems, id]);

  useEffect(() => {
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
    if (!movieGroup) {
      return;
    }
    fetchMovieItems();

    if (movieGroup.owner === parseInt(localStorage.getItem("user_id"))) {
      setOwnerEditAllowed(true);
    } else {
      setOwnerEditAllowed(false);
    }
  }, [fetchMovieItems, movieGroup, id]);

  let sourceElement = null;

  const handleDragStart = (event) => {
    event.target.style.opacity = 0.5;
    sourceElement = event.target;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event) => {
    event.target.classList.add("over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  const handleDrop = (event) => {
    event.stopPropagation();

    if (sourceElement !== event.target) {
      const list = movieItems.filter(
        (item, i) => i.toString() !== sourceElement.id
      );

      const removed = movieItems.filter(
        (item, i) => i.toString() === sourceElement.id
      )[0];

      let insertAt = Number(event.target.id);
      let tempList = [];

      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed);
        setMovieItems(tempList);
        event.target.classList.remove("over");
      } else if (insertAt < list.length) {
        tempList = list.slice(0, insertAt).concat(removed);
        const newList = tempList.concat(list.slice(insertAt));
        setMovieItems(newList);
        event.target.classList.remove("over");
      }
    }
    event.target.classList.remove("over");
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  const handleChange = (event) => {
    event.preventDefault();

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

  const handleDelete = (event) => {
    event.preventDefault();
    const item_id = movieItems[event.target.id].id;
    deleteQueue.push(item_id);
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

  const listItems = () => {
    return movieItems?.map((item, i) => (
      <div key={i} className="dnd-list">
        <div className="number-movies">{i + 1}</div>
        {editMode && (
          <OverlayTrigger placement="left" overlay={tooltipEdit}>
            <div
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
            </div>
          </OverlayTrigger>
        )}
        {!editMode && (
          <OverlayTrigger placement="left" overlay={tooltip}>
            <span id={i} className="input-item">
              <Link
                className="text-secondary text-decoration-none h5"
                to={`/movie-detail/${item.api3_id}`}
              >
                {item.title}
              </Link>
            </span>
          </OverlayTrigger>
        )}
        {editMode && (
          <>
            <div id={i} className="delButton" onClick={handleDelete}>
              X
            </div>
          </>
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
    <div className="page pt-5">
      <div className="container">
        <h1 className=" pt-5" style={{ color: "white", textAlign: "center" }}>
          {movieGroup?.name}
        </h1>
        {listItems()}
        {movieItems.length === 0 && (
          <div className="text-center text-light">
            No movies in this group yet
          </div>
        )}
        <span>
          {!editMode && ownerEditAllowed && movieItems.length > 0 && (
            <button
              type="button"
              className="btn btn-outline-primary m-3"
              onClick={handleEditMode}
            >
              Edit List
            </button>
          )}
          {editMode && (
            <>
              <button className="btn btn-success m-3" onClick={handleUpdate}>
                Save changes
              </button>

              <button className="btn btn-secondary m-3" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </span>
        <div>
          <p></p>

          <button type="button" onClick={goBack} className="btn btn-dark m-3 ">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieGroupDetail;
