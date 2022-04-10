"use-strict";

// Element Selection
const noteHeader = document.querySelector('.note--wrp');
const notesList = document.querySelector('.notes--list');
const dates = noteHeader.querySelector('.dates');
const backdrop = document.querySelector('.backdrop');

const modal = document.querySelector('.modal');
const cancel = modal.querySelector('.cancel');
const save = modal.querySelector('.save');
const inputTitle = modal.querySelector('#title');
const inputDates = modal.querySelector('#date');
const textarea = modal.querySelector('textarea');
// const editorFeatures = modal.querySelector('.editor--header');
const buttons = modal.querySelectorAll('.editor-btn');


let notes = [];

// Set Today Time
(function setDate() {
    try {
        dates.textContent = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch (e) {
        console.log(e);
    }
})();


// Add Notes
const showNotesModal = function (el) {
    if (!el.target.classList.contains('add')) return;
    modal.classList.add('db');
    backdrop.classList.add('db');
};

// Modal Hide
const modalHide = function () {
    modal.classList.remove('db');
    backdrop.classList.remove('db');
}

// Hide Notes
const hideNotesModal = function () {
    modalHide();
};

// Cancel Notes
const cancelNotesModal = function (el) {
    el.preventDefault();
    modalHide();
};


// Add toolbar button actions
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.parentNode.dataset.action;
        if(action){
            document.execCommand(action, false);
        }
    });
});

// Render Notes List
const render = function(notes){
    let notesItem = '';
    notes = [...notes].forEach((note, index) => {
        notesItem += `
        <div class="notes--item" data-id="${index}">
            <div class="notes--head">
                <h4>${note.title}</h4>
                <span>${note.date}</span>
            </div>
            <div class="note--text">${note.text}</div>
        </div>
        `;
        return notes;
    });
    notesList.innerHTML = notesItem;
    modalHide();
    inputTitle.value = '';
    inputDates.value = '';
    textarea.value = '';
}

// Save Data
const saveNotesHandler = function (el) {
    el.preventDefault();
    const title = inputTitle.value.trim();
    const date = inputDates.value;
    const text = textarea.value.trim();
    notes = [
        ...notes,
        {
            title,
            date,
            text
        }
    ];
    render(notes)
};

console.log(inputDates)


save.addEventListener('click', saveNotesHandler);
cancel.addEventListener('click', cancelNotesModal);
backdrop.addEventListener('click', hideNotesModal);
noteHeader.addEventListener('click', showNotesModal);