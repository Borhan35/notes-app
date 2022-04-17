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
let nonteId = 0;

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
    notes = notes.forEach((note, index) => {
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
    const id = nonteId++;
    notes = [
        ...notes,
        {
            id,
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

    const copytitle = notes[id].title;
    inputTitle.value = copytitle;
    textarea.innerHTML = notes[id].text;
    inputDates.value = notes[id].date;
    const key = modal.setattribute('key', `${id}`);
    console.log(key)
    if (id === 0) {
        const btnEditHandler = (e) => {
            e.stopPropagation();
            if (!e.target.closest('.save')) return;
            const title = inputTitle.value.trim();

            notes[id].title = title;
            // const date = new Date(inputDates.value).toLocaleDateString('en-US', {
            //     day: 'numeric',
            //     month: 'long',
            //     year: 'numeric',
            // });
            // if(title !== copytitle){
            // notes = notes.map((note, index) => {
            //     if(id === index){
            //         return {
            //             ...note,
            //             title,
            //             date
            //         }
            //     }
            // });
            // render(notes);
            modalHide();
            // }

            this.removeEventListener('click', btnEditHandler);
        }
        modal.addEventListener('click', btnEditHandler);
    }

    showNotes();
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