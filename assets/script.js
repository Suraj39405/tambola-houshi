let current = 0;
let intervalId;
let calledNumbers = new Set();
let isAgent = false;

// Load and show tickets
fetch("tickets.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `<h3>${ticket.name}</h3>` +
        ticket.grid.map(row =>
          `<div class="row">${row.map(num =>
            `<div class="cell ${num ? '' : 'empty'}">${num || ''}</div>`
          ).join('')}</div>`).join('');
      container.appendChild(div);
    });
  });

function createBoard() {
  const board = document.getElementById("number-board");
  for (let i = 1; i <= 90; i++) {
    const cell = document.createElement("div");
    cell.classList.add("number");
    cell.id = `num-${i}`;
    cell.textContent = i;
    board.appendChild(cell);
  }
}
createBoard();

function callNumber() {
  let next;
  do {
    next = Math.floor(Math.random() * 90) + 1;
  } while (calledNumbers.has(next) && calledNumbers.size < 90);

  if (calledNumbers.size >= 90) {
    clearInterval(intervalId);
    return;
  }

  document.getElementById("number-display").textContent = `Number: ${next}`;
  document.getElementById(`num-${next}`)?.classList.add("called");

  document.querySelectorAll(".cell").forEach(cell => {
    if (parseInt(cell.textContent) === next) {
      cell.classList.add("called");
    }
  });

  calledNumbers.add(next);
}

document.getElementById("start-btn").onclick = () => {
  clearInterval(intervalId);
  intervalId = setInterval(callNumber, 3000);
};
document.getElementById("stop-btn").onclick = () => clearInterval(intervalId);
document.getElementById("new-game-btn").onclick = () => location.reload();

document.getElementById("login-btn").onclick = () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "agent" && pass === "houshi123") {
    isAgent = true;
    document.getElementById("login-container").style.display = "none";
    document.getElementById("game-controls").style.display = "block";
    document.getElementById("winner-board").style.display = "block";
  } else {
    alert("Incorrect login");
  }
};
