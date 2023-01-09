import React, { useState } from "react";

const MovieGroupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "1", // This will need to change once we have user log in, just providing a default value now for testing purposes
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, [event.target.id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formData };

    const GROUPS_URL = "http://localhost:8000/movie-groups/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(GROUPS_URL, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        owner: "1", // Resets to default testing value, probably can be removed once log in is integrated
      };
      setFormData(cleared);
    } else {
      console.error(response);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new movie group</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={formData.name}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieGroupForm;
