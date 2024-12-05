// Додає значення до дисплея
function appendValue(value) {
    document.getElementById('display').value += value;
}

// Очищає дисплей
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Обчислює вираз
function calculate() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        alert('Помилка у виразі!');
    }
}