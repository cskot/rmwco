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
  modalImg.src = `/resources/img/lightbox/${currentIndex + 1}.jpg`;
  currentImage.style.display = 'none'; // fixes bug where small img pops thru modal because of stacking context issues
};
// Update Index

const updateIndex = function (type) {
  if (type === 'left') {
    currentIndex--;
  }

  if (type === 'right') {
    currentIndex++;
  }
  modalImg.src = `/resources/img/lightbox/${currentIndex + 1}.jpg`;
};

// Close Modal
const closeModal = function () {
  modal.style.display = 'none';
  currentImage.style.display = '';
};

// ----- Event Listeners -----
// imgArr clicks
imgArr.forEach((e, index) =>
  e.addEventListener('click', function (e) {
    currentIndex = index;
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
  else if (e.key === 'ArrowRight') updateIndex('right');
  else if (e.key === 'ArrowLeft') updateIndex('left');
});

// const imgEnlarge = function (image) {
//   // SET VARIABLES
//   let curIndex = imgArr.findIndex(el => el === curImg);

//   // MODAL DISPLAY INIT
//   modal.style.display = 'block';
//   modalImg.src = `/resources/img/lightbox/${curIndex + 1}.jpg`;
//   image.style.display = 'none';

//   // SCROLL MODAL
//   const updateCurIndex = function (index) {
//     if (index <= imgArr.length - 1 && e === 'right') {
//       curIndex++;
//     } else if (curIndex > 0 && e === 'left') {
//       curIndex--;
//     }
//     modalImg.src = `/resources/img/lightbox/${curIndex + 1}.jpg`;
//     console.log(curIndex);
//   };

//   scrollBtnRight.addEventListener('click', function (e) {
//     updateCurIndex('right');
//   });
//   scrollBtnLeft.addEventListener('click', function (e) {
//     updateCurIndex('left');
//   });
//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') closeModal();
//     else if (e.key === 'ArrowRight') updateCurIndex('right');
//     else if (e.key === 'ArrowLeft') updateCurIndex('left');
//   });

//   // CLOSE MODAL
//   const closeModal = function () {
//     modal.style.display = 'none';
//     curImg.style.display = '';
//     imgArr.forEach(el => el.removeEventListener('click', imgEnlarge));
//   };
//   closeBtn.addEventListener('click', function () {
//     closeModal();
//   });
//   modal.addEventListener('click', function (e) {
//     if (
//       e.target !== scrollBtnRight &&
//       e.target !== scrollBtnLeft &&
//       e.target.classList.value !== 'modal-content'
//     )
//       closeModal();
//   });
// };
