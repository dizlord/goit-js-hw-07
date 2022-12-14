import { galleryItems } from './gallery-items.js';

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

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
  const instance = basicLightbox.create(
    `
    <img src="${url}">
`,
    {
      onShow: () => {
        window.addEventListener('keydown', closeByEscape);
      },
      onClose: () => {
        window.removeEventListener('keydown', closeByEscape);
      },
    }
  );

  instance.show();

  function closeByEscape(evt) {
    if (evt.keyCode === 27) {
      instance.close();
    }
  }
}

refs.galleryEl.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  showModalImg(event.target.dataset.source);
}
