'use strict';

const gallery = document.getElementById('gallery-services');
const modal = document.getElementById('imgModal');
const imagesAll = document.querySelectorAll('img');
const modalImg = document.getElementById('img01');
const closeBtn = document.getElementsByClassName('close')[0];
const scrollBtnLeft = document.querySelector('.left');
const scrollBtnRight = document.querySelector('.right');

const imgArr = [...imagesAll].filter(el => el.classList.contains('one'));

let currentIndex, currentImage;

const imageEnlarge = () => {
  modal.style.display = 'block';
  modalImg.src = `/resources/img/lightbox/${currentIndex}.jpg`;
  currentImage.style.display = 'none'; // fixes bug where small img pops thru modal because of stacking context issues
};
// Update Index
const updateIndex = function (type) {
  if (type === 'left' && currentIndex > 1) {
    currentIndex--;
    scrollBtnRight.classList.add('arrow');
  }
  if (type === 'right' && currentIndex < imgArr.length) {
    currentIndex++;
    scrollBtnLeft.classList.add('arrow');
  }
  if (currentIndex === 1) {
    scrollBtnLeft.classList.remove('arrow');
  }
  if (currentIndex === imgArr.length) {
    scrollBtnRight.classList.remove('arrow');
  }
  modalImg.src = `/resources/img/lightbox/${currentIndex}.jpg`;
};

// Close Modal
const closeModal = function () {
  currentIndex - 1;
  updateIndex();
  modal.style.display = 'none';
  currentImage.style.display = '';
};

// ----- Event Listeners -----
// imgArr clicks
imgArr.forEach((e, index) =>
  e.addEventListener('click', function (e) {
    currentIndex = index + 1;
    updateIndex();
    currentImage = e.target;
    imageEnlarge();
    //imageEnlarge(e.target, index);
    //currentIndex = index;
  })
);
// scrollBtnLeft and scrollBtnRight
scrollBtnLeft.addEventListener('click', e => {
  updateIndex('left');
});

scrollBtnRight.addEventListener('click', e => {
  updateIndex('right');
});

// closeBtn clicks
closeBtn.addEventListener('click', e => {
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
// Keydown events
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
  else if (e.key === 'ArrowRight' && currentIndex < imgArr.length)
    updateIndex('right');
  else if (e.key === 'ArrowLeft' && currentIndex > 1) updateIndex('left');
});
