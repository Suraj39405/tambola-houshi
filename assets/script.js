let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
let calledNumbers = [];
let callInterval;

function createBoard() {
  const board = document.getElementById("number-board");
  for (let i = 1; i <= 90; i++) {
    const cell = document.createElement("span");
    cell.id = `num-${i}`;
    cell.innerText = i;
    board.appendChild(cell);
  }
}

function highlightNumber(num) {
  document.getElementById("display-number").innerText = num;
  document.getElementById(`num-${num}`).classList.add("called");

  // Highlight on all tickets
  document.querySelectorAll(".ticket span").forEach(span => {
    if (span.innerText == num) {
      span.classList.add("marked");
    }
  });
}

function callNextNumber() {
  if (numbers.length === 0) {
    clearInterval(callInterval);
    alert("All numbers called!");
    return;
  }
  const index = Math.floor(Math.random() * numbers.length);
  const num = numbers.splice(index, 1)[0];
  calledNumbers.push(num);
  highlightNumber(num);
}

function startNumberCall() {
  if (!callInterval) {
    callInterval = setInterval(callNextNumber, 5000); // every 5 seconds
  }
}

function stopNumberCall() {
  clearInterval(callInterval);
  callInterval = null;
}

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

createBoard();
