// Load tickets from JSON and display them
fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `
        <h3>${ticket.name}</h3>
        <table>
          ${ticket.rows.map(row => `
            <tr>
              ${row.map(num => `<td>${num === 0 ? '' : num}</td>`).join('')}
            </tr>
          `).join('')}
        </table>
      `;
      container.appendChild(div);
    });
  });

// Number caller logic
let allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let calledNumbers = [];
let interval;
const currentNumber = document.getElementById("current-number");
const calledDisplay = document.getElementById("called-numbers");

document.getElementById("start-btn").addEventListener("click", () => {
  if (interval) return;
  interval = setInterval(() => {
    if (allNumbers.length === 0) {
      clearInterval(interval);
      return;
    }
    const index = Math.floor(Math.random() * allNumbers.length);
    const number = allNumbers.splice(index, 1)[0];
    calledNumbers.push(number);
    currentNumber.textContent = number;
    calledDisplay.textContent = calledNumbers.join(", ");
  }, 5000);
});

document.getElementById("stop-btn").addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});
