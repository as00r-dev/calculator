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
const calculator = {
	a: "",
	b: "",
	operator: "",
};

// select elements
const BUTTONS = document.querySelectorAll(".button");
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
	if (input === "." && calculator.a.split(".")[1] !== "0") {
		// handle "."
		displayOnSecondaryScreen("only 1 decimal point allowed");
	} else if (input === "." && calculator.b.split(".")[1] !== "0") {
		// handle "."
		displayOnSecondaryScreen("only 1 decimal point allowed");
	} else if (calculator.operator === "") {
		// handle nums
		if (calculator.a === "") {
			// no number in calculator.a
			calculator.a += (+input).toFixed(1);
		} else if (calculator.a.split(".")[1] === "0") {
			// calculator.a is like x.0
			let tempArr = calculator.a.split(".");
			tempArr[1] = input;
			calculator.a = tempArr.join(".");
		} else {
			// calculator.a has already a digit after decimal
			// show error
			displayOnSecondaryScreen("only 1 decimal digit allowed");
		}
	} else {
		// handle nums
		if (calculator.b === "") {
			// no number in calculator.a
			calculator.b += (+input).toFixed(1);
		} else if (calculator.b.split(".")[1] === "0") {
			// calculator.a is like x.0
			let tempArr = calculator.b.split(".");
			tempArr[1] = input;
			calculator.b = tempArr.join(".");
		} else {
			// calculator.b has already a digit after decimal
			// show error
			displayOnSecondaryScreen("only 1 decimal digit allowed");
		}
	}
	displayOnMainScreen(`${calculator.a} ${calculator.operator} ${calculator.b}`);
}

function symbolHandler(e) {
	const input = e.target.textContent;
	displayOnMainScreen(`${calculator.a} ${calculator.operator} ${calculator.b}`);
	switch (input) {
		case "+":
			if (calculator.operator !== "") {
				displayOnMainScreen(
					operateBinary(+calculator.a, +calculator.b, calculator.operator)
				);
				displayOnSecondaryScreen(
					`${calculator.a} ${calculator.operator} ${calculator.b}`
				);
				calculator.a = ANSWER.textContent;
				calculator.b = "";
				calculator.operator = "";
			} else {
				calculator.operator = "+";
				displayOnMainScreen(
					`${calculator.a} ${calculator.operator} ${calculator.b}`
				);
			}
			break;
		case "√":
			calculator.a = squareRoot(+calculator.a);
			displayOnMainScreen(
				`${calculator.a} ${calculator.operator} ${calculator.b}`
			);
			break;
		case "=":
			displayOnMainScreen(
				operateBinary(+calculator.a, +calculator.b, calculator.operator)
			);
			displayOnSecondaryScreen(
				`${calculator.a} ${calculator.operator} ${calculator.b}`
			);
			calculator.a = "";
			calculator.b = "";
			calculator.operator = "";
			break;
	}
}

// display screen

function displayOnMainScreen(s) {
	const display = document.createElement("p");
	display.textContent = s;
	ANSWER.innerHTML = "";
	ANSWER.appendChild(display);
}

function displayOnSecondaryScreen(s) {
	const p = document.createElement("p");
	p.textContent = s;
	HISTORY.appendChild(p);
}
