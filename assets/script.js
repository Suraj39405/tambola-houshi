const grid = document.getElementById("number-grid");
const calledDisplay = document.getElementById("called-number");
const startBtn = document.getElementById("start-btn");

// Create 1 to 90 grid
for (let i = 1; i <= 90; i++) {
  const div = document.createElement("div");
  div.className = "number-cell";
  div.id = `num-${i}`;
  div.textContent = i;
  grid.appendChild(div);
}

let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
let currentIndex = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffle(numbers);

let intervalId = null;

startBtn.addEventListener("click", () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    if (currentIndex >= numbers.length) {
      clearInterval(intervalId);
      return;
    }

    const num = numbers[currentIndex++];
    calledDisplay.textContent = num;
    document.getElementById(`num-${num}`).classList.add("active");
  }, 5000); // change to 2000 for faster calls
});
