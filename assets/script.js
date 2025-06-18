fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `
        <h3>${ticket.name}</h3>
        <table class="ticket-grid">
          ${Array(3).fill('').map((_, rowIndex) => `
            <tr>
              ${ticket.numbers[rowIndex].map(num =>
                `<td>${num || ''}</td>`
              ).join('')}
            </tr>
          `).join('')}
        </table>
      `;
      container.appendChild(div);
    });
  });
let numbers = [...Array(90).keys()].map(x => x + 1);
let interval;
let currentIndex = 0;
let callLines = {};

fetch("assets/numbers.json")
  .then(res => res.json())
  .then(data => {
    callLines = data;
});

function startCalling() {
  shuffle(numbers);
  interval = setInterval(() => {
    if (currentIndex >= numbers.length) {
      clearInterval(interval);
      return;
    }
    let num = numbers[currentIndex];
    document.getElementById("current-number").innerText = num;
    document.getElementById("call-line").innerText = callLines[num] || `Number ${num}`;
    speak(callLines[num] || `Number ${num}`);
    currentIndex++;
  }, 5000);
}

function pauseCalling() {
  clearInterval(interval);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-IN';
  window.speechSynthesis.speak(msg);
}
let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
let currentIndex = 0;
let interval = null;

// Shuffle numbers
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(numbers);

function callNextNumber() {
  if (currentIndex < numbers.length) {
    const number = numbers[currentIndex];
    document.getElementById("current-number").textContent = number;
    document.getElementById("call-line").textContent = getLine(number);
    currentIndex++;
  } else {
    clearInterval(interval);
    alert("All numbers have been called!");
  }
}

function startCalling() {
  if (!interval) {
    interval = setInterval(callNextNumber, 5000); // call every 5 sec
  }
}

function pauseCalling() {
  clearInterval(interval);
  interval = null;
}

function getLine(num) {
  const lines = {
    1: "1 is the beginning!",
    14: "14 is Valentine's Day",
    50: "Half Century!",
    90: "Top of the game!",
    // Add more custom lines here
  };
  return lines[num] || `Number ${num}`;
}
