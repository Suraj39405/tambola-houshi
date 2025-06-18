fetch("tickets.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("ticket-Container");
    data.tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `<h3>${ticket.name}</h3>` +
        ticket.numbers.map(num => `<span>${num}</span>`).join('');
      container.appendChild(div);
    });
  });
