// script.js - Full working Tambola game logic

let currentNumber = 0; let intervalId = null; let calledNumbers = []; let isGameRunning = false;

const username = "admin"; const password = "1234";

function showLogin() { document.getElementById("login-box").style.display = "block"; document.getElementById("game-container").style.display = "none"; }

function showGame() { document.getElementById("login-box").style.display = "none"; document.getElementById("game-container").style.display = "block"; }

document.getElementById("login-btn").addEventListener("click", () => { const user = document.getElementById("username").value; const pass = document.getElementById("password").value; if (user === username && pass === password) { showGame(); } else { alert("Incorrect username or password"); } });

function createBoard() { const board = document.getElementById("number-board"); for (let i = 1; i <= 90; i++) { const div = document.createElement("div"); div.className = "number"; div.id = num-${i}; div.textContent = i; board.appendChild(div); } }

function highlightTickets(num) { document.querySelectorAll(".ticket span").forEach(span => { if (parseInt(span.textContent) === num) { span.classList.add("called"); } }); }

function callNextNumber() { const remaining = [...Array(90).keys()].map(i => i + 1).filter(n => !calledNumbers.includes(n)); if (remaining.length === 0) { clearInterval(intervalId); return; } const next = remaining[Math.floor(Math.random() * remaining.length)]; calledNumbers.push(next);

document.getElementById("number-display").textContent = Number: ${next}; const cell = document.getElementById(num-${next}); if (cell) cell.classList.add("called"); highlightTickets(next); }

document.getElementById("start-btn").addEventListener("click", () => { if (!isGameRunning) { isGameRunning = true; intervalId = setInterval(callNextNumber, 3000); } });

document.getElementById("stop-btn").addEventListener("click", () => { isGameRunning = false; clearInterval(intervalId); });

function loadTickets() { fetch("tickets.json") .then(res => res.json()) .then(data => { const container = document.getElementById("ticket-container"); data.tickets.forEach(ticket => { const div = document.createElement("div"); div.className = "ticket"; div.innerHTML = <h3>${ticket.name}</h3> + ticket.grid.map(row => <div class='ticket-row'>${row.map(num => num ? <span>${num}</span>:<span class='empty'></span>).join('')}</div> ).join(''); container.appendChild(div); }); }); }

createBoard(); loadTickets(); showLogin();

