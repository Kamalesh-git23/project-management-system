import React from 'react'

function TaskForm({ formData, setFormData}) {

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        setFormData(prev => ({
            ...prev,
            attachments:[
                ...(prev.attachments || []),

                ...files.map(file => ({
                    name:file.name,
                    size:file.size,
                    type:file.type
                }))
            ]
        }));
    };

    return (
        <form className="task-form">

            <div className="form-section">
                <h3>Task Information</h3>

                <label>Task Title*</label>
                <input type='text' name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} />

                <label>Description*</label>
                <textarea name="description" placeholder="Task Description" value={formData.description} onChange={handleChange} />

                <label>Task Type*</label>
                <input type='text' name="type" placeholder="Task Type" value={formData.type} onChange={handleChange} />

            </div>


            <div className="form-section">
                <h3>Scheduling</h3>

                <label>Due Date*</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />

                <label>Due Time*</label>
                <input type="time" name="dueTime" value={formData.dueTime} onChange={handleChange} />

            </div>


            <div className="form-section">
                <h3>Workflow</h3>

                <label>Priority*</label>
                <select name="priority" value={formData.priority} onChange={handleChange} >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <label>Status*</label>
                <select name="state" value={formData.state} onChange={handleChange}>
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Done">Done</option>
                </select>

            </div>

            <div className="form-section">
                <h3>Resources</h3>

                <label>Attachments*</label>
                <input type="file" multiple onChange={handleFileChange} />
            </div>

        </form>
  );
}

export default TaskForm;
