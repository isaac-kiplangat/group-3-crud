import React, { useState } from 'react';

function Students({ name, subject, marks, id, students, setStudents }) {
  const [data, setData] = useState({ name: '', subject: '', marks: '' });
  const [isShown, setIsShown] = useState(false)

  function onDelete() {
    fetch(`http://localhost:3000/studentsData/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        let deletedStudents = students.filter((student) => student.id !== id);
        setStudents(deletedStudents);
      });
  }

  function handleUpdate(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function onUpdate(e) {
    if (data.name.trim() === '' || data.subject.trim() === '' || data.marks.trim() === '') {
      alert('Please provide values for all fields');
      return;
    }
    e.preventDefault();
    fetch(`http://localhost:3000/studentsData/${id}`, {  // Corrected the URL path
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        // Update the data array with the new student data
        const updatedData = students.map((studentData) => {
          if (studentData.id === id) {
            return {
              ...studentData,
              name: data.name,
              subject: data.subject,
              marks: data.marks,
            };
          }
          return studentData;
        });
        setStudents(updatedData); // Corrected this line
        setData({ name: '', subject: '', marks: '' }); // Reset the form data
      });
      onClose()
  }

  function onEdit() {
    setIsShown(true)
  }

  function onClose(){
    setIsShown(false)
  }
  return (
    <div className="view-list">
      <div>    
      <p>name: {name}</p>
      <p>subject: {subject}</p>
        <p>marks: {marks}</p>
      </div>

    {isShown && (
      <form className='update-form' onSubmit={onUpdate}>
      <h3 onClick={onClose}>X</h3>
      <input
      type="text"
      name="name"
      placeholder="Update name"
      value={data.name}
      onChange={handleUpdate} required />

       <input
       type="text"
       name="subject"
      placeholder="Update subject"
      value={data.subject}
      required
      onChange={handleUpdate} />

      <input
        type="number"
        name="marks"
        placeholder="Update marks"
        value={data.marks}
        onChange={handleUpdate}/>
        <br/>
      <button type="Submit" >Update</button>
    </form>
  )}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Students;
