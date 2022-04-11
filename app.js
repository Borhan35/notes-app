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
        console.log(action)
        if (action) {
            document.execCommand(action, false);
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
    modalHide();
    inputTitle.value = '';
    inputDates.value = '';
    textarea.value = '';
};

// Save Data
const saveNotesHandler = function (el) {
    el.preventDefault();
    const title = inputTitle.value.trim();
    const date = new Date(inputDates.value).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const text = textarea.value.trim();
    notes = [
        ...notes,
        {
            title,
            date,
            text
        }
    ];
    render(notes);
};


save.addEventListener('click', saveNotesHandler);
cancel.addEventListener('click', cancelNotesModal);
backdrop.addEventListener('click', hideNotesModal);
noteHeader.addEventListener('click', showNotesModal);