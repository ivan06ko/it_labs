document.addEventListener("DOMContentLoaded", () => {
    const mouse = document.getElementById('mouse');
    const gameContainer = document.getElementById('game-container');
    
    function getRandomPosition() {
        const containerRect = gameContainer.getBoundingClientRect();
        const x = Math.random() * (containerRect.width - mouse.width);
        const y = Math.random() * (containerRect.height - mouse.height);
        return { x, y };
    }

    gameContainer.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const mouseRect = mouse.getBoundingClientRect();

        const distanceX = mouseRect.x - mouseX;
        const distanceY = mouseRect.y - mouseY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 200) {
            const newPos = getRandomPosition();
            mouse.style.left = `${newPos.x}px`;
            mouse.style.top = `${newPos.y}px`;
        }
    });
});
