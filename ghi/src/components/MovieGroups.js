import React, { useState, useEffect } from "react";

const MovieGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroupId, setEditingGroupId] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupData = await fetch("http://localhost:8000/movie-groups");
        const data = await groupData.json();
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const group = groups.find((group) => group.id === editingGroupId);
      const owner = group.owner;
      const response = await fetch(
        `http://localhost:8000/movie-groups/${editingGroupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
      await fetch(`http://localhost:8000/movie-groups/${groupId}`, {
        method: "DELETE",
      });
      setGroups(groups.filter((group) => group.id !== groupId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
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
                      onChange={handleChange}
                    />
                  </td>
                  <td>{group.owner}</td>
                  <td>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{group.name}</td>
                  <td>{group.owner}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditingGroupId(group.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(group.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieGroups;
