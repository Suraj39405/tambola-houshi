let currentIndex = 0;
let intervalId;
let calledNumbers = new Set();
let shuffledNumbers = [];

// Load tickets
fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `<h3>${ticket.name}</h3>` +
        ticket.numbers.map(num => `<span>${num}</span>`).join('');
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

function shuffleNumbers() {
  shuffledNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
  for (let i = shuffledNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]];
  }
}

function callNumber() {
  if (currentIndex >= shuffledNumbers.length) {
    clearInterval(intervalId);
    return;
  }

  const number = shuffledNumbers[currentIndex];
  document.getElementById("number-display").textContent = `Number: ${number}`;
  const cell = document.getElementById(`num-${number}`);
  if (cell) cell.classList.add("called");
  highlightTickets(number);
  calledNumbers.add(number);
  currentIndex++;
}

function highlightTickets(num) {
  document.querySelectorAll(`.ticket span`).forEach(span => {
    if (parseInt(span.textContent) === num) {
      span.classList.add("called");
    }
  });
}

document.getElementById("start-btn").onclick = () => {
  shuffleNumbers(); // randomize order
  clearInterval(intervalId);
  currentIndex = 0;
  intervalId = setInterval(callNumber, 3000);
};

document.getElementById("stop-btn").onclick = () => {
  clearInterval(intervalId);
};

createBoard();
