// Operation functions
const add = (a, b) => (a + b).toFixed(1);

const subtract = (a, b) => (a - b).toFixed(1);

const multiply = (a, b) => (a * b).toFixed(1);

const divide = (a, b) => (a / b).toFixed(1);

const percentage = (a) => (a / 100).toFixed(1);

const power = (a, b) => Math.pow(a, b).toFixed(1);

const squareRoot = (a) => {
	if (a < 0) {
		displayOnSecondaryScreen("can't work with imaginary numbers.");
		return a;
	} else {
		return Math.sqrt(a).toFixed(1);
	}
};

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
let hasUserEnteredDecimal = false;

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
	if (input === "." && calculator.a) {
		hasUserEnteredDecimal = true;
	}
	if (input === "." && calculator.b) {
		hasUserEnteredDecimal = true;
	}
	if (calculator.operator === "" && input !== ".") {
		// first number (calculator.a)
		if (calculator.a === "") {
			// no number in calculator.a
			calculator.a += (+input).toFixed(1);
		} else if (calculator.a.split(".")[1] === "0") {
			// calculator.a is like x.0
			let tempArr = calculator.a.split(".");
			if (!hasUserEnteredDecimal) {
				tempArr[0] += input;
			} else {
				tempArr[1] = input;
				hasUserEnteredDecimal = false;
			}
			calculator.a = tempArr.join(".");
		}
	} else if (input !== ".") {
		// second number (calculator.b)
		if (calculator.b === "") {
			// no number in calculator.b
			calculator.b += (+input).toFixed(1);
		} else if (calculator.b.split(".")[1] === "0") {
			// calculator.b is like x.0
			let tempArr = calculator.b.split(".");
			if (!hasUserEnteredDecimal) {
				tempArr[0] += input;
			} else {
				tempArr[1] = input;
				hasUserEnteredDecimal = false;
			}
			calculator.b = tempArr.join(".");
		}
	}
	displayOnMainScreen(`${calculator.a} ${calculator.operator} ${calculator.b}`);
}

function symbolHandler(e) {
	const input = e.target.textContent;
	displayOnMainScreen(`${calculator.a} ${calculator.operator} ${calculator.b}`);
	switch (input) {
		case "+":
		case "-":
		case "÷":
		case "×":
		case "^":
			if (calculator.b === "0.0" && calculator.operator === "÷") {
				displayOnSecondaryScreen("Hello Ramanujan");
				ANSWER.innerHTML = "";
				calculator.a = "";
				calculator.b = "";
				calculator.operator = "";
				break;
			}
			if (calculator.operator !== "" && calculator.a) {
				displayOnMainScreen(
					`${operateBinary(
						+calculator.a,
						+calculator.b,
						calculator.operator
					)}  ${input}`
				);
				displayOnSecondaryScreen(
					`${calculator.a} ${calculator.operator} ${calculator.b}`
				);
				calculator.a = (+ANSWER.textContent.replace(/[^0-9.]/g, "")).toFixed(1);
				calculator.b = "";
				calculator.operator = input;
			} else if (calculator.a) {
				calculator.operator = input;
				displayOnMainScreen(
					`${calculator.a} ${calculator.operator} ${calculator.b}`
				);
			}
			break;
		case "√":
		case "%":
		case "±":
			if (calculator.b === "0.0" && calculator.operator === "÷") {
				displayOnSecondaryScreen("Hello Ramanujan");
				ANSWER.innerHTML = "";
				calculator.a = "";
				calculator.b = "";
				calculator.operator = "";
				break;
			}
			if (calculator.a && calculator.b === "") {
				calculator.a = operateUnary(calculator.a, input);
			} else {
				calculator.b = operateUnary(calculator.b, input);
			}
			displayOnMainScreen(
				`${calculator.a} ${calculator.operator} ${calculator.b}`
			);
			break;
		case "=":
			if (calculator.b === "0.0" && calculator.operator === "÷") {
				displayOnSecondaryScreen("Hello Ramanujan");
				ANSWER.innerHTML = "";
				calculator.a = "";
				calculator.b = "";
				calculator.operator = "";
				break;
			}
			displayOnMainScreen(
				operateBinary(+calculator.a, +calculator.b, calculator.operator)
			);
			displayOnSecondaryScreen(
				`${calculator.a} ${calculator.operator} ${calculator.b}`
			);
			calculator.a = (+ANSWER.textContent.replace(/[^-0-9.]/g, "")).toFixed(1);
			calculator.b = "";
			calculator.operator = "";
			break;
		case "C":
			displayOnMainScreen("");
			calculator.a = "";
			calculator.b = "";
			calculator.operator = "";
			break;
		case "AC":
			HISTORY.innerHTML = "";
			displayOnMainScreen("");
			calculator.a = "";
			calculator.b = "";
			calculator.operator = "";
			break;
		case "⌫":
			displayOnSecondaryScreen("This feature coming soon. Use C or AC.");
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
