// Operation functions
const add = (a, b) => (a + b).toFixed(1);

const subtract = (a, b) => (a - b).toFixed(1);

const multiply = (a, b) => (a * b).toFixed(1);

const divide = (a, b) => (a / b).toFixed(1);

const percentage = (a) => (a / 100).toFixed(1);

const power = (a, b) => Math.pow(a, b).toFixed(1);

const squareRoot = (a) => Math.sqrt(a).toFixed(1);

// Operation triggers
function operateBinary(a, b, symbol) {
	switch (symbol) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "÷":
			return divide(a, b);
		case "×":
			return multiply(a, b);
		case "^":
			return power(a, b);
		default:
			break;
	}
}

function operateUnary(a, symbol) {
	switch (symbol) {
		case "±":
			return -a;
		case "%":
			return percentage(a);
		case "√":
			return squareRoot(a);
		default:
			break;
	}
}

// global variables
let displayValue = "";

// select elements
const BUTTONS = document.querySelectorAll(".button");
const NUMBERS = document.querySelectorAll(".number");
const SYMBOLS = document.querySelectorAll(".symbol");
const ANSWER = document.querySelector(".answer");
const HISTORY = document.querySelector(".history");

// event listeners
NUMBERS.forEach((button) => {
	button.addEventListener("click", inputHandler);
});

SYMBOLS.forEach((button) => {
	button.addEventListener("click", inputHandler);
});

// event handlers
function inputHandler(e) {
	displayValue += e.target.textContent;
	const p = document.createElement("p");
	p.textContent = displayValue;
	ANSWER.innerHTML = "";
	ANSWER.appendChild(p);
}

// for formatting display value
function displayFormatter() {}
