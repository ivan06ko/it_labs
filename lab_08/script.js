document.querySelectorAll('.folder').forEach(folder => {
    folder.addEventListener('click', (e) => {
        // Зупиняємо "спливання" подій, щоб не закривати вищі папки
        e.stopPropagation();

        // Перемикаємо клас open для поточної папки
        folder.classList.toggle('open');
    });
});
