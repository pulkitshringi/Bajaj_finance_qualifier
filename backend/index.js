const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = '';
    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                if (!highest_lowercase_alphabet || item > highest_lowercase_alphabet) {
                    highest_lowercase_alphabet = item;
                }
            }
        }
    });

    if (file_b64) {
        file_valid = true; 
        file_mime_type = 'application/octet-stream'; 
        file_size_kb = (Buffer.byteLength(file_b64, 'base64') / 1024).toFixed(2);
    }

    res.status(200).json({
        is_success: true,
        user_id: "pulkit_shringi_02112002",
        email: "ph1973@srmist.edu.in",
        roll_number: "RA2111003010596",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
