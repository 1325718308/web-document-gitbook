import React from 'react';
import './index.css';
import Modal from '../index'
import { formatDateTime } from '../../../libs/utils';

const CheckModal = props => {
    const { isShowCheckModal, data, closeModal } = props;
    return (
        <Modal
            modalTitle="查看事件"
            isShowModal={isShowCheckModal}>
            <p className="topic">时间：{formatDateTime(data.id)}</p>
            <p className="topic">内容：{data.content}</p>
            <p className="topic">状态：{data.completed ? '已完成' : '未完成'}</p>
            <button 
                onClick={closeModal}
                className="btn btn-primary btn-confim">
                确定
            </button>
        </Modal>
    )
}

export default CheckModal;