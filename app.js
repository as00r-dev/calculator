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
let number = "";

// select elements
const NUMBERS = document.querySelectorAll(".number");
const SYMBOLS = document.querySelectorAll(".symbol");
const ANSWER = document.querySelector(".answer");
const HISTORY = document.querySelector(".history");

// event listeners
NUMBERS.forEach((button) => {
	button.addEventListener("click", numberHandler);
});

SYMBOLS.forEach((button) => {
	button.addEventListener("click", symbolHandler);
});

// event handlers
function numberHandler(e) {
	const input = e.target.textContent;
	const p = document.createElement("p");
	const warning = document.createElement("p");

	if (input === "." && number.split(".").length > 1) {
		warning.textContent = "Can't add more than 1 decimal";
		HISTORY.appendChild(warning);
	} else if (number.split(".")[1] && number.split(".")[1].length > 1) {
		warning.textContent = "Only 1 digit after decimal allowed.";
		HISTORY.appendChild(warning);
	} else {
		number += input;
		p.textContent = (+number).toFixed(1);
		ANSWER.innerHTML = "";
		ANSWER.appendChild(p);
	}
}

function symbolHandler(e) {
	const input = e.target.textContent;
	const p = document.createElement("p");
	let answerBoxText = ANSWER.textContent;
	answerBoxText += " " + input;
	ANSWER.innerHTML = "";
	p.textContent = answerBoxText;
	ANSWER.appendChild(p);
}
