import express from "express";

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Constants for user-specific details
const USER_ID = "yashwini_singh_23022000"; // Full name and birthdate
const EMAIL = "22bcs10061@cuchd.in"; // Registered email
const ROLL_NUMBER = "22bcs10061"; // Roll number

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array",
      });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item)); // Filter numbers
    const alphabets = data.filter(
      (item) => isNaN(item) && item.length === 1 && /^[a-zA-Z]$/.test(item)
    ); // Filter single alphabets

    // Find the highest alphabet (case-insensitive)
    const highestAlphabet = alphabets.length
      ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
      : [];

    // Send response
    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    console.error("Error in /bfhl endpoint:", error); // Log the error for debugging
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});