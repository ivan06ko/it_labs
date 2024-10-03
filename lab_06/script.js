function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').innerText = 'Будь ласка, введіть обидва числа.';
        return;
    }

    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num2 !== 0 ? num1 / num2 : 'Неможливо ділити на нуль!';
            break;
        default:
            result = 'Невідома операція';
    }

    document.getElementById('result').innerText = `Результат: ${result}`;
}