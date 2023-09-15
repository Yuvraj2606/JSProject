//controller (I/O) + Events + Talk to service

import {noteOperations} from '../services/note-service.js'

window.addEventListener('load' , init);
function init() {
    showCount();
    bindEvents();
    disableButton();
}

const enableButton = ()=> document.querySelector('#delete').disabled = false;

const disableButton = ()=> document.querySelector('#delete').disabled = true;

function showCount() {
    noteOperations.markTotal() > 0 ? enableButton() : disableButton();
    document.querySelector('#total').innerText = noteOperations.total();
    document.querySelector('#mark').innerText = noteOperations.markTotal();
    document.querySelector('#unmark').innerText = noteOperations.unmarkTotal();
}

function bindEvents() {
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#search').addEventListener('click',searchNote);
    document.querySelector('#show').addEventListener('click',showAll);
    document.querySelector('#update').addEventListener('click',updateNote);
    document.querySelector('#id-up').addEventListener('click',sortAscending);
    document.querySelector('#id-down').addEventListener('click',sortDescending);
    document.querySelector('#title-up').addEventListener('click',sortAscending);
    document.querySelector('#title-down').addEventListener('click',sortDescending);
    document.querySelector('#saveLocal').addEventListener('click',saveOnLocal);
    document.querySelector('#loadLocal').addEventListener('click',loadFromLocal);
    document.querySelector('#clearAll').addEventListener('click',clearAll);
    document.querySelector('#cdate-up').addEventListener('click',sortAscending);
    document.querySelector('#cdate-down').addEventListener('click',sortDescending);
}


function clearAll() {
    noteOperations.clear();
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
    showCount();
}


function saveOnLocal() {
    if (window.localStorage) {
        const allNotes = noteOperations.getNotes();
        // storing in local storage on browser in key-value pair 
        localStorage.notes = JSON.stringify(allNotes);
        alert('Data Stored Successfully');
    }
    else {
        alert('your browser is outdated');
    }
}


function loadFromLocal() {
    if (window.localStorage) {
        const allNotes = JSON.parse(localStorage.notes);
        noteOperations.setNotes(allNotes);
        const notes = noteOperations.getNotes();
        printNotes(notes);
        alert('Data Loaded Successfully');
    }
    else {
        alert('your browser is outdated');
    }
}



function sortAscending() {
    const sortAccordingTo = this.getAttribute('id').split('-')[0];
    const notesInAscending = noteOperations.sortAscending(sortAccordingTo);
    printNotes(notesInAscending);
}

function sortDescending() {
    const sortAccordingTo = this.getAttribute('id').split('-')[0];
    const notesInDescending = noteOperations.sortDescending(sortAccordingTo);
    printNotes(notesInDescending);
}


function updateNote() {
    const updatedNoteId = document.querySelector('#id').value;
    const noteObject = {};
    const fields = ['title','desc','cdate','imp'];
    for (let field of fields) {
        noteObject[field] = document.querySelector(`#${field}`).value;
    }
    noteOperations.update(noteObject,updatedNoteId);
    showAll();
}


function showAll() {
    const notes = noteOperations.getNotes();
    printNotes(notes);
}


function searchNote() {
    const buttonDiv = this.parentNode;
    const div = buttonDiv.querySelector('#searchWhat');
    const selectTag = document.createElement('select');
    selectTag.setAttribute('id','iAmSelect');
    selectTag.setAttribute('class','form-control');
    div.appendChild(selectTag);
    const optionArr = ['Choose option...','Search by Id','Search by Title'];
    for (let val of optionArr) {
        const optionTag = document.createElement('option');
        optionTag.innerHTML = val;
        optionTag.setAttribute('value',val);
        selectTag.appendChild(optionTag);
    }
    const inputTag = document.createElement('input');
    inputTag.setAttribute('id','iAmInput');
    inputTag.setAttribute('type','text');
    inputTag.setAttribute('class','form-control');
    inputTag.style.marginTop = '6px';
    inputTag.setAttribute('placeholder','Enter ID / Title...');
    div.appendChild(inputTag);

    const buttonTag = document.createElement('button');
    buttonTag.innerHTML = 'Go For Search';
    buttonTag.setAttribute('id','iAmButton');
    buttonTag.style.marginTop = '6px';
    buttonTag.style.marginLeft = '550px';
    buttonTag.setAttribute('class','btn btn-success');
    div.appendChild(buttonTag);

    buttonTag.addEventListener('click',goForSearch);
}

function goForSearch() {
    const selectTag = document.querySelector('#iAmSelect');
    const selectedOption = selectTag.value.split(' ')[2].toLowerCase();
    const inputTagValue = document.querySelector('#iAmInput').value;

    const notes = noteOperations.search(selectedOption,inputTagValue);
    printNotes(notes);

    const div = selectTag.parentNode;
    div.innerHTML = '';
}



function deleteMarked() {
    noteOperations.remove();
    const notes = noteOperations.getNotes();
    printNotes(notes);
}

function of() {
    let c = 0;
    function infn() {
        c++;
        return c;
    }
    return infn;
}

const getId = of();

function addNote() {
    // read id, title, description, completion date, color of importance 
    const fields = ['id','title','desc','cdate','imp'];
    
    const noteObject = {}; // object literal

    for (let field of fields) {
        if (field == 'id') {
            noteObject[field] = getId();
            document.getElementById('id').value = noteObject[field];
        }
        else {
            noteObject[field] = document.querySelector(`#${field}`).value;
        }
        
    }

    // passing noteObject to services for storing
    noteOperations.add(noteObject);

    printNote(noteObject);

    //so that count get update
    showCount();
    // var id = document.querySelector('#id').value;
    // var title = document.querySelector('#title').value;
    // var desc = document.querySelector('#des').value;
}

function printIcon(myClassName , fn , id) {
    // <i class="fa-solid fa-trash"></i>
    // <i class="fa-solid fa-pen-to-square"></i>
    // document.createElement()    <- ye ek object bnata h 
    const iTag = document.createElement('i');    // <i>
    // we have created a custom attribute (note-id) so that nobody can alter that in future
    iTag.setAttribute('note-id',id);
    iTag.className = `fa-solid fa-${myClassName} me-3 hand`;
    iTag.addEventListener('click',fn);
    return iTag;
}

function toggleMark() {
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    const tr = icon.parentNode.parentNode;
    // tr.className = 'table-danger';
    tr.classList.toggle('table-danger');
    showCount();
}

function edit() {
    const id = this.getAttribute('note-id');
    const note = noteOperations.getNoteToBeEdited(id);

    const tr = this.parentNode.parentNode;
    tr.classList.toggle('table-warning');

    const fields = ['id','title','desc','cdate','imp'];

    for (let field of fields) {
        document.querySelector(`#${field}`).value = note[field];
    }
    
}

function printNotes(notes) {
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note=>printNote(note));
    showCount();
}


function printNote(noteObject) {
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow();    //<tr>
    for (let key in noteObject) {
        if (key == 'isMarked') {
            continue;
        }
        const td = row.insertCell();   //<td>
        td.innerText = noteObject[key]; 
        if (key == 'imp') {
            td.style.backgroundColor = noteObject[key];
            td.style.color = 'white';
        }
    }
    //adding delete icon in operations
    const td = row.insertCell();
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    td.appendChild(printIcon('pen-to-square',edit,noteObject.id));
}