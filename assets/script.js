let calledNumbers = new Set();
let availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let intervalId = null;

// Shuffle helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
        ticket.numbers.map(num =>
          num !== "" ? `<span>${num}</span>` : `<span class="empty"> </span>`
        ).join('');
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

function callRandomNumber() {
  if (availableNumbers.length === 0) {
    clearInterval(intervalId);
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const number = availableNumbers.splice(randomIndex, 1)[0]; // Remove called number

  document.getElementById("number-display").textContent = `Number: ${number}`;
  document.getElementById(`num-${number}`)?.classList.add("called");

  highlightTickets(number);
  calledNumbers.add(number);
}

function highlightTickets(num) {
  document.querySelectorAll(`.ticket span`).forEach(span => {
    if (parseInt(span.textContent) === num) {
      span.classList.add("called");
    }
  });
}

// Start / Stop buttons
document.getElementById("start-btn").onclick = () => {
  clearInterval(intervalId);
  intervalId = setInterval(callRandomNumber, 3000);
};

document.getElementById("stop-btn").onclick = () => {
  clearInterval(intervalId);
};

createBoard();
fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");

    data.tickets.forEach(ticket => {
      const ticketDiv = document.createElement("div");
      ticketDiv.className = "ticket";
      
      const title = document.createElement("h3");
      title.textContent = ticket.name;
      ticketDiv.appendChild(title);

      ticket.grid.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "ticket-row";

        row.forEach(cell => {
          const cellDiv = document.createElement("div");
          cellDiv.className = "ticket-cell";

          if (cell !== "") {
            cellDiv.textContent = cell;
            cellDiv.dataset.number = cell;
          }

          rowDiv.appendChild(cellDiv);
        });

        ticketDiv.appendChild(rowDiv);
      });

      container.appendChild(ticketDiv);
    });
  });
