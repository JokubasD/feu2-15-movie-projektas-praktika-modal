'use strict';
console.log('app.js');

//Targeting ==========================================================

const els = {
    btn: {
        addMovie: document.getElementById('add-movie-btn'),
        cancelModal: document.querySelector('.btn--passive'),
    },
    modals: {
        movieModal: document.getElementById('add-modal'),
    },
    backdrop: document.getElementById('backdrop'),
    addMovieForm: {
        form: document.getElementById('add-movie-form'),
    }
    
}
console.log(els)


//Event Listeners ==========================================================
//==========================================================================
//==========================================================================

els.btn.addMovie.addEventListener('click', () => {
    els.modals.movieModal.classList.add('visible')
    els.backdrop.classList.add('visible')
})

els.backdrop.addEventListener('click', closeMovieModal)
els.btn.cancelModal.addEventListener('click', closeMovieModal)

els.addMovieForm.form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('add movie')
})


//MAIN FUNCTIONS============================================================
//==========================================================================
//==========================================================================
function closeMovieModal(){
    els.modals.movieModal.classList.remove('visible')
    els.backdrop.classList.remove('visible')
}