// =================== LOGIN SECTION ===================
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (user === "admin" && pass === "1234") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    error.textContent = "";
  } else {
    error.textContent = "Invalid username or password";
  }
}

// ============== NUMBER CALLER LOGIC ==================
let current = 1;
let intervalId;
let calledNumbers = new Set();

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

document.getElementById("start-btn").onclick = () => {
  clearInterval(intervalId);
  intervalId = setInterval(callNumber, 3000);
};

document.getElementById("stop-btn").onclick = () => {
  clearInterval(intervalId);
};

function createBoard() {
  const board = document.getElementById("number-board");
  if (!board) return;
  board.innerHTML = "";
  for (let i = 1; i <= 90; i++) {
    const div = document.createElement("div");
    div.className = "number";
    div.id = `num-${i}`;
    div.textContent = i;
    board.appendChild(div);
  }
}

createBoard();

// ============== TICKET LOADER + HIGHLIGHT =============
fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");

      const title = document.createElement("h3");
      title.textContent = ticket.name;
      ticketDiv.appendChild(title);

      const table = document.createElement("table");
      table.className = "ticket-table";

      ticket.grid.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(num => {
          const td = document.createElement("td");
          td.textContent = num || "";
          if (num) td.setAttribute("data-number", num);
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });

      ticketDiv.appendChild(table);
      container.appendChild(ticketDiv);
    });
  });

function highlightTickets(num) {
  document.querySelectorAll(`[data-number='${num}']`).forEach(cell => {
    cell.classList.add("called");
  });
}
