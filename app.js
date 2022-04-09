"use-strict";

// Element Selection
const noteHeader = document.querySelector('.note--wrp');
const dates = noteHeader.querySelector('.dates');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const cancel = document.querySelector('.cancel');

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
}

// Hide Notes
const hideNotesModal = function(){
    modalHide();
};
// Cancel Notes
const cancelNotesModal = function(){
    modalHide();
};

cancel.addEventListener('click', cancelNotesModal);
backdrop.addEventListener('click', hideNotesModal);
noteHeader.addEventListener('click', showNotesModal);