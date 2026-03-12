const form = document.getElementById("bookingForm");
const ticketList = document.getElementById("ticketList");

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

displayTickets();

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const from = document.getElementById("from").value;
const to = document.getElementById("to").value;
const date = document.getElementById("date").value;
const seatClass = document.getElementById("class").value;

const booking = {
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

function displayTickets(){

ticketList.innerHTML="";

bookings.forEach(ticket => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${ticket.name}</td>
<td>${ticket.from}</td>
<td>${ticket.to}</td>
<td>${ticket.date}</td>
<td>${ticket.seatClass}</td>
`;

ticketList.appendChild(row);

});

}