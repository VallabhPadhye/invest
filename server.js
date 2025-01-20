// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory data store (replace with a database in production)
let data = {
  salary: 25599,
  expenses: [],
  investments: [],
};

// Calculate remaining balance
const calculateRemaining = () => {
  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.spend, 0);
  const totalInvestments = data.investments.reduce((sum, i) => sum + i.capital, 0);
  return data.salary - totalExpenses - totalInvestments;
};

// Routes
app.get('/data', (req, res) => {
  res.json({ ...data, remaining: calculateRemaining() });
});

app.post('/expenses', (req, res) => {
  const { category, spend } = req.body;
  if (!data.expenses.some(e => e.category === category)) {
    data.expenses.push({ category, spend });
    res.json({ message: 'Expense category added!', remaining: calculateRemaining() });
  } else {
    res.status(400).json({ message: 'Expense category already exists!' });
  }
});

app.post('/investments', (req, res) => {
  const { type, capital } = req.body;
  if (!data.investments.some(i => i.type === type)) {
    data.investments.push({ type, capital });
    res.json({ message: 'Investment type added!', remaining: calculateRemaining() });
  } else {
    res.status(400).json({ message: 'Investment type already exists!' });
  }
});

app.put('/expenses', (req, res) => {
  const { category, spend } = req.body;
  const expense = data.expenses.find(e => e.category === category);
  if (expense) {
    expense.spend = spend;
    res.json({ message: 'Expense updated!', remaining: calculateRemaining() });
  } else {
    res.status(404).json({ message: 'Expense category not found!' });
  }
});

app.put('/investments', (req, res) => {
  const { type, capital } = req.body;
  const investment = data.investments.find(i => i.type === type);
  if (investment) {
    investment.capital = capital;
    res.json({ message: 'Investment updated!', remaining: calculateRemaining() });
  } else {
    res.status(404).json({ message: 'Investment type not found!' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
