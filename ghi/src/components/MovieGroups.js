import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroupId, setEditingGroupId] = useState();
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupData = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups-with-username`
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  if (Object.keys(groups).includes("detail")) {
    return (
      <div className="row justify-content-center m-5">
        <div className="spinner-border alignt-center" role="status">
          <span className="visually-hidden">Error...</span>
          <h1> Unauthorized </h1>
        </div>
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

  return (
    <>
      <section className="container">
        <h2 className="mb-5">All Favorites List</h2>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>List Name</th>
              <th>User</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => {
              return (
                <tr key={group.id}>
                  {group.id === editingGroupId ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                        />
                      </td>
                      <td>{group.username}</td>
                      <td>
                        <button className="btn btn-primary">Save</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <Link
                          className="text-secondary text-decoration-none h5"
                          to={`/groups/${group.id}`}
                        >
                          {group.name}
                        </Link>
                      </td>

                      <td>{group.username}</td>
                      <td>
                        <button className="btn btn-primary">removed</button>
                      </td>
                    </>
                  )}
                  <td>
                    <button className="btn btn-danger">removed</button>
                  </td>
                </tr>
              );
            })}
            <tr>
              {creatingGroup ? (
                <>
                  <td colSpan={3}>
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button className="btn btn-primary">removed</button>
                  </td>
                </>
              ) : (
                <td colSpan={4}>
                  <button className="btn btn-primary">removed</button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default MovieGroups;
