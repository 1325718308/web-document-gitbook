import ModalFatory from './factory';
;(() => {
    const oModal = document.getElementsByClassName('modal')[0];
    const oBtnGroup = document.getElementsByClassName('btn-group')[0];
    const modalFatory = new ModalFatory();
    const init = () => {
        bindEvent();
    }
    function bindEvent() {
        oBtnGroup.addEventListener('click', handleBtnCLick, false);
    }

    function handleBtnCLick(e) {
        console.log('12312')
        const tar = e.target;
        const tagName = tar.tagName.toLowerCase();
        if (tagName === 'button') {
            const status = tar.dataset.status;
            modalFatory.create('这是一个工厂模式的应用场景', status);
            // changeStaus(status);
        }
    }

    function changeStaus(status) {
        switch (status) {
            case 'S':
                oModal.className = 'modal success';
                break;
            case 'W':
                oModal.className = 'modal warning';
                break;
            case 'E':
                oModal.className = 'modal error';
                break;
            default:
                break;
        }
    }
    init()
})()