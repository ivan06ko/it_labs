function highlightMatchingTags(event) {
    const input = event.target.value.toLowerCase();
    const jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(card => {
        const tags = card.dataset.tags.toLowerCase();
        const tagElements = card.querySelectorAll('.tag');

        if (tags.includes(input)) {
            card.style.display = 'block';
            tagElements.forEach(tag => {
                if (tag.textContent.toLowerCase().includes(input)) {
                    tag.classList.add('highlight');
                } else {
                    tag.classList.remove('highlight');
                }
            });
        } else {
            card.style.display = 'none';
            tagElements.forEach(tag => tag.classList.remove('highlight'));
        }
    });
}

function addTag(tag) {
    const inputField = document.getElementById('tagInput');
    inputField.value = tag;
    inputField.dispatchEvent(new Event('input'));
}

function clearFilters() {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.style.display = 'block';
        card.querySelectorAll('.tag').forEach(tag => tag.classList.remove('highlight'));
    });

    document.getElementById('tagInput').value = '';
}
