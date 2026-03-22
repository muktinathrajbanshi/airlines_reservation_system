const form = document.getElementById("bookingForm");
const ticketList = document.getElementById("ticketList");
const searchInput = document.getElementById("search");
const darkToggle = document.getElementById("darkToggle");

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

displayTickets();

// ✅ Add Booking
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;
  const seatClass = document.getElementById("class").value;

  if (!name || !from || !to || !date) {
    alert("Please fill all fields!");
    return;
  }

  const booking = {
    id: Date.now(),
    name,
    from,
    to,
    date,
    seatClass
  };

  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  displayTickets();
  form.reset();
});

// ✅ Display Tickets
function displayTickets(data = bookings) {
  ticketList.innerHTML = "";

  data.forEach(ticket => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ticket.id}</td>
      <td>${ticket.name}</td>
      <td>${ticket.from}</td>
      <td>${ticket.to}</td>
      <td>${ticket.date}</td>
      <td>${ticket.seatClass}</td>
      <td>
        <button onclick="deleteTicket(${ticket.id})">❌</button>
      </td>
    `;

    ticketList.appendChild(row);
  });
}

// ✅ Delete Ticket
function deleteTicket(id) {
  bookings = bookings.filter(ticket => ticket.id !== id);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayTickets();
}

// ✅ Search
searchInput.addEventListener("input", function() {
  const value = this.value.toLowerCase();

  const filtered = bookings.filter(ticket =>
    ticket.name.toLowerCase().includes(value)
  );

  displayTickets(filtered);
});

// ✅ Export CSV
function downloadCSV() {
  let csv = "ID,Name,From,To,Date,Class\n";

  bookings.forEach(t => {
    csv += `${t.id},${t.name},${t.from},${t.to},${t.date},${t.seatClass}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tickets.csv";
  a.click();
}

// ✅ Dark Mode Toggle
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");

  darkToggle.textContent =
    document.body.classList.contains("dark")
      ? "☀ Light Mode"
      : "🌙 Dark Mode";
};