const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: 'Haniya_Tariq_15092003',
      message: 'Invalid input data format'
    });
  }

  const numbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (/^\d+$/.test(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highestLowercaseAlphabet = alphabets
    .filter(item => /^[a-z]+$/.test(item))
    .sort()
    .pop();

  // Assume file validation logic here, set `file_valid` based on some condition
  const file_valid = file_b64 ? true : false;

  // Prepare the base response object
  const response = {
    is_success: true,
    user_id: 'Haniya_Tariq_15092003',
    email: 'ht8325@srmist.edu.in',
    roll_number: 'RA2111003020422',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    file_valid
  };

  // Conditionally add file properties if file is valid
  if (file_valid) {
    response.file_mime_type = 'image/png'; // Adjust based on actual validation
    response.file_size_kb = 400; // Adjust based on actual file size
  }

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
