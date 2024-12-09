// Масив даних про танки
const tankData = [
    {
        name: "T-42A",
        image_url: "images/tanks1.jpg",
        description: ["Модернізований радянський танк з покращеною бронею і озброєнням."]
    },
    {
        name: "MAUS",
        image_url: "images/tanks2.jpg",
        description: ["Німецький важкий танк, відомий своєю великою вагою та бронею."]
    },
    {
        name: "FV215B",
        image_url: "images/tanks3.jpg",
        description: ["Британський важкий танк з великим калібром гармати та хорошою маневреністю."]
    }
];

// Функція для відображення танків у сітці
function displayTanks() {
    const grid = document.getElementById('object-grid');
    grid.innerHTML = ''; // Очистити сітку

    tankData.forEach((tank, index) => {
        const tankElement = document.createElement('div');
        tankElement.classList.add('object');
        tankElement.innerHTML = `
            <img src="${tank.image_url}" alt="${tank.name}">
            <h3>${tank.name}</h3>
            <button class="show-details">Показати деталі</button>
        `;
        tankElement.querySelector('.show-details').addEventListener('click', () => {
            displayTankDetails(index);
        });
        grid.appendChild(tankElement);
    });
}

// Функція для відображення деталей танка
function displayTankDetails(index) {
    const selectedTank = tankData[index];
    document.getElementById('detail-name').textContent = selectedTank.name;
    document.getElementById('detail-image').src = selectedTank.image_url;
    document.getElementById('detail-description').innerHTML = selectedTank.description.map(desc => `<li>${desc}</li>`).join('');

    document.getElementById('object-grid').classList.add('hidden');
    document.getElementById('object-details').classList.remove('hidden');
}

// Повернення до сітки з деталей
document.getElementById('back-to-grid').addEventListener('click', () => {
    document.getElementById('object-details').classList.add('hidden');
    document.getElementById('object-grid').classList.remove('hidden');
});

// Ініціалізація
displayTanks();
