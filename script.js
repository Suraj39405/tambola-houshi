function generateTicket() {
  let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  numbers.sort(() => Math.random() - 0.5);
  return numbers.slice(0, 15);
}

function createTicketHTML(numbers) {
  const div = document.createElement('div');
  div.className = 'ticket';
  numbers.forEach(n => {
    const span = document.createElement('span');
    span.textContent = n;
    div.appendChild(span);
  });
  return div;
}

const container = document.getElementById('ticket-container');
for (let i = 0; i < 6; i++) {
  const nums = generateTicket();
  const ticket = createTicketHTML(nums);
  container.appendChild(ticket);
}
