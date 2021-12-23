export default class NoteView {
    constructor(root, { noteSelect, noteUpdate, noteDelete, noteAdd }) {
        this.root = root;
        this.noteSelect = noteSelect;
        this.noteUpdate = noteUpdate;
        this.noteDelete = noteDelete;
        this.noteAdd = noteAdd;
    }

    displayNoteList(notes) {
        // Getting Html tag for appending notes.

        const noteListHtml = this.root.querySelector("#noteListHtml");

        // Sort notes before apending.

        notes = JSON.parse(notes).sort(function(a, b) {
            let c = new Date(a.lastUpdated);
            let d = new Date(b.lastUpdated);

            return c - d;
        });

        noteListHtml.innerHTML = '';

        notes.reverse().forEach((item) => {
            if (item.title) {
                noteListHtml.innerHTML += '<li class="list-group-item" id="note-' + item.id + '" data-id="' + item.id + '"><strong>' + item.title + '</strong><br><small>' + item.content + '</small><hr><span class="badge badge-info"> updated: ' + item.lastUpdated + '</span><span class="badge badge-danger deleteNote" id="noteDelete-' + item.id + '">Delete <i class="far fa-trash-alt"></i></span></li>';
            } else {
                noteListHtml.innerHTML += '<li class="list-group-item" id="note-' + item.id + '" data-id="' + item.id + '"><strong>Add Note Details</strong><br><small></small><hr><span class="badge badge-info"> updated: ' + item.lastUpdated + '</span><span class="badge badge-danger deleteNote" id="noteDelete-' + item.id + '">Delete <i class="far fa-trash-alt"></i></span></li>';
            }
        });

        // Set event Listeners.

        noteListHtml.querySelectorAll(".list-group-item").forEach((item) => {
            item.addEventListener("click", () => {
                this.noteSelect(item.dataset.id);
            });
        });

        const addNewNote = this.root.querySelector(".addNewNote");
        const noteId = this.root.querySelector(".inputNoteId");
        const noteTitle = this.root.querySelector(".title");
        const noteContent = this.root.querySelector(".content");
        const fields = [noteTitle, noteContent];

        fields.forEach((field) => {
            field.addEventListener("blur", () => {
                this.noteUpdate(noteId.value, noteTitle.value.trim(), noteContent.value.trim());
            });
        });

        // Add new note.

        addNewNote.addEventListener("click", () => {
            this.noteAdd();
        });




        // Delete note event listener.

        noteListHtml.querySelectorAll(".list-group-item .deleteNote").forEach((item) => {
            item.addEventListener("click", (note) => {
                this.noteDelete(note.target.id);
            });
        });
    }


    makeNoteActive(note) {

        if (note) {

            // Updating form values.

            this.root.querySelector(".inputNoteId").value = note.id;
            this.root.querySelector(".title").value = note.title;
            this.root.querySelector(".content").value = note.content;



            // Making pre-selected note un-active.

            this.root.querySelectorAll(".list-group-item").forEach((note) => {
                note.classList.remove("active");
            });


            // Add active class to clicked note.

            this.root.querySelector("#note-" + note.id).classList.add("active");

        }
    }


    selectLastAddedNote(noteId) {
        this.noteSelect(noteId);
    }
}