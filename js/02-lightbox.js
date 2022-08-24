import { galleryItems } from './gallery-items.js';

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

function createGallery() {
  const galleryString = galleryItems
    .map(galleryItem => {
      return `
          <a class="gallery__item" href="${galleryItem.original}">
            <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
          </a>
      `;
    })
    .join('');
  refs.galleryEl.insertAdjacentHTML('afterbegin', galleryString);
}

createGallery();

var lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  close: true,
  caption: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
