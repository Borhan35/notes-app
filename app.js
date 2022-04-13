"use-strict";

// Element Selection
const backdrop = document.querySelector('.backdrop');
const noteHeader = document.querySelector('.note--wrp');
const notesList = document.querySelector('.notes--list');
const dates = noteHeader.querySelector('.dates');
const modal = document.forms.modal;
const inputTitle = modal.title;
const inputDates = modal.date;
const textarea = modal.querySelector('.text--box');
const buttons = modal.querySelectorAll('.editor-btn');

// State
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
};

// Hide Notes
const hideNotesModal = () => modalHide();


// Cancel Notes
const cancelNotesModal = (el) =>{
    if (!el.target.classList.contains('cancel')) return;
    modalHide();
} 



// Add toolbar button actions
// buttons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         const execCommands = (tag) => {
//             document.execCommand(`${tag}`, false, "");
//         }
//         const action = e.target.parentNode.dataset.action;
//         const tag = e.target.parentNode.dataset.tag;
//         if (action) {
//             execCommands(`${tag}`);
//         };

//     });
// });



buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let appliedCmds = [];
        let specificTag = 'i';
        const tag = e.target.parentNode.dataset.tag;
        let node = window.getSelection().focusNode;
        while(node.tagName !== 'italic') {
        if(node.tagName === specificTag){//you can add multiple checks here for the cmds or tags you wanna find.
            appliedCmds.push(node.tagName);
        }
        node = node.parentElement;
        } 
    });
});





// Render Notes List
const render = function (notes) {
    let notesItem = '';
    notes = [...notes].forEach((note, index) => {
        const isDate = note.date;
        notesItem += `
        <div class="notes--item" data-id="${index}">
            <div class="notes--head">
                <div class="notes--head--left">
                    ${isDate === 'Invalid Date' ? '' : `<span>${isDate}</span>`}
                </div>
                <div class="notes--head--right">
                    <button class="btn--edit" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn--close" title="Close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="notes--body">
                <h4>${note.title}</h4>
                <div class="note--text">${note.text}</div>
            </div>
        </div>
        `;
        return notes;
    });
    notesList.innerHTML = notesItem;
    inputTitle.value = '';
    inputDates.value = '';
    textarea.innerHTML = '';
};


// Save Data
const saveNotesHandler = function (el) {
    el.preventDefault();
    const title = inputTitle.value.trim();
    const date = new Date(inputDates.value).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const text = textarea.innerHTML;
    notes = [
        ...notes,
        {
            title,
            date,
            text
        }
    ];
    render(notes);
    modalHide();
};


// Init
const init = () => {
    modal.addEventListener('submit', saveNotesHandler);
    modal.addEventListener('click', cancelNotesModal);
    backdrop.addEventListener('click', hideNotesModal);
    noteHeader.addEventListener('click', showNotesModal);
}

init();