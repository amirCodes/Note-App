"use client";
import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import AddNote from "./components/AddNote";
import Search from "./components/Search";
import ActiveNotes from "./components/ActiveNotes";
import ArchivedNotes from "./components/ArchivedNotes";
import EditNoteModal from "./components/EditNoteModal";

const MainPage = () => {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const handleAddNote = (newNote) => {
    const updatedNotes = [...notes, { ...newNote, id: Date.now(), archived: false }];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const handleArchiveToggle = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleSaveEdit = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditingNote(null);
  };

  const filterNotes = (notes) => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.description.toLowerCase().includes(searchTerm)
    );
  };

  const activeNotes = filterNotes(notes.filter((note) => !note.archived));
  const archivedNotes = filterNotes(notes.filter((note) => note.archived));

  return (
    <div className="w-full">
      <TopNavBar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <AddNote onAddNote={handleAddNote} />
          <Search onSearch={handleSearch} />
        </div>
        <div className="w-full">
          {notes.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No notes yet. Click "Add Note" to create one!
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Active Notes</h2>
              <ActiveNotes
                notes={activeNotes}
                onArchive={handleArchiveToggle}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
              />
              <ArchivedNotes
                notes={archivedNotes}
                onUnarchive={handleArchiveToggle}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
              />
            </>
          )}
        </div>
      </div>

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onSave={handleSaveEdit}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
