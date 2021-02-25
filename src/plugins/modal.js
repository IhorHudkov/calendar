import '@/styles/modal.scss';

function createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('imodal');

  modal.insertAdjacentHTML('afterbegin', `
     <div class="modal-overlay">
        <div class="modal-window">
            ${options.content || ''}
        </div>
     </div> 
    `);

  document.body.appendChild(modal);

  return modal;
}

My$.modal = (options) => {
  const ANIMATION_SPEED = 200;

  const $modal = createModal(options);

  let closing = false;

  return {
    open() {
      if (!closing) {
        $modal.classList.add('open');
      }
    },

    close() {
      closing = true;

      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
  };
};
