import React, { useRef } from 'react';
import './index.css';

const AddInput = (props) => {
    const { isInputShow, addItem} = props;
    const inputRef = useRef();
    const submitValue = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue.lengtn === 0) return;
        addItem(inputValue);
        inputRef.current.value = '';
    }
    return (
        <>
        {
            isInputShow ? 
            <div className="input-wraper">
                <input 
                    ref={inputRef}
                    className="input"
                    type="text"
                    placeholder="请输入代办事件"
                />
                <button 
                    onClick={submitValue}
                    className="btn btn-primary">
                    添加
                </button>
            </div>
            : ''
        }
        </>
    )
}

export default AddInput;