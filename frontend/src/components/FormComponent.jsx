import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/FormComponent.module.css';
import bajaj from '../assets/bajajlogo.jpg'

const FormComponent = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:5001/bfhl', parsedInput);
            setResponse(res.data);
        } catch (error) {
            console.error('Invalid JSON input or server error:', error);
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(checked
            ? [...selectedOptions, value]
            : selectedOptions.filter(option => option !== value));
    };

    return (
        <div className={styles.container}>
            <img src={bajaj} alt="Bajaj Logo" className={styles.logo}/>
            <h1>Submit JSON</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    className={styles.textarea}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON...'
                ></textarea>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>

            {response && (
                <div>
                    <h2>Response</h2>
                    <label>
                        <input
                            type="checkbox"
                            value="alphabets"
                            onChange={handleOptionChange}
                        />
                        Alphabets
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="numbers"
                            onChange={handleOptionChange}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="highest_lowercase_alphabet"
                            onChange={handleOptionChange}
                        />
                        Highest Lowercase Alphabet
                    </label>

                    <div className={styles.responseContainer}>
                        {selectedOptions.includes('alphabets') && (
                            <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <div>Numbers: {JSON.stringify(response.numbers)}</div>
                        )}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <div>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormComponent;