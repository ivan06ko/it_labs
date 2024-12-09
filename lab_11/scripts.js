function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function highlightMatchingTags(event) {
    const query = event.target.value.toLowerCase();
    const jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        if (tags.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        addTag(event.target.value);
        event.target.value = '';
    }
}

function addTag(tag) {
    const filterTags = document.querySelector('.filter-tags');
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    tagElement.onclick = () => {
        tagElement.remove();
        filterJobs();
    };
    filterTags.appendChild(tagElement);
    filterJobs();
}

function clearFilters() {
    document.querySelector('.filter-tags').innerHTML = '';
    filterJobs();
}

function filterJobs() {
    const selectedTags = Array.from(document.querySelectorAll('.filter-tags .tag')).map(tag => tag.textContent.toLowerCase());
    const jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        const matches = selectedTags.every(tag => tags.includes(tag));
        card.style.display = matches ? 'block' : 'none';
    });
}

// Load dark mode state
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
