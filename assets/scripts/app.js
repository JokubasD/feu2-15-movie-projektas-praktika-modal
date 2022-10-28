'use strict';
console.log('app.js');

//Targeting ==========================================================

const els = {
    btn: {
        addMovie: document.getElementById('add-movie-btn'),
    },
    modals: {
        movieModal: document.getElementById('add-modal'),
    },
    backdrop: document.getElementById('backdrop'),
}
console.log(els)


//Event Listeners ==========================================================
//==========================================================================
//==========================================================================

els.btn.addMovie.addEventListener('click', () => {
    els.modals.movieModal.classList.add('visible')
    els.backdrop.classList.add('visible')
})