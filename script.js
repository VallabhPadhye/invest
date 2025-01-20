// Retrieve data from localStorage or initialize to empty arrays
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const investments = JSON.parse(localStorage.getItem('investments')) || [];
const income = JSON.parse(localStorage.getItem('income')) || [];

// Update the UI with the stored data
function updateUI() {
  // Update Expenses Table
  const expensesTable = document.querySelector("#expensesTable tbody");
  expensesTable.innerHTML = expenses.map(exp => 
    `<tr><td>${exp.category}</td><td>${exp.amount}</td></tr>`
  ).join('');

  // Update Investments Table
  const investmentsTable = document.querySelector("#investmentsTable tbody");
  investmentsTable.innerHTML = investments.map(inv => 
    `<tr><td>${inv.type}</td><td>${inv.amount}</td></tr>`
  ).join('');

  // Update Income Table
  const incomeTable = document.querySelector("#incomeTable tbody");
  incomeTable.innerHTML = income.map(inc => 
    `<tr><td>${inc.amount}</td></tr>`
  ).join('');

  // Update Summary
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const balance = totalIncome - totalExpenses;

  document.getElementById('summary').innerHTML = `
    Total Income: ₹${totalIncome}<br>
    Total Expenses: ₹${totalExpenses}<br>
    Total Investments: ₹${totalInvestments}<br>
    Balance: ₹${balance}
  `;
}

// Add Expense
document.getElementById('expenseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const category = document.getElementById('expenseCategory').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  expenses.push({ category, amount });
  localStorage.setItem('expenses', JSON.stringify(expenses));

  updateUI();
  e.target.reset();
});

// Add Investment
document.getElementById('investmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const type = document.getElementById('investmentType').value;
  const amount = parseFloat(document.getElementById('investmentAmount').value);

  investments.push({ type, amount });
  localStorage.setItem('investments', JSON.stringify(investments));

  updateUI();
  e.target.reset();
});

// Add Income
document.getElementById('incomeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('incomeAmount').value);

  income.push({ amount });
  localStorage.setItem('income', JSON.stringify(income));

  updateUI();
  e.target.reset();
});

// Initial UI update
updateUI();
