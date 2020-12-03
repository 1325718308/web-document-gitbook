import { divide } from 'lodash';
import React, { PureComponent } from 'react';
import './index.css';

function Header(props) {
    const { openInput } = props;
    return(
        <div className="header">
            <h1>事件待办</h1>
            <span 
                onClick={openInput}
                className='icon'>&#43;</span>
        </div>
    )
}

export default Header;