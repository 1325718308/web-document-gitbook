import React, {useRef} from 'react';
import './index.css';
import Modal from '../index';
import { formatDateTime } from '../../../libs/utils';

const EditModal = props => {
    const { isShowEditModal, data, submitEdit } = props;
    const inputRef = useRef();
    const checkRef = useRef();
    const formatNewData = () => {
        const value = inputRef.current.value.trim();
        const valLen = value.length;
        if (valLen === 0) {
            inputRef.current.value = data.content;
            return;
        }
        const newData = {
            id: new Date().getTime(),
            content: value,
            completed: checkRef.current.checked
        }
        submitEdit(newData, data.id);
    }
    return (
        <Modal
            isShowModal={isShowEditModal}
            modalTitle="编辑事件">
            <p className="topic">时间：{formatDateTime(data.id)}</p>
            <p className="topic">
                <textarea
                    defaultValue={data.content}
                    className="text-area"
                    ref={inputRef}
                    >
                </textarea>
            </p>
            <p className="topic">
                状态：
                <input 
                    ref={checkRef}
                    defaultChecked={data.completed ? true : false}
                    type='checkbox' />
            </p>
            <button
                onClick={formatNewData}
                className="btn btn-primary confirm-btn"
            >提交
            </button>
        </Modal>
    )
}
export default EditModal;