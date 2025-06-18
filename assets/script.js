const grid = document.getElementById("number-grid");
const calledDisplay = document.getElementById("called-number");
const startBtn = document.getElementById("start-btn");

let current = 1;
const totalNumbers = 90;
let interval = null;

// Create grid
for (let i = 1; i <= totalNumbers; i++) {
  const cell = document.createElement("div");
  cell.classList.add("number-cell");
  cell.id = `cell-${i}`;
  cell.textContent = i;
  grid.appendChild(cell);
}

function callNextNumber() {
  if (current > totalNumbers) {
    clearInterval(interval);
    startBtn.disabled = false;
    return;
  }

  calledDisplay.textContent = current;
  const cell = document.getElementById(`cell-${current}`);
  if (cell) {
    cell.classList.add("called");
  }

  current++;
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  current = 1;
  calledDisplay.textContent = "--";

  // Reset all cells
  document.querySelectorAll(".number-cell").forEach(cell => {
    cell.classList.remove("called");
  });

  interval = setInterval(callNextNumber, 3000); // every 3 sec
});
