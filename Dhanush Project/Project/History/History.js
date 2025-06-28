const historyList = document.getElementById('history-list');

// Simulated history — load from localStorage
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

if (!paymentHistory.length) {
  historyList.innerHTML = '<p class="empty-message">No payment records yet. Start scanning and checking out!</p>';
} else {
  paymentHistory.reverse().forEach((record, index) => {
    const div = document.createElement('div');
    div.className = 'history-entry';

    const date = new Date(record.timestamp).toLocaleString();

    const items = record.items.map(item => {
      return `<li>${item.name} (${item.variant}) – ${item.price}</li>`;
    }).join('');

    div.innerHTML = `
      <h3>Transaction #${paymentHistory.length - index}</h3>
      <p><strong>Date:</strong> ${date}</p>
      <ul>${items}</ul>
      <p><strong>Total:</strong> ₹${record.total}</p>
    `;

    historyList.appendChild(div);
  });
}
