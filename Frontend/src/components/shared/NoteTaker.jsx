import { useState } from "react";

const NoteTaker = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const handleSave = () => {
    if (!title && !note) return;
    setSavedNotes(prev => [...prev, { title, note }]);
    setTitle("");
    setNote("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-base-200 rounded-box shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Take a Note 📝</h2>

      <input
        type="text"
        placeholder="Note Title"
        className="input input-bordered w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note here..."
        className="textarea textarea-bordered w-full h-32 mb-3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="btn btn-primary w-full" onClick={handleSave}>
        Save Note
      </button>

      {/* Optional: Show Saved Notes */}
      {savedNotes.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold">Saved Notes</h3>
          {savedNotes.map((n, i) => (
            <div key={i} className="card bg-base-100 shadow-md p-3">
              <h4 className="font-bold">{n.title || "Untitled"}</h4>
              <p className="text-sm">{n.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteTaker;
