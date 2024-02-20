// Function to initialize the game
function initializeGame() {
    const rows = document.querySelectorAll('.grid-row');
    const submitButton = document.querySelector('.submit-button');

    // Add input event listeners to limit character input
    rows.forEach(row => {
        row.querySelectorAll('.box').forEach(box => {
            box.addEventListener('input', () => {
                limitCharacter(box);
            });
        });
    });

    // Function to handle submit button click
    submitButton.addEventListener('click', () => {
        const activeRow = document.querySelector('.grid-row.editable-row');
        if (activeRow) {
            disableEditingForRow(activeRow);
            const nextRow = activeRow.nextElementSibling || rows[0];
            enableEditingForRow(nextRow);
        }
    });

    // Initialize the game by enabling editing for the first row
    enableEditingForRow(rows[0]);
}

// Call the initializeGame function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame); 
