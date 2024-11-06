// Додає тег фільтру
function addTag(tagText) {
    const filterTags = document.querySelector('.filter-tags');
    if (!Array.from(filterTags.children).some(tag => tag.textContent.includes(tagText))) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `${tagText} <span class="remove" onclick="removeTag(this)">✖</span>`;
        filterTags.appendChild(tag);
    }
    filterJobs();
}

// Видаляє окремий тег фільтру
function removeTag(element) {
    element.parentElement.remove();
    filterJobs();
}

// Очищає всі теги у фільтрі
function clearFilters() {
    document.querySelector('.filter-tags').innerHTML = '';
    filterJobs();
}

// Фільтрує вакансії на основі тегів
function filterJobs() {
    const filterTags = Array.from(document.querySelectorAll('.filter-tags .tag')).map(tag => tag.textContent.trim());
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        const cardTags = card.getAttribute('data-tags').split(' ');
        const isMatch = filterTags.every(tag => cardTags.includes(tag));
        card.style.display = isMatch ? 'flex' : 'none';
    });
}

// Підсвічує теги, які відповідають введеному тексту
function highlightMatchingTags(event) {
    const inputText = event.target.value.trim().toLowerCase();
    const allTags = new Set();
    document.querySelectorAll('.job-card').forEach(card => {
        card.getAttribute('data-tags').split(' ').forEach(tag => allTags.add(tag.toLowerCase()));
    });

    if (inputText && allTags.has(inputText)) {
        addTag(inputText);
        event.target.value = '';
    }
}

// Темний режим
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
