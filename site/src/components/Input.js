import React from 'react'
import store from '../Store';
import './Input.css';

function Input() {
    const [about, setAbout] = React.useState('');
    const [value, setValue] = React.useState('');
    const type = "input";

    return (
        <div className='input'>
            <p>input</p>
            <div className='input-about'>
                <p>About:</p>
                <input value={about} onChange={e => setAbout(e.target.value)} style={{ height: "15px" }} />
            </div>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => store.addToTemplate({ "type": type, "about": about, "value": value })}>Add to template</button>
        </div>
    )
}

export default Input