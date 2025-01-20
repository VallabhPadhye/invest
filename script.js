const apiBase = 'http://localhost:3000';

async function fetchData() {
  const response = await fetch(`${apiBase}/data`);
  const data = await response.json();

  document.getElementById('summary').innerHTML = `
    <p><strong>Salary:</strong> ${data.salary}</p>
    <p><strong>Remaining:</strong> ${data.remaining}</p>
  `;

  const expensesTable = document.querySelector('#expensesTable tbody');
  expensesTable.innerHTML = data.expenses.map(e => `
    <tr>
      <td>${e.category}</td>
      <td>${e.spend}</td>
    </tr>
  `).join('');

  const investmentsTable = document.querySelector('#investmentsTable tbody');
  investmentsTable.innerHTML = data.investments.map(i => `
    <tr>
      <td>${i.type}</td>
      <td>${i.capital}</td>
    </tr>
  `).join('');
}

document.getElementById('expenseForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const category = document.getElementById('expenseCategory').value;
  const spend = Number(document.getElementById('expenseAmount').value);

  await fetch(`${apiBase}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, spend }),
  });
  fetchData();
});

document.getElementById('investmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const type = document.getElementById('investmentType').value;
  const capital = Number(document.getElementById('investmentAmount').value);

  await fetch(`${apiBase}/investments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, capital }),
  });
  fetchData();
});

fetchData();
    