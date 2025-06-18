fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-container");
    data.tickets.forEach(ticket => {
      const ticketDiv = document.createElement("div");
      ticketDiv.className = "ticket";
      ticketDiv.innerHTML = `
        <h3>${ticket.name}</h3>
        ${createTicketTable(ticket.numbers)}
      `;
      container.appendChild(ticketDiv);
    });
  });

function createTicketTable(numbers) {
  let table = "<table>";
  for (let i = 0; i < 3; i++) {
    table += "<tr>";
    for (let j = 0; j < 9; j++) {
      const num = numbers[i * 9 + j];
      table += `<td>${num || ""}</td>`;
    }
    table += "</tr>";
  }
  table += "</table>";
  return table;
}
