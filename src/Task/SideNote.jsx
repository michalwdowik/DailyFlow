import React, { useRef, useEffect } from "react";

function NoteField() {
  const noteRef = useRef("");

  const handleNoteChange = (event) => {
    noteRef.current = event.target.value;
  };

  useEffect(() => {
    noteRef.current = noteRef.current.trim();
  }, []);

  return (
    <textarea
      defaultValue={noteRef.current}
      onChange={handleNoteChange}
      placeholder="Enter your note here"
    />
  );
}

export default NoteField;
