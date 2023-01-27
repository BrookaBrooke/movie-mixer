import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroupId, setEditingGroupId] = useState();
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
  });
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate(-1);
  };


    return (
      <>
        <div className="login-background">
        <div className="container-fluid m-0 p-0">
        <div className="offset-2 container-fluid">
            <div className="list-box mt-5">
              <h1 id="title-lists" className="text-center">Community Movie Lists</h1>

          <section className="container-fluid  col-11 mb-1 ">
            <div className="">
            <table  className="table table-dark table-hover list-table">
              <thead>
                <tr>
                  <th className="p-3">List Name</th>
                  <th className="pt-3 pb-3">User</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  return (
                    <tr key={group.id}>
                      {
                        <>
                          <td className="ps-3" >
                            <Link
                              className="text-secondary text-decoration-none h5"
                              to={`/groups/${group.id}`}
                            >
                              {group.name}
                            </Link>
                          </td>

                          <td>{group.username}</td>
                        </>
                      }
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            <div className="pt-4">
              <button type="button" onClick={goBack} class="btn btn-lg btn-dark">
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

  export default MovieGroups;
