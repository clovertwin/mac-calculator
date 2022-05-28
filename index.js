const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingforSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingforSecondOperand } = calculator;
  if (waitingforSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingforSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function insertDecimal(decimal) {
  if (calculator.waitingforSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingforSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue += decimal;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingforSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingforSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingforSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const screen = document.getElementById("screen");
  screen.value = calculator.displayValue;
}

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) return;
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("decimal")) {
    insertDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});
