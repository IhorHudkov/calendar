import '@/styles/modal.scss'

function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('imodal');
    modal.insertAdjacentHTML('afterbegin', `
     <div class="modal-overlay">
        <div class="modal-window">
            ${options.content || ''}
            <div class="modal-buttons">
                <button type="button" class="btn btn-danger" id="yes">Yes</button>
                <button type="button" class="btn btn-outline-dark" id="no">No!</button>
            </div>
        </div>
     </div> 
    `);
    document.body.appendChild(modal);
    return modal;
}

My$.modal = (options) => {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options);
    let closing = false;
    return {
        open() {
            !closing && $modal.classList.add('open');
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout( () => {
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);
        },
        destroy() {
            $modal.parentNode.removeChild($modal);
        }
    }
}