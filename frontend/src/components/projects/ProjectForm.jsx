import React from 'react'

function ProjectForm({formData, setFormData}) {

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    return (
        <form className="project-form">

            <div className="form-section">

                <h3>Project Information</h3>

                <label >Project Name*</label>
                <input type="text" name='name' placeholder='Project Name' value={formData.name} onChange={handleChange} />
            
                <label >Description*</label>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

                <label >Project Type*</label>
                <input type="text" name='type' placeholder='Type' value={formData.type} onChange={handleChange} />
            
            </div>

            <div className="form-section">
                <h3>Timeline</h3>

                <label >Start Date*</label>
                <input type="date" name='startDate' value={formData.startDate} onChange={handleChange} />

                <label >End Date*</label>
                <input type="date" name='endDate' value={formData.endDate} onChange={handleChange} />

            </div>

            <div className="form-section">
                <h3>Project Management</h3>

                <label >Priority*</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <label >Team Members*</label>
                <input type="text" name='teamMembers' placeholder='Team Members' value={formData.teamMembers} onChange={handleChange} />

                <label >Status*</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="">Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                </select>

            </div>
        </form>
  );
}

export default ProjectForm;
