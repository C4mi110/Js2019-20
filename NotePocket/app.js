engine = new Engine();
let noteTitle, noteBody, noteColor, notePriority;

function addNote(){

    noteTitle = document.querySelector('#noteTitle').value;
    noteBody = document.querySelector('#noteBody').value;
    noteColor = document.querySelector('.NoteHeader').className.split(' ')[1];
    if (document.querySelector("#priority").checked === true)
        notePriority = true;
    else
        notePriority = false;

    engine.createNewNote(noteTitle, noteBody, noteColor, notePriority); 
    document.querySelector('#noteTitle').value = "";
    document.querySelector('#noteBody').value = "";
}

function changeColor(e)
{ 
    let parent = document.querySelector(".NoteHeader");
    parent.classList.remove("blue");
    parent.classList.remove("aqua");
    parent.classList.remove("red");
    parent.classList.remove("yellow");
    parent.classList.remove("blueviolet");
    parent.classList.add(e.className.split(' ')[1]);
}

let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("change",function () {
    engine.searchNotes(searchInput.value);
  })

function notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
      notify();
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          notify();
        }
      });
    }
    
    function notify() {
      var notification = new Notification('TITLE OF NOTIFICATION', {
        icon: 'http://carnes.cc/jsnuggets_avatar.jpg',
        body: "Hey! You are on notice!",
      });
  
      notification.onclick = function () {
        window.open("http://carnes.cc");      
      };
      setTimeout(notification.close.bind(notification), 7000); 
    }
  
  }