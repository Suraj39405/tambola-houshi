let current = 1;
let intervalId;
let calledNumbers = JSON.parse(localStorage.getItem("calledNumbers")) || [];
let agentLoggedIn = false;

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "agent" && pass === "houshi123") {
    agentLoggedIn = true;
    document.getElementById("controls").style.display = "block";
    document.getElementById("winner-board").style.display = "block";
    document.getElementById("agent-login").style.display = "none";
  } else {
    alert("Wrong credentials!");
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
    if (calledNumbers.includes(i)) {
      cell.classList.add("called");
    }
    board.appendChild(cell);
  }
}

function highlightTickets(num) {
  document.querySelectorAll(`.ticket span`).forEach(span => {
    if (parseInt(span.textContent) === num) {
      span.classList.add("called");
    }
  });
}

function callNumber() {
  if (calledNumbers.length >= 90) {
    clearInterval(intervalId);
    return;
  }

  let num;
  do {
    num = Math.floor(Math.random() * 90) + 1;
  } while (calledNumbers.includes(num));

  calledNumbers.push(num);
  localStorage.setItem("calledNumbers", JSON.stringify(calledNumbers));

  document.getElementById("number-display").textContent = `Number: ${num}`;
  const cell = document.getElementById(`num-${num}`);
  if (cell) cell.classList.add("called");
  highlightTickets(num);
}

function newGame() {
  if (!confirm("Are you sure you want to start a new game?")) return;
  clearInterval(intervalId);
  calledNumbers = [];
  localStorage.removeItem("calledNumbers");
  document.getElementById("number-display").textContent = "Number: --";
  createBoard();
  loadTickets(); // re-load ticket UI
}

document.getElementById("start-btn").onclick = () => {
  clearInterval(intervalId);
  intervalId = setInterval(callNumber, 2500);
};

document.getElementById("stop-btn").onclick = () => {
  clearInterval(intervalId);
};

function loadTickets() {
  fetch("tickets.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("ticket-container");
      container.innerHTML = "";
      data.tickets.forEach(ticket => {
        const div = document.createElement("div");
        div.className = "ticket";
        div.innerHTML = `<h3>${ticket.name}</h3>`;
        ticket.grid.forEach(row => {
          const rowDiv = document.createElement("div");
          rowDiv.classList.add("ticket-row");
          row.forEach(num => {
            const cell = document.createElement("span");
            if (num !== "") {
              cell.textContent = num;
              if (calledNumbers.includes(num)) {
                cell.classList.add("called");
              }
            }
            rowDiv.appendChild(cell);
          });
          div.appendChild(rowDiv);
        });
        container.appendChild(div);
      });
    });
}

createBoard();
loadTickets();
