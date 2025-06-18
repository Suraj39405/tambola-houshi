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
