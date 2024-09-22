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
  let fileValid = false;
  let fileMimeType = "";
  let fileSizeKB = 0;

  // Check for valid numbers and alphabets
  data.forEach(item => {
    if (/^\d+$/.test(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item);
    }
  });

  // Find highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(item => /^[a-z]+$/.test(item));
  const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

  // Handle file details
  if (file_b64) {
    // Simulating file details extraction
    fileValid = true;
    fileMimeType = "image/png";  // Modify based on real mime type
    fileSizeKB = 400;  // Modify based on actual file size in KB
  }

  res.json({
    is_success: true,
    user_id: 'Haniya_Tariq_15092003',
    email: 'ht8325@srmist.edu.in',
    roll_number: 'RA2111003020422',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
