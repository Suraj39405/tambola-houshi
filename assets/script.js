let current = 1;
let intervalId;
let calledNumbers = new Set();

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "agent" && pass === "houshi123") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
  } else {
    document.getElementById("login-error").textContent = "Invalid credentials!";
  }
}

function createBoard() {
  const board = document.getElementById("number-board");
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

  const num = getRandomNumber();
  document.getElementById("number-display").textContent = `Number: ${num}`;
  document.getElementById(`num-${num}`)?.classList.add("called");
  calledNumbers.add(num);
  highlightTickets(num);
}

function getRandomNumber() {
  let num;
  do {
    num = Math.floor(Math.random() * 90) + 1;
  } while (calledNumbers.has(num));
  return num;
}

function highlightTickets(num) {
  document.querySelectorAll(".ticket td").forEach(td => {
    if (parseInt(td.textContent) === num) {
      td.classList.add("called");
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

function loadTickets() {
  fetch("tickets.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("ticket-container");
      data.tickets.forEach(ticket => {
        const div = document.createElement("div");
        div.className = "ticket";
        div.innerHTML = `<h4>${ticket.name}</h4><table>` +
          ticket.grid.map(row =>
            `<tr>${row.map(cell =>
              `<td>${cell || ""}</td>`).join("")}</tr>`
          ).join("") + "</table>";
        container.appendChild(div);
      });
    });
}

createBoard();
loadTickets();
