{
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    const requestData = {
        number1: num1,
        number2: num2,
        operation: operation
    };

    const result = performOperation(requestData);
    document.getElementById('result').innerText = `Результат: ${result}`;
}

function performOperation(data) {
    switch(data.operation) {
        case 'add':
            return data.number1 + data.number2;
        case 'subtract':
            return data.number1 - data.number2;
        case 'multiply':
            return data.number1 * data.number2;
        case 'divide':
            return data.number1 / data.number2;
        default:
            return 'Невідома операція';
    }
}