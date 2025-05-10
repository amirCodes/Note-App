
import { TrashIcon, ArchiveBoxIcon, PencilIcon } from "@heroicons/react/24/outline";

const ActiveNotes = ({ notes, onArchive, onDelete, onEdit }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No active notes found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow group relative"
        >
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
            <button
              onClick={() => onEdit(note)}
              className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors mr-1"
              title="Edit note"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onArchive(note.id)}
              className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors mr-1"
              title="Archive note"
            >
              <ArchiveBoxIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
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
  );
};

export default ActiveNotes;
