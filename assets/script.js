// Number Caller Logic
let currentNumber = null;
let calledNumbers = [];
let interval = null;

const callerDiv = document.createElement("div");
callerDiv.id = "current-number";
callerDiv.textContent = "Calling No.";
document.body.insertBefore(callerDiv, document.getElementById("ticket-container"));

const calledNumbersDiv = document.createElement("div");
calledNumbersDiv.id = "called-numbers";
calledNumbersDiv.textContent = "Called: ";
document.body.insertBefore(calledNumbersDiv, document.getElementById("ticket-container"));

const startButton = document.createElement("button");
startButton.textContent = "Start Calling";
document.body.insertBefore(startButton, document.getElementById("ticket-container"));

const stopButton = document.createElement("button");
stopButton.textContent = "Stop";
document.body.insertBefore(stopButton, document.getElementById("ticket-container"));

function getNextNumber() {
  if (calledNumbers.length >= 90) {
    clearInterval(interval);
    callerDiv.textContent = "All numbers called!";
    return;
  }

  let num;
  do {
    num = Math.floor(Math.random() * 90) + 1;
  } while (calledNumbers.includes(num));

  calledNumbers.push(num);
  currentNumber = num;
  callerDiv.textContent = num;
  calledNumbersDiv.textContent = "Called: " + calledNumbers.join(", ");
}

// Start and Stop buttons
startButton.onclick = () => {
  if (!interval) {
    interval = setInterval(getNextNumber, 5000); // every 5 seconds
  }
};

stopButton.onclick = () => {
  clearInterval(interval);
  interval = null;
};
