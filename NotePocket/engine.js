class Engine {
    
    notesArr = [];
    constructor() {
        if (typeof localStorage !== 'undefined') {
            if (localStorage.getItem('notes') != null) {
                this.notesArr = JSON.parse(localStorage.getItem('notes'));
                this.show();
            }
        }
    }

    createNewNote(title, text, color, priority) {
        if (this.notesArr.length < 1) {
            this.notesArr.push(new Notes(0, title, text, color, priority));
        } else {
            let maxId = 0;
            this.notesArr.forEach((note) => {
                if (maxId < note.id) {
                    maxId = note.id;
                }
            });
            this.notesArr.push(new Notes(maxId + 1, title, text, color, priority));
        }
        this.saveNotes();
        this.show();
    }

    deleteNote(id) {
        alert('Czy napewno chcesz usunąć notatkę?');
        this.notesArr.forEach((note, i) => {
            if (note.id === id) {
                this.notesArr.splice(i, 1);
            }
        });
        this.saveNotes();
        this.show();
    }

    pickUpNote(id) {
        if (this.notesArr.length < 1) {
            return;
        } else {
            let minPickupId = 0;
            this.notesArr.forEach((note) => {
                if (minPickupId > note.pickupId) {
                    minPickupId = note.pickupId;
                }
            });
            this.notesArr.forEach((note) => {
                if (note.id === id) {
                    console.log(note);
                    note.isPickedUp = true;
                    note.pickupId = minPickupId - 1;
                }
            });
        }
        this.saveNotes();
        this.show();
    }


    unPickUpNote(id) {
        if (this.notesArr.length < 1) {
            return;
        } else {
            this.notesArr.forEach((note, index) => {
                if (note.id === id) {
                    note.isPickedUp = false;
                    note.pickupId = id;
                }
            });
        }
        this.saveNotes();
        this.show();
    }

    show(externalArr) {
        let tempNotesArr
        if(externalArr == null)
        {
        tempNotesArr = this.notesArr.sort((a, b) => {
            return a.pickupId - b.pickupId;
        });
        }
        else
            tempNotesArr = externalArr;
        console.log(tempNotesArr);
        var containerDiv = document.querySelector('.grid-container');
        while (containerDiv.childNodes.length > 2)
            containerDiv.removeChild(containerDiv.lastChild);
        
        tempNotesArr.forEach((note, index) => {
            var NoteBoxDiv = document.createElement('div');
            NoteBoxDiv.className = 'NoteBox';  
            containerDiv.appendChild(NoteBoxDiv);

            var NoteHeaderDiv = document.createElement('div');
            NoteHeaderDiv.className = 'NoteHeader';  
            NoteHeaderDiv.classList.add(note.color);
            var NoteTitleInput = document.createElement("input");
            NoteTitleInput.type = "text";
            NoteTitleInput.value = note.title
            NoteHeaderDiv.appendChild(NoteTitleInput);
            NoteBoxDiv.appendChild(NoteHeaderDiv);

            var noteBodyDiv = document.createElement('div');
            noteBodyDiv.className = 'NoteBody';
            var NoteBodyInput = document.createElement("textarea");  
            NoteBodyInput.value = note.text;
            noteBodyDiv.appendChild(NoteBodyInput);
            NoteBoxDiv.appendChild(noteBodyDiv);

            var NoteFooterDiv = document.createElement('div');
            NoteFooterDiv.className = "NoteFooter";
            var NoteDateSpan = document.createElement('span');
            var NoteDateNode = document.createTextNode(note.createDate);
            var APinButton = document.createElement("a");
            APinButton.innerHTML = "Pin";
            APinButton.className = "submitBtn";
            if (note.isPickedUp === false) {
                APinButton.innerHTML = "Pin";
                APinButton.addEventListener ("click", function(){engine.pickUpNote(note.id);});
                NoteBoxDiv.classList.add("unPinned");
            } else {
                APinButton.innerHTML = "Unpin";
                APinButton.addEventListener ("click", function(){engine.unPickUpNote(note.id);});
                NoteBoxDiv.classList.add("pinned");
            }
            var ADeleteButton = document.createElement("a");
            ADeleteButton.innerHTML = "X";
            ADeleteButton.className = "submitBtn";
            ADeleteButton.addEventListener ("click", function(){engine.deleteNote(note.id);});
            NoteDateSpan.appendChild(NoteDateNode);
            NoteFooterDiv.appendChild(NoteDateSpan);
            NoteFooterDiv.appendChild(APinButton);
            NoteHeaderDiv.appendChild(ADeleteButton);
            NoteBoxDiv.appendChild(NoteFooterDiv);

        });
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notesArr));
    }
    
    searchNotes(text){
        let searchedArr = [];
        
        for (var n in this.notesArr)
            {
                if(this.notesArr[n].title.includes(text) || this.notesArr[n].text.includes(text))
                    searchedArr.push(this.notesArr[n]);
            }
            if(searchedArr.length>0)
                this.show(searchedArr);
    }
}