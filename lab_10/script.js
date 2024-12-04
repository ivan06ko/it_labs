const descriptions = ["T-42A", "MAUS", "FV215B"];

function showDescription(index) {
    const descriptionElements = document.querySelectorAll(".description");
    descriptionElements.forEach((desc, i) => {
        desc.style.display = i === index && desc.style.display !== "block" ? "block" : "none";
        if (i === index) desc.textContent = descriptions[index];
    });
}
