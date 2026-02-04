import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [title,settitle]=useState("");
  const[description,setdescription]=useState("");
  const[notes,setnotes]=useState([]);

  const fetchNotes=async()=>{
    const res=await
    axios.get("https://note-backend-j8r9.onrender.com/note");
    setnotes(res.data);
  };
  useEffect(()=>{
    fetchNotes();
  },[]);

const addNote = async () => {
await axios.post("https://note-backend-j8r9.onrender.com/note", {
  title,
  description
});

  settitle("");
  setdescription("");
  fetchNotes();
};

  const deleteNote=async(id)=>{
    await
    axios.delete(`https://note-backend-j8r9.onrender.com/note/${id}`);
    fetchNotes();
  };
  return (
    <div className='container'>
      <h2>Notes App</h2>
      <div className='form'>
      <input placeholder='Title'
      value={title}
      onChange={e=>settitle(e.target.value)} />
      <br />
      
      <textarea placeholder='Description'
      value={description}
      onChange={e=>setdescription(e.target.value)} />
      <br />

      <button onClick={addNote}>Add Note</button>
      </div>
      <hr />
      
      
      <div className='notes-grid'>
      {
        notes.map(note=>(
          <div className ="note-card" key={note._id}>
            <h4>{note.title}</h4>
            <p>{note.description}</p>
            <button onClick={()=>deleteNote(note._id)}>Delete</button>
            <hr />
            </div>
        ))
      }
    </div></div>
  ) 
}

export default App