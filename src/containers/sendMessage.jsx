import { useState } from 'react';
import checkValidity from '../utils/validation';

function SendMessages () {
    const [ enabled, setEnabled ] = useState(false);
    const [ input, setInput ] = useState('');

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        const toSet = checkValidity(event.target.value, { minLength: 1, required: true, maxLength: 250 });
        console.log(toSet, input);
        setEnabled(toSet);
    }

    const onSubmitFormHandler = (event) => {
        event.preventDefault();
        const toSend = { message: input };
        console.log(toSend);
    }
    return (
        <div>
            <div>heading</div>
            <div>user to send info</div>
            <form
                onSubmit={ onSubmitFormHandler }
            >
                <div>
                    <label htmlFor="">leave an anonymous message</label>
                    <input 
                        type="text" 
                        placeholder='leave a message'
                        value={ input }
                        onChange={ inputChangeHandler }
                    />
                </div>
                <button
                    disabled={ !enabled }
                >send</button>
            </form>

            <div> user can also register to get anonymous message too</div>
        </div>
    );
}

export default SendMessages;