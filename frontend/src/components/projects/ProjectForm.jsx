import React from "react";

function ProjectForm({
  formData,
  setFormData,
}) {
  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  return (
    <form className="project-form">
      <div className="form-section">
        <h3>
          Project Information
        </h3>

        <label>
          Project Name *
        </label>

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={
            handleChange
          }
          required
        />

        <label>
          Description *
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          required
        />

        <label>
          Project Type *
        </label>

        <input
          type="text"
          name="type"
          placeholder="Web Development"
          value={formData.type}
          onChange={
            handleChange
          }
          required
        />
      </div>

      <div className="form-section">
        <h3>Timeline</h3>

        <label>
          Start Date *
        </label>

        <input
          type="date"
          name="startDate"
          value={
            formData.startDate
          }
          onChange={
            handleChange
          }
          required
        />

        <label>
          End Date *
        </label>

        <input
          type="date"
          name="endDate"
          value={
            formData.endDate
          }
          onChange={
            handleChange
          }
          required
        />
      </div>

      <div className="form-section">
        <h3>
          Project Management
        </h3>

        <label>
          Priority *
        </label>

        <select
          name="priority"
          value={
            formData.priority
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Priority
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>

        <label>
          Team Members *
        </label>

        <input
          type="text"
          name="teamMembers"
          placeholder="Kamalesh, John"
          value={
            formData.teamMembers
          }
          onChange={
            handleChange
          }
          required
        />

        <label>
          Status *
        </label>

        <select
          name="status"
          value={
            formData.status
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="On Hold">
            On Hold
          </option>
        </select>
      </div>
    </form>
  );
}

export default ProjectForm;