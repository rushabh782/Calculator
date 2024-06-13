// script.js

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const value = e.target.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.textContent = '0';
                resultDisplayed = false;
                return;
            }

            if (value === '=') {
                if (operator && previousInput && currentInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    operator = '';
                    previousInput = '';
                    resultDisplayed = true;
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput && previousInput && operator) {
                    previousInput = calculate(previousInput, currentInput, operator);
                    display.textContent = previousInput;
                    currentInput = '';
                } else if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
                resultDisplayed = false;
                return;
            }

            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }

            if (value === '.' && currentInput.includes('.')) {
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        });
    });

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        if (isNaN(num1) || isNaN(num2)) return '';
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                if (num2 === 0) {
                    alert("Cannot divide by zero");
                    return num1.toString();
                }
                return (num1 / num2).toString();
            default:
                return '';
        }
    }
});
