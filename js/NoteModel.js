export default class NoteModel {
    constructor() {

    }

    static getNotesForTesting(notes) {
        notes = [{
                id: 1,
                title: "My first note",
                content: "My first note for testing app in js",
                lastUpdated: new Date().toLocaleString(),
            },
            {
                id: 2,
                title: "My Second note",
                content: "My Second note for testing app in js",
                lastUpdated: new Date().toLocaleString(),
            }
        ];

        if (localStorage.getItem("savedNotes")) {
            return localStorage.getItem("savedNotes");
        } else {
            localStorage.setItem("savedNotes", JSON.stringify(notes));
        }
    }

    // get all notes.

    static getAllNotes() {
        return JSON.parse(localStorage.getItem("savedNotes"));
    }


    static updateOrInsertNote(noteId = null, newTitle = null, newContent = null) {
        // Get all notes

        const allNotes = NoteModel.getAllNotes() || [];
        let stopProcessing = false;

        //  If note id so update otherwise insert.

        if (noteId) {
            allNotes.map((note) => {
                if (note.id == noteId) {
                    note.title = newTitle;
                    note.content = newContent;
                    note.lastUpdated = new Date().toLocaleString();
                }
            })

        } else {
            // Adding new note.

            allNotes.map((note) => {
                if (note.title == null || note.title == "") {
                    stopProcessing = true;
                }
            });

            if (!stopProcessing) {
                allNotes.push({
                    title: null,
                    id: new Date().valueOf(),
                    content: null,
                    lastUpdated: new Date().toLocaleString(),
                })
            }
        }

        localStorage.setItem("savedNotes", JSON.stringify(allNotes));
    }


    static deleNote(noteId) {
        const allNotes = NoteModel.getAllNotes() || [];
        let newList = [];

        allNotes.map((note) => {
            if (note.id != noteId.replace('noteDelete-', '')) {
                newList.push(note);
            }
        });

        localStorage.setItem("savedNotes", JSON.stringify(newList));

    }
}