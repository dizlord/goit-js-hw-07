import { galleryItems } from './gallery-items.js';

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

let instance = null;

function createGallery() {
  const galleryString = galleryItems
    .map(galleryItem => {
      return `
            <div class="gallery__item">
              <a class="gallery__link" href="${galleryItem.original}">
              <img
                class="gallery__image"
                src="${galleryItem.preview}"
                data-source="${galleryItem.original}"
                alt="${galleryItem.description}"
              />
              </a>
            </div>
    `;
    })
    .join('');
  refs.galleryEl.insertAdjacentHTML('afterbegin', galleryString);
}

createGallery();

function showModalImg(url) {
  instance = basicLightbox.create(`
    <img src="${url}">
`);

  instance.show();
  if (instance.visible()) {
    window.addEventListener('keydown', onEscapeClick);
  }
}

refs.galleryEl.addEventListener('click', onGalleryClick);

function onEscapeClick(event) {
  if (event.code === 'Escape') {
    instance.close();
    window.removeEventListener('keydown', onEscapeClick);
  }
}

function onGalleryClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  showModalImg(event.target.dataset.source);
}
