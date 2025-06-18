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
