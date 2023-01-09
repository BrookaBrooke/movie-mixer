import React, { useState, useEffect } from "react";

const MovieGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/movie-groups");
        const data = await response.json();
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
              <td>{group.name}</td>
              <td>{group.owner}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieGroups;
