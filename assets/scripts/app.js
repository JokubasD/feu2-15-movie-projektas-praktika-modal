'use strict';
console.log('app.js');

//Targeting ==========================================================

const els = {
    btn: {
        addMovie: document.getElementById('add-movie-btn'),
        cancelModal: document.querySelector('.btn--passive'),
        cancelModal2: document.querySelector('.btn--passive2'),
        deleteMovieFinalStep: document.querySelector('.btn--danger2'),
        searchTitle: document.getElementById('search-title-btn'),
    },
    modals: {
        movieModal: document.getElementById('add-modal'),
        deleteModal: document.getElementById('delete-modal'),
    },
    backdrop: document.getElementById('backdrop'),
    addMovieForm: document.getElementById('add-movie-form'),
    movieList: document.getElementById('movie-list'),
    entryText: document.getElementById('entry-text'),
    deleteMovieForm: document.getElementById('delete-movie-form'),
    filterInput: document.getElementById('filter-input'),
}
console.log(els)

// Global film array
let mainMoviesArr = []
addNewMovieHandler({
    id: generateID(),
    imageUrl: "https://picsum.photos/id/1003/1181/1772",
    rating: "5",
    title: "Bambi"})
addNewMovieHandler({
    id: generateID(),
    imageUrl: "https://picsum.photos/id/1000/1181/1772",
    rating: "2",
    title: "Mountains"})
addNewMovieHandler({
    id: generateID(),
    imageUrl: "https://picsum.photos/id/1020/1181/1772",
    rating: "1",
    title: "Bear"})
//Event Listeners ==========================================================
//==========================================================================
//==========================================================================

els.btn.addMovie.addEventListener('click', () => {
    els.modals.movieModal.classList.add('visible')
    els.backdrop.classList.add('visible')
})

els.backdrop.addEventListener('click', closeMovieModal)
els.btn.cancelModal.addEventListener('click', closeMovieModal)

els.addMovieForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formValues = {
        id: generateID(),
        title: els.addMovieForm.elements.title.value.trim(),
        imageUrl: els.addMovieForm.elements['image-url'].value.trim(),
        rating: els.addMovieForm.elements.rating.value.trim(),
    }
    console.log('formValues ===', formValues);
    if (
    formValues.title === '' || 
    formValues.imageUrl === '' ||
    formValues.rating === ''
    ) {
        return;
    }

    addNewMovieHandler(formValues)
    closeMovieModal()
    els.addMovieForm.reset();
})

els.filterInput.addEventListener('input', filter)

//MAIN FUNCTIONS============================================================
//==========================================================================
//==========================================================================
function addNewMovieHandler(newMovieObj){
    mainMoviesArr.push(newMovieObj)

    renderMovies(mainMoviesArr) 
}
function filter(){
    let currentArr = mainMoviesArr.filter((obj) => obj.title.toLowerCase().includes(els.filterInput.value.trim().toLowerCase()))
    renderMovies(currentArr)
}
function renderMovies(array){
    els.movieList.innerHTML = '';
    if (array.length > 0){
        els.entryText.style.display = 'none';
    } else{
        els.entryText.style.display = 'block';
        return;
    }
    array.forEach((mObj) => {
        const newMovieHTMLEl = makeOneMovieHTMLEl(mObj);
        els.movieList.append(newMovieHTMLEl);
    })
}

function closeMovieModal(){
    els.modals.movieModal.classList.remove('visible')
    els.modals.deleteModal.classList.remove('visible')
    els.backdrop.classList.remove('visible')
    return;
}

/**
 * sukuria ir grazina li elementa is argumentu gautu objekto reiksmiu
 * @param {*} newMovieObj
 */

function makeOneMovieHTMLEl(newMovieObj) {
    // console.log('newMovieObj ===', newMovieObj);
    const liEl = document.createElement('li');
    liEl.className = 'movie-element'
    liEl.dataset.movieId = newMovieObj.id
    const liInsideHTML = `
    <div class="movie-element__image">
        <img src="${newMovieObj.imageUrl}" alt="element__image">
    </div>
    <div class="movie-element__info">
        <h2>${newMovieObj.title}</h2>
        <p>${newMovieObj.rating}/5 stars</p>
        <i class="fa fa-trash delete" aria-hidden="true"></i>
    </div>
    `
    liEl.insertAdjacentHTML('afterbegin', liInsideHTML)
    const deleteBtnEl = liEl.querySelector('.delete')
    // console.log('deleteBtnEl ===', deleteBtnEl);
    deleteBtnEl.addEventListener('click', movieDeleteHandler)
    return liEl
}

function movieDeleteHandler(event){
    const closestLiEl = event.target.closest('li')
    const idOfElToBeDeleted = closestLiEl.dataset.movieId
    els.modals.deleteModal.classList.add('visible')
    els.backdrop.classList.add('visible')
    let clicked = false
    els.backdrop.addEventListener('click',() => {
        clicked = true
        closeMovieModal()
    })
    els.btn.cancelModal2.addEventListener('click',() => {
        clicked = true
        closeMovieModal()
    })
    if (clicked){
        return;
    } else{
        console.log('clicked')
        els.btn.deleteMovieFinalStep.addEventListener('click', () => {
        mainMoviesArr = mainMoviesArr.filter((obj) => obj.id !== idOfElToBeDeleted)
        closeMovieModal()
        renderMovies(mainMoviesArr)
        filter()
        })

    }
}

function generateID(){
    return Math.random().toFixed(8).slice(2)
}
