import React from 'react'
import store from '../Store';
import './Textarea.css';

function Textarea() {
    const [about, setAbout] = React.useState('');
    const [value, setValue] = React.useState('');
    const type = "textarea";

    return (
        <div className='textarea'>
            <p>textarea</p>
            <div className='textarea-about'>
                <p>About:</p>
                <input value={about} onChange={e => setAbout(e.target.value)} />
            </div>
            <textarea value={value} onChange={e => setValue(e.target.value)}></textarea>
            <button onClick={() => store.addToTemplate({ "type": type, "about": about, "value": value })}>Add to template</button>
        </div>
    )
}

export default Textarea;

