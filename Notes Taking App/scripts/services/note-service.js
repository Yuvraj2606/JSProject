//CRUD operations will be performed here
import Note from '../models/note.js';
export const noteOperations = {
    notes:[],
    add(noteObject) {
        // making note object from design in model
        const note = new Note(noteObject);
        // adding one row(note) to notes array
        this.notes.push(note);
    },
    searchById(id) {
        return this.notes.find(note=>note.id == id);
    },
    toggleMark(id) {
        this.searchById(id).toggleMark();
        // const noteObject = this.searchById(id);
        // noteObject.isMarked = !noteObject.isMarked;
    }, 
    total() {
        return this.notes.length;
    },
    markTotal() {
        return this.notes.filter(note=>note.isMarked).length;
    },
    unmarkTotal() {
        return this.total() - this.markTotal();
    },
    remove() {
        // we have stored the notes which are not marked
        this.notes = this.notes.filter(note=>!note.isMarked);
    },
    getNotes() {
        return this.notes;
    },
    setNotes(loadedNotes) {
        loadedNotes.forEach(obj=>this.add(obj));
        // this.notes = this.notes.concat(loadedNotes);
        console.log(this.notes);
    },
    search(typeOfSearch , whatToSearch) {
        return this.notes.filter(note=>note[typeOfSearch] == whatToSearch);
    },
    getNoteToBeEdited(noteId) {
        const note = this.notes.filter(note=>note.id == noteId)[0];
        return note;
    },
    update(noteObject , noteId) {
        for (let note of this.notes) {
            if (note.id == noteId) {
                for (let key in note) {
                    if (key != 'id') {
                        note[key] = noteObject[key];
                    }
                }
            }
        }
    },
    sortAscending(sortAccordingTo) {
        if (sortAccordingTo == 'title') {
            return this.notes.sort((a, b) => a['title'].localeCompare(b['title'], "fr", { ignorePunctuation: true }));
        }
        return this.notes.sort((fNote,sNote)=>fNote[sortAccordingTo] - sNote[sortAccordingTo]);
    },
    sortDescending(sortAccordingTo) {
        if (sortAccordingTo == 'title') {
            return this.notes.sort((a, b) => b['title'].localeCompare(a['title'], "fr", { ignorePunctuation: true }));
        }
        return this.notes.sort((fNote,sNote)=>sNote[sortAccordingTo] - fNote[sortAccordingTo]);
    },
    clear() {
        this.notes = [];
    }
};