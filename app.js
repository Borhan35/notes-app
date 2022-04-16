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
const showNotes = function () {
    modal.classList.add('db');
    backdrop.classList.add('db');
}
const showNotesModal = function (el) {
    if (!el.target.classList.contains('add')) return;
    showNotes();
};

// Modal Hide
const modalHide = function () {
    modal.classList.remove('db');
    backdrop.classList.remove('db');
};

// Hide Notes
const hideNotesModal = () => modalHide();


// Cancel Notes
const cancelNotesModal = (el) => {
    if (!el.target.classList.contains('cancel')) return;
    modalHide();
}



// Add toolbar button actions
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const execCommands = (tag) => {
            document.execCommand(`${tag}`, false, "");
        }
        const action = e.target.parentNode.dataset.action;
        const tag = e.target.parentNode.dataset.tag;
        if (action) {
            execCommands(`${tag}`);
        };

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
                    <button class="btn--edit" type="edit" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn--close" title="Close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="notes--body">
                <h4>${note.title}</h4>
                <div class="note--text">${note.text}</div>
            </div>
        </div>
        `;
        return note;
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

// Close Notes handler
const closeItemHandler = (e) => {
    if (!e.target.closest('.btn--close')) return;
    const id = parseInt(e.target.closest('.notes--item').getAttribute('data-id'), 10);
    notes = notes.filter((note, index) => id !== index);
    render(notes);
};

const editItemHandler = (e) => {
    if (!e.target.closest('.btn--edit')) return;
    const id = parseInt(e.target.closest('.notes--item').getAttribute('data-id'), 10);
    // modal.setAttribute('key', id);
    // const key = parseInt(modal.getAttribute('key'), 10);

    const copyTitle = notes[id].title;
    const copyText = notes[id].text;
    const copyDate = notes[id].date;

    inputTitle.value = copyTitle;
    textarea.innerHTML = copyText;
    inputDates.value = copyDate;

    showNotes();

    const btnEditHandler = () => {
        const title = inputTitle.value;
        notes = notes.map((note, index) => {
            if (id === index) {
                return {
                    ...note,
                    title
                }
            }
            return note;
        });
        render(notes);
        console.log(notes)

        modalHide();
        this.removeEventListener('click', btnEditHandler);
        modal.querySelector('.cancel').style.display = 'none';

    }

    modal.querySelector('.cancel').style.display = 'none';
    const btnEdit = modal.querySelector('.save');
    btnEdit.removeAttribute('type', 'submit');
    btnEdit.setAttribute('type', 'button', );
    btnEdit.addEventListener('click', btnEditHandler);
}

// Init
const init = () => {
    notesList.addEventListener('click', editItemHandler);
    notesList.addEventListener('click', closeItemHandler);
    modal.addEventListener('submit', saveNotesHandler);
    modal.addEventListener('click', cancelNotesModal);
    backdrop.addEventListener('click', hideNotesModal);
    noteHeader.addEventListener('click', showNotesModal);
}

init();