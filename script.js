// Retrieve data from localStorage or initialize to empty arrays
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const investments = JSON.parse(localStorage.getItem('investments')) || [];
const income = JSON.parse(localStorage.getItem('income')) || [];

// Update the UI with the stored data
function updateUI() {
  // Update Summary with Income only
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  document.getElementById('summary').innerHTML = `
    Total Income: ₹${totalIncome}
  `;

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
}

// Add Expense
document.getElementById('expenseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const category = document.getElementById('expenseCategory').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  expenses.push({ category, amount });
  localStorage.setItem('expenses', JSON.stringify(expenses));

  updateUI();
  closeExpenseModal();
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
  closeInvestmentModal();
  e.target.reset();
});

// Open Expense Modal
const expenseModal = document.getElementById('expenseModal');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const closeExpenseModal = document.getElementById('closeExpenseModal');
addExpenseBtn.onclick = function() {
  expenseModal.style.display = "block";
}

// Close Expense Modal
closeExpenseModal.onclick = function() {
  expenseModal.style.display = "none";
}

// Open Investment Modal
const investmentModal = document.getElementById('investmentModal');
const addInvestmentBtn = document.getElementById('addInvestmentBtn');
const closeInvestmentModal = document.getElementById('closeInvestmentModal');
addInvestmentBtn.onclick = function() {
  investmentModal.style.display = "block";
}

// Close Investment Modal
closeInvestmentModal.onclick = function() {
  investmentModal.style.display = "none";
}

// Close Modals when clicking outside
window.onclick = function(event) {
  if (event.target === expenseModal) {
    expenseModal.style.display = "none";
  }
  if (event.target === investmentModal) {
    investmentModal.style.display = "none";
  }
}

// Initial UI update
updateUI();
