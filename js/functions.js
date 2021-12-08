`use strict`;

// Setting Default Parameters in Functions

const bookings = [];

const createBooking = (
  trainNum,
  numPassengers = 1,
  price = 200 * numPassengers
) => {
  const booking = {
    trainNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

// Passing only One parameter to the function
createBooking("T45789"); // Result - {trainNum: 'T45789', numPassengers: 1, price: 200}
console.log(bookings); // Result - [{trainNum: 'T45789', numPassengers: 1, price: 200}]

// Passing Two the parameters in the function
createBooking("T23134", 3); // Result - {trainNum: 'T23134', numPassengers: 3, price: 600}
console.log(bookings); // Result - [{trainNum: 'T45789', numPassengers: 1, price: 200}, {trainNum: 'T23134', numPassengers: 3, price: 600}]

// Passing arguments with value and reference
// Example: Create a busBoard function and pass the arguments as an object.

const bus = "A34590";

const mark = {
  name: "Mark Johnson",
  ticketNo: 456789,
};
console.log(mark);

const steve = {
  name: "Steve Smith",
  ticketNo: 234567,
};
console.log(steve);

const busBoard = (busNum, passenger) => {
  busNum = "B45680";
  const passengerName = `Mr. ${passenger.name}`;

  passenger.ticketNo === 456789
    ? console.log(`Hello ${passengerName}, you can board bus - ${busNum}`)
    : console.log(`We don't have any bookings with this number`);
};

busBoard(bus, mark); // Result - Hello Mr. Mark Johnson, you can board bus - B45680
busBoard(undefined, steve); // Result - We don't have any bookings with this number

// Issues that occur using functions when manipulating parameters
const newTicketNo = (person) => {
  person.ticketNo = Math.trunc(Math.random() * 10000);
};

newTicketNo(mark); // Result - The ticket number is changed to the new number
console.log(mark);
busBoard(undefined, mark); // Result - We don't have any bookings with this number (as the ticket no is manipulated by newTicketNo fnctn)
