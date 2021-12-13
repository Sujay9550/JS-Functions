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

// First Class Function & Higher Order Functions

// First Class Functions

const oneWord = (str) => {
  return str.replaceAll(" ", "").toLowerCase();
};
console.log(oneWord("JavaScript is the best!")); // Result - javascriptisthebest!

const upperFirstWord = (str) => {
  console.log(str.split(" ")); // Result - ['JavaScript', 'is', 'the', 'best!']
  const [first, ...others] = str.split(" ");
  console.log(first, others); // Result - Javascript ['is', 'the', 'best!']
  return [first.toUpperCase(), ...others].join(" ");
};
console.log(upperFirstWord("JavaScript is the best!")); // Result - JAVASCRIPT is the best!

// Higher Order Function - Function accepting Callback Functions

const stringTransformer = (str, fn) => {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed By Function: ${fn.name}`);
};

stringTransformer("JavaScript is the best!", oneWord);
stringTransformer("JavaScript is the best!", upperFirstWord);

// Example
const high5 = () => {
  console.log("Hey there!");
};

document.body.addEventListener("click", high5); // Here high5 is the callback function

// Function Returning Functions

const printName = (firstname) => {
  return (lastname) => {
    console.log(`Your name is ${firstname} ${lastname}`);
  };
};

const fullname = printName("Mark");
fullname("Johnson"); // Result - Your name is Mark Johnson
fullname("Martin"); // Result - Your name is Mark Martin
printName("Mitchelle")("Johnson"); // Result - Your name is Mitchelle Johnson

const countIncrease = (count) => {
  return () => {
    count += 1;
    let p = document.querySelector(".counter");
    p.textContent = count;
    console.log(count);
  };
};

const increment = countIncrease(0);
document.body.addEventListener("keydown", increment);

// Closures

//Global Scope
let a = 0;

// Function Scope
const myFunction = () => {
  let b = 1;
  console.log(a); // Result - 0
  console.log(b); // Result - 1
};

myFunction();
console.log(a);
// console.log(b); // Error - Uncaught ReferenceError: b is not defined (b is in the function scope & not in the global scope)

// Examples - Closures

// 1.
const getWelcomeMessage = () => {
  let message = "Hello Welcome,";

  return (name) => {
    return message + name;
  };
};

const greeting = getWelcomeMessage();
console.log(greeting("Johnson"));

// 2.
let x = 2;

const addNumber1 = (y) => {
  return (z) => {
    return x + y + z;
  };
};

const result1 = addNumber1(3);
console.log(result1(5));

// 3.
const addNumber2 = (m) => {
  let n = 2;
  return (o) => {
    return m + n + o;
  };
};

const result2 = addNumber2(2);
console.log(result2(2));

// Call & Apply Methods - (Used to merge a functon)

const vishal = {
  busOperator: "Vishal Tourist",
  busCode: "VT",
  bookings: [],

  bookBus(busNumber, passengerName) {
    console.log(
      `${passengerName} has booked a seat in ${this.busOperator} bus ${this.busCode}${busNumber}`
    );

    this.bookings.push({
      bus: `${this.busOperator} ${this.busCode}${busNumber}`,
      name: passengerName,
    });
  },
};

const sugama = {
  busOperator: "Sugama Tourist",
  busCode: "ST",
  bookings: [],
};

const anand = {
  busOperator: "Anand Tourist",
  busCode: "AT",
  bookings: [],
};

// Storing bookBus method in the variable
const bookingBus = vishal.bookBus;

vishal.bookBus(3480, "Arjun");
vishal.bookBus(3480, "Akash");
console.log(vishal);

// Using the Call Method

bookingBus.call(sugama, 6724, "John");
bookingBus.call(sugama, 6724, "James");
console.log(sugama);

// Using the Apply Method - This method will take arguments as an array
const busData1 = [4520, "Anish"];
bookingBus.apply(anand, busData1); // Not used in modern javascript

// Instead use below methods
const busData2 = [4520, "Amith"];
bookingBus.call(anand, ...busData2);
console.log(anand);

// The Bind Method - lets us to manually set the this keyword for any function call. it return a new function. store the function in a new variable

const orange = {
  busOperator: "Orange Tourist",
  busCode: "OT",
  bookings: [],

  bookBus(busNumber, passengerName) {
    console.log(
      `${passengerName} has booked a seat in ${this.busOperator} bus ${this.busCode}${busNumber}`
    );

    this.bookings.push({
      bus: `${this.busOperator} ${this.busCode}${busNumber}`,
      name: passengerName,
    });
  },
};

const book = orange.bookBus;
console.log(book);

const bookST = book.bind(sugama);
bookST(35, "Steeve");

// Bind Method - With Event Listeners

orange.bus = 20;
orange.buyBus = function () {
  console.log(this);

  this.bus++;
  console.log(this.bus);
};

// document.querySelector(".btn").addEventListener("click", orange.buyBus);
// As seen now in the above code, the this keyword is pointed to the btn button, hence we will not get the desired result.
// Hence use the Bind Method to manually set the this keyword to the orange object
document
  .querySelector(".btn")
  .addEventListener("click", orange.buyBus.bind(orange));
