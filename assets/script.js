function callNumber() {
  if (calledNumbers.size >= 90) {
    clearInterval(intervalId);
    return;
  }

  let random;
  do {
    random = Math.floor(Math.random() * 90) + 1;
  } while (calledNumbers.has(random));

  calledNumbers.add(random);

  document.getElementById("number-display").textContent = `Number: ${random}`;
  const cell = document.getElementById(`num-${random}`);
  if (cell) cell.classList.add("called");
  highlightTickets(random);
}
