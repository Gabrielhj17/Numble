// Only allow one character to be entered into each box
function limitCharacter(element, currentIndex, nextIndex) {
    if (element.textContent.length > 1) {
        element.textContent = element.textContent.slice(0, 1);
        element.dispatchEvent(new KeyboardEvent('keydown', {tabKey: true}))
    }

    // Move cursor to the next adjacent box
    if (element.textContent.length === 1 && nextIndex < element.parentElement.children.length) {
        const nextBox = element.parentElement.children[nextIndex];
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(nextBox, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        nextBox.focus();
    }
}

// Function to initialize the game
function initializeGame() {
    // Get all the rows and submit buttons
    const rows = document.querySelectorAll('.grid-row');
    const submitButtons = document.querySelectorAll('.submit-button');

    // Add click event listeners to all submit buttons
    submitButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Disable editing for the current row
            rows.forEach(row => {
                row.querySelectorAll('.box').forEach(box => {
                    box.setAttribute('contenteditable', 'false');
                });
                row.classList.remove('editable-row'); // Remove editable class
            });

            // Enable editing for the next row
            const nextRowIndex = (index + 1) % rows.length;
            rows[nextRowIndex].querySelectorAll('.box').forEach(box => {
                box.setAttribute('contenteditable', 'true');
            });
            rows[nextRowIndex].classList.add('editable-row'); // Add editable class
        });
    });
}

// Call the initializeGame function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);

