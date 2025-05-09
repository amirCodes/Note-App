"use client";
import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import { TrashIcon, ArchiveBoxIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";

const MainPage = () => {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });

  const handleAddNote = (newNote) => {
    const updatedNotes = [...notes, { ...newNote, id: Date.now(), archived: false }];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    console.log(updatedNotes);
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

  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <div className="w-full">
      <TopNavBar />
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <AddNote onAddNote={handleAddNote} />
      </div>
      <div className="w-full">
        <div className="">
          {notes.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No notes yet. Click "Add Note" to create one!
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Active Notes</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeNotes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow group relative"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
                      <button
                        onClick={() => handleArchiveToggle(note.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors mr-1"
                        title="Archive note"
                      >
                        <ArchiveBoxIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete note"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold pr-8">{note.title}</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{note.description}</p>
                  </div>
                ))}
              </div>

              {archivedNotes.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-4 mt-8">Archived Notes</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {archivedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow group relative"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
                          <button
                            onClick={() => handleArchiveToggle(note.id)}
                            className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors mr-1"
                            title="Unarchive note"
                          >
                            <ArchiveBoxXMarkIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete note"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold pr-8">{note.title}</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{note.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
