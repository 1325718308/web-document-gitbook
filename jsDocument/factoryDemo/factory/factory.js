/**
 * 有一些公共的方法、属性、静态工具
 * Modal 父类
 * 
 * 对每种状态内部的属性加工或者每种状态的功能扩展
 * 三个类Success Warninig Error 不同的类
 * 
 * 有个工厂通过传入的状态来给我自动实例化相应的类
 * 
 * Modal Factory->
 */
import { ModalTypes } from './typing.js';
class Modal {
    constructor(status) {
        this.status = status;
    }

    get className() {
        let classStr = 'modal';
        switch (this.status) {
            case ModalTypes.SUCCESS:
                classStr += ' success';
                break;
            case ModalTypes.WARNING:
                classStr += ' warning';
                break;
            case ModalTypes.ERROR:
                classStr += ' error';
                break;
            default:
                break;
        }
        return classStr;
    }

    static checkSatusExist(types, status) {
        for(let ke in types) {
            if (types[key] === status) {
                return true;
            }
        }
        return false;
    }
}

class SuccessModal extends Modal {
    constructor(title) {
        super(ModalTypes.SUCCESS)
        this.title = "成功：" + title;
    }
}

class WarningModal extends Modal {
    constructor(title) {
        super(ModalTypes.WARNING)
        this.title = "告警：" + title;
    }
}

class ErrorModal extends Modal {
    constructor(title) {
        super(ModalTypes.ERROR)
        this.title = "失败：" + title;
    }
}

class ModalFactory {
    constructor(dom) {
        this.dom = dom;
    }

    create(title, status) {
        const statusIsExist = Modal.checkSatusExist(ModalTypes, status);
        if (!statusIsExist) {
            throw new Error('Modal type is incorrect');
        }
        const dom = this.dom;
        let modal = null;
        switch (status) {
            case ModalTypes.SUCCESS:
                modal = new SuccessModal(title);
                break;
            case ModalTypes.WARNING:
                modal = new new WarningModal(title);
                break;
            case ModalTypes.ERROR:
                modal = new ErrorModal(title);
                break;
            default:
                break;
        }
        dom.getElementsByTagName('header')[0].innerText = modal.title;
        dom.className = modal.className;
    }
}
export default ModalFactory;