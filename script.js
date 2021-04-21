'use strict';

const gallery = document.getElementById('gallery-services');
const modal = document.getElementById('imgModal');
const imagesAll = document.querySelectorAll('img');
const modalImg = document.getElementById('img01');
const closeBtn = document.getElementsByClassName('close')[0];
const scrollBtnLeft = document.querySelector('.left');
const scrollBtnRight = document.querySelector('.right');

/* MODAL STRATEGY
1. add keydown for arrow keys and esc
*/

// MY CODE
const imgArr = [...imagesAll].filter(el => el.classList.contains('one'));

const imgEnlarge = imgArr.forEach(el =>
  el.addEventListener('click', function (e) {
    // SET VARIABLES
    let curImg = e.target;
    let curIndex = imgArr.findIndex(el => el === curImg);

    // MODAL DISPLAY INIT
    modal.style.display = 'block';
    modalImg.src = `/resources/img/lightbox/${curIndex + 1}.jpg`;
    curImg.style.display = 'none';

    // SCROLL MODAL
    const updateCurIndex = function (e) {
      if (curIndex <= imgArr.length - 2 && e === 'right') {
        curIndex++;
      } else if (curIndex > 0 && e === 'left') {
        curIndex--;
      }
      modalImg.src = `/resources/img/lightbox/${curIndex + 1}.jpg`;
      console.log(modalImg.src);
    };
    scrollBtnRight.addEventListener('click', function (e) {
      updateCurIndex('right');
    });
    scrollBtnLeft.addEventListener('click', function (e) {
      updateCurIndex('left');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') updateCurIndex('right');
      else if (e.key === 'ArrowLeft') updateCurIndex('left');
    });

    // CLOSE MODAL
    const closeModal = function () {
      modal.style.display = 'none';
      curImg.style.display = '';
    };
    closeBtn.addEventListener('click', function () {
      closeModal();
    });
    modal.addEventListener('click', function (e) {
      if (
        e.target !== scrollBtnRight &&
        e.target !== scrollBtnLeft &&
        e.target.classList.value !== 'modal-content'
      )
        closeModal();
    });
  })
);
