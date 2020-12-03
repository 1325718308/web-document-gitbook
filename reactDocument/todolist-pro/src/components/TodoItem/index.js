import React from 'react';
import './index.css';

const TodItem = (props) => {
    const { 
        data, 
        openCheckModal, 
        openEditModal,
        completeItem,
        deleteItem
    } = props;
    return(
        <div className="todo-item">
            <div className="check-box">
                <input 
                    onChange={() => completeItem(data.id)}
                    checked={data.completed}
                    type="checkbox" />
            </div>
            <span
                style={{'textDecoration': data.completed ? 'line-through' : 'none'}}
                className="content">
                {data.content}
            </span>
            <div className="btn-group">
                <button 
                    onClick={() => openCheckModal(data.id)}
                    className="btn btn-primary">查看</button>
                <button 
                    onClick={() => openEditModal(data.id)}
                    className="btn btn-warning">编辑</button>
                <button 
                    onClick={() => deleteItem(data.id)}
                    className="btn btn-danger">删除</button>
            </div>
        </div>
    )
}

export default TodItem