let current = 1;
let intervalId;
let calledNumbers = new Set();
let isAgent = false;

// Load tickets
fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `<h3>${ticket.name}</h3><div class="ticket-table">` +
        ticket.grid.flat().map(num =>
          `<span>${num ? num : ""}</span>`
        ).join('') + `</div>`;
      container.appendChild(div);
    });
  });

// Create number board
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

// Highlight matching numbers on tickets
function highlightTickets(num) {
  document.querySelectorAll(".ticket span").forEach(span => {
    if (parseInt(span.textContent) === num) {
      span.classList.add("called");
    }
  });
}

// Call next number
function callNumber() {
  const available = [...Array(90).keys()].map(i => i + 1).filter(n => !calledNumbers.has(n));
  if (available.length === 0) {
    clearInterval(intervalId);
    return;
  }

  const next = available[Math.floor(Math.random() * available.length)];
  calledNumbers.add(next);
  localStorage.setItem("calledNumbers", JSON.stringify([...calledNumbers]));

  document.getElementById("number-display").textContent = `Number: ${next}`;
  document.getElementById(`num-${next}`)?.classList.add("called");
  highlightTickets(next);
}

// Start and Stop functions
function startGame() {
  if (!intervalId) {
    intervalId = setInterval(callNumber, 3000);
  }
}

function stopGame() {
  clearInterval(intervalId);
  intervalId = null;
}

// Agent login
document.getElementById("login-btn").onclick = () => {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "admin" && p === "1234") {
    isAgent = true;
    document.getElementById("controls").classList.remove("hidden");
    document.getElementById("winner-board").classList.remove("hidden");
    document.getElementById("agent-login").classList.add("hidden");
  } else {
    alert("Incorrect login!");
  }
};

// Winner detection (you can add logic here)
function checkWinner() {
  // Custom logic for full house, row, etc.
  document.getElementById("winner-board").innerHTML = "<h3>🎉 Winner Detected!</h3>";
}

// Restore state on refresh
function restoreState() {
  const stored = localStorage.getItem("calledNumbers");
  if (stored) {
    JSON.parse(stored).forEach(n => {
      calledNumbers.add(n);
      document.getElementById(`num-${n}`)?.classList.add("called");
      highlightTickets(n);
    });
  }
}

// New Game
document.getElementById("new-game-btn").onclick = () => {
  localStorage.removeItem("calledNumbers");
  location.reload();
};

// Event bindings
document.getElementById("start-btn").onclick = startGame;
document.getElementById("stop-btn").onclick = stopGame;

// Init
createBoard();
window.onload = restoreState;
