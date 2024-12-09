// Масив секцій
const sections = document.querySelectorAll('.section');

// Налаштування для плавного переходу
let currentSectionIndex = 0;
let isScrolling = false;

// Перехід до секції
function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => (isScrolling = false), 1000);
    }
}

// Відстеження подій колеса миші
window.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    if (event.deltaY > 0) {
        currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    } else {
        currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
    }
    scrollToSection(currentSectionIndex);
});

// Обробка кліків по навігації
document.querySelectorAll('.nav-link').forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentSectionIndex = index;
        scrollToSection(currentSectionIndex);
    });
});
