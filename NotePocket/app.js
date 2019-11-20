document.addEventListener("DOMContentLoaded", appStart)

function appStart()
{
    let titleBox = document.querySelector("#titleBox");
    let descBox = document.querySelector("#descBox");
    let colorBox = document.querySelector("#colorBox");
    let addNoteBtn = document.querySelector("#addNoteBtn");
    let noteContentBox = document.querySelector("#noteContentBox");
    addNoteBtn.addEventListener("click", addNote);
    
}

function addNote()
{
    let note = new Note(titleBox.value, descBox.value, colorBox.value);
    note.addNoteToLS(note);
    let noteData = note.printNote();
    
}