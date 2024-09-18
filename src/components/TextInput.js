import React from 'react';

function TextInput({title, state, setState}) {
    return (
        <React.Fragment>
            <label>{title}</label>
            <input type='number' placeholder={title} value={state} onChange={(e) => setState(e.target.value)} />
        </React.Fragment>
    )
}

export default TextInput;