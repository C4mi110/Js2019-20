class Note
{
    constructor(title, desc, color)
    {
        this.title = title;
        this.desc = desc;
        this.color = color;
        this.date = new Date().toDateString();
        this.pinned = false;
    }
    addNoteToLS(note)
    {
        localStorage.setItem("notes", JSON.stringify(note));
    }
    printNote()
    {
        let notesArr = [];
        notesArr = JSON.parse(localStorage.getItem("notes"));
        return notesArr;
    }
}