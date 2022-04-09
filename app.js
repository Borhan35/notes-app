"use-strict";

// Element Selection
const noteHeader = document.querySelector('.note--wrp');
const dates = noteHeader.querySelector('.dates');
const backdrop = document.querySelector('.backdrop');

const modal = document.querySelector('.modal');
const cancel = modal.querySelector('.cancel');
const save = modal.querySelector('.save');
const inputTitle = modal.querySelector('#title');
const inputDates = modal.querySelector('#date');
const textarea = modal.querySelector('textarea');


let state = [];

// Set Today Time
(function setDate(){
    try{
        dates.textContent = new Date().toLocaleDateString('en-US',{
            day: 'numeric', month: 'long', year: 'numeric',
        });
    }catch(e){
        console.log(e);
    }
})();


// Add Notes
const showNotesModal = function(el) {
    if(!el.target.classList.contains('add'))return;
    modal.classList.add('db');
    backdrop.classList.add('db');
};

// Modal Hide
const modalHide = function(){
    modal.classList.remove('db');
    backdrop.classList.remove('db');
    if(window.confirm('Do you really want to leave?') === false)return;
}

// Hide Notes
const hideNotesModal = function(){
    modalHide();
};

// Cancel Notes
const cancelNotesModal = function(el){
    el.preventDefault();
    modalHide();
};

// Save Data
const saveNotesHandler = function(el){
    el.preventDefault();
    const title = inputTitle.value.trim();
    const date = inputDates.value;
    const notes = textarea.value.trim();
    state = [
        ...state,
        {
            title,
            date,
            notes
        }
    ];
    console.log(state)
}

save.addEventListener('click', saveNotesHandler);
cancel.addEventListener('click', cancelNotesModal);
backdrop.addEventListener('click', hideNotesModal);
noteHeader.addEventListener('click', showNotesModal);