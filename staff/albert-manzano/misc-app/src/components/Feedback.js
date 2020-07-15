import React from 'react';

export default({ message, level })=> {
    return <p className={`feedback feedback--${level}`}>{message}</p>
}