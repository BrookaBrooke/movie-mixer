import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const MyMovieGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroupId, setEditingGroupId] = useState();
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupData = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups-by-user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
            },
          }
        );
        const data = await groupData.json();
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateGroup = () => {
    setCreatingGroup(true);
    setFormValues({ name: "" });
    setEditingGroupId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    if (formValues.name.length > 0) {
      setErrorMessage("");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
            },
            body: JSON.stringify({ ...formValues, owner: 1 }),
          }
        );
        const data = await response.json();
        setGroups([...groups, data]);
        setFormValues({
          name: "",
        });
        setCreatingGroup(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage("List name cannot be empty");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const group = groups.find((group) => group.id === editingGroupId);
      const owner = group.owner;
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups/${editingGroupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
          },
          body: JSON.stringify({ ...formValues, owner }),
        }
      );
      const data = await response.json();
      setGroups(
        groups.map((group) => {
          if (group.id === data.id) {
            return data;
          }
          return group;
        })
      );
      setFormValues({
        name: "",
      });
      setEditingGroupId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (groupId) => {
    try {
      await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups/${groupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("leadsToken")}`,
          },
        }
      );
      setGroups(groups.filter((group) => group.id !== groupId));
    } catch (error) {
      console.error(error);
    }
  };

  if (Object.keys(groups).includes("detail")) {
    if (groups.detail === "Invalid token") {
      navigate("/login");
    } else {
      navigate("/groups");
    }
    return (
      <div className="row justify-content-center m-5">
        <div className="spinner-border alignt-center" role="status">
          <span className="visually-hidden">Error...</span>
        </div>
        <h1> yOU aRe Not Logged in! </h1>
      </div>
    );
  }
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
    <>
      <div className="login-background">
        <div className="container-fluid m-0 p-0">
          <div className="offset-2 container-fluid">
            <div className="list-box mt-5">
              <h1 id="title-lists" className="text-center">
                {localStorage.getItem("username")}'s Movie Lists
              </h1>

              <section className="container-fluid  col-11 mb-1 ">
                <div className="">
                  <table className="table table-dark table-hover list-table">
                    <thead>
                      <tr>
                        <th className="p-3">Name</th>
                        <th></th>
                        {/* This is here if we add a feature for a user to add other users' lists to their own collection of lists, it can be commented out or removed if not needed in the end */}
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="list-body">
                      {groups.map((group) => {
                        return (
                          <tr key={group.id}>
                            {group.id === editingGroupId ? (
                              <>
                                <td className="ps-3">
                                  <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                  />
                                </td>
                                <td></td>
                                <td>
                                  <button
                                    className="btn btn-primary me-3"
                                    onClick={handleSubmit}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                      setEditingGroupId(null);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="ps-3">
                                  <Link
                                    className="text-secondary text-decoration-none h5"
                                    to={`/groups/${group.id}`}
                                  >
                                    {group.name}
                                  </Link>
                                </td>

                                <td></td>
                                <td>
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() => {
                                      setEditingGroupId(group.id);
                                      setFormValues({ name: group.name });
                                      setCreatingGroup(false);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </>
                            )}
                            <td>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(group.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        {creatingGroup ? (
                          <>
                            <td className="p-3" colSpan={2}>
                              <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                              />
                            </td>
                            <td className="pt-3 pb-3">
                              <button
                                className="btn btn-primary"
                                onClick={handleCreate}
                              >
                                Create
                              </button>
                            </td>
                            <td className="pt-3 pb-3">
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  setCreatingGroup(false);
                                }}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <td className="p-3" colSpan={4}>
                            <button
                              className="btn btn-outline-primary"
                              onClick={handleCreateGroup}
                            >
                              Create a movie group
                            </button>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ErrorMessage message={errorMessage} />
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={goBack}
                    className="btn btn-lg btn-dark"
                  >
                    Go back
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMovieGroups;
