import NoteModel from './NoteModel.js';
import NoteView from './NoteView.js';

export default class App {
    constructor(root) {
        this.notes = [];

        this.notes = NoteModel.getNotesForTesting(this.notes);

        this.view = new NoteView(root, this.actions());

        this.displayNotes(this.notes);

    }

    makeNoteActive(note) {
        this.view.makeNoteActive(note);
    }

    refreshNoteList() {
        this.notes = NoteModel.getNotesForTesting(this.notes);
        this.displayNotes(this.notes);
    }

    getLastAddedNote() {
        let newNotePosition = JSON.parse(this.notes).length - 1;
        this.view.selectLastAddedNote(JSON.parse(this.notes)[newNotePosition].id);
    }

    actions() {
        return {
            noteSelect: (noteId) => {
                let selectedNote = null;

                // Getting content from id.

                JSON.parse(this.notes).forEach((note) => {
                    if (note.id == noteId) {
                        selectedNote = note;
                    }
                });

                this.makeNoteActive(selectedNote);
            },

            noteUpdate: (noteId, newTitle, newContent) => {
                NoteModel.updateOrInsertNote(noteId, newTitle, newContent);
                this.refreshNoteList();
            },

            noteDelete: (noteId) => {
                NoteModel.deleNote(noteId);
                this.refreshNoteList();
            },

            noteAdd: () => {
                NoteModel.updateOrInsertNote();
                this.refreshNoteList();
                this.getLastAddedNote();
            }
        }
    }

    displayNotes(notes) {
        this.view.displayNoteList(notes);
    }
}