const notesContainer = document.getElementById("container");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.title, note.text);
    notesContainer.insertBefore(noteElement, addNoteButton);
});
  
addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, title, text) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    const titleElement = document.createElement("textarea");
    titleElement.classList.add("title");
    titleElement.rows = 1;
    titleElement.placeholder = "Title here...";
    const hr = document.createElement("hr");
    const textElement = document.createElement("textarea");
    textElement.classList.add("text");
    textElement.placeholder = "What needs to be done...";
    noteElement.appendChild(titleElement);
    noteElement.appendChild(hr);
    noteElement.appendChild(textElement);

    titleElement.value = title;
    textElement.value = text;

    noteElement.addEventListener("change", () => {
        updateNote(id, titleElement.value, textElement.value);
    });
    
    noteElement.addEventListener("dblclick", () => {
        const doDelete = confirm(
          "Are you sure you wish to delete this sticky note?"
        );
    
        if (doDelete) {
          deleteNote(id, noteElement);
        }
    });

    return noteElement;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        title: "",
        text: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.title, noteObject.text);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newTitle, newText) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];

    targetNote.title = newTitle;
    targetNote.text = newText;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}