import React, { useEffect, useReducer } from "react";
import notesReducer from "../reducers/notes";
import AddNoteForm from "./AddNoteForm";
import NoteList from "./NoteList";

const NoteApp = () => {
  const [notes, notesDispatch] = useReducer(notesReducer, []);

  const removeNote = (title) => {
    notesDispatch({ type: "REMOVE_NOTE", title });
  };

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData) {
      notesDispatch({ type: "POPULATE_NOTES", notes: notesData });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <h1>Notes</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm notesDispatch={notesDispatch} />
    </div>
  );
};

export default NoteApp;
