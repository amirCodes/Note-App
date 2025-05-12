// client/src/MainPage.jsx
"use client";
import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote, toggleArchive } from './services/api';
// ... other imports

const MainPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (newNote) => {
    try {
      const response = await createNote(newNote);
      setNotes([response.data, ...notes]);
    } catch (err) {
      console.error(err);
      alert('Failed to create note');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete note');
      }
    }
  };

  const handleArchiveToggle = async (id) => {
    try {
      const response = await toggleArchive(id);
      setNotes(notes.map(note => 
        note._id === id ? response.data : note
      ));
    } catch (err) {
      console.error(err);
      alert('Failed to toggle archive status');
    }
  };

  const handleSaveEdit = async (updatedNote) => {
    try {
      const response = await updateNote(updatedNote._id, updatedNote);
      setNotes(notes.map(note => 
        note._id === updatedNote._id ? response.data : note
      ));
      setEditingNote(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update note');
    }
  };

  // ... rest of the component code remains the same
};

export default MainPage;
