let intervalId;
let calledNumbers = new Set();

// Load tickets
fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `<h3>${ticket.name}</h3>` +
        ticket.numbers.map(num => 
          `<span>${num !== "" ? num : "&nbsp;"}</span>`).join('');
      container.appendChild(div);
    });
  });

function createBoard() {
  const board = document.getElementById("number-board");
  if (!board) return;

  board.innerHTML = "";
  for (let i = 1; i <= 90; i++) {
    const cell = document.createElement("div");
    cell.classList.add("number");
    cell.id = `num-${i}`;
    cell.textContent = i;
    board.appendChild(cell);
  }
}

function callNumber() {
  if (current > 90) {
    clearInterval(intervalId);
    return;
  }
  document.getElementById("number-display").textContent = `Number: ${current}`;
  const cell = document.getElementById(`num-${current}`);
  if (cell) cell.classList.add("called");
  highlightTickets(current);
  calledNumbers.add(current);
  current++;
}

function highlightTickets(num) {
  document.querySelectorAll(`.ticket span`).forEach(span => {
    if (parseInt(span.textContent) === num) {
      span.classList.add("called");
    }
  });
}

document.getElementById("start-btn").onclick = () => {
  clearInterval(intervalId);
  intervalId = setInterval(callNumber, 3000);
};

document.getElementById("stop-btn").onclick = () => {
  clearInterval(intervalId);
};

createBoard();
