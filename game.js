// Function to initialize the game
function initializeGame() {
    // Generate a random 4-digit number
    const randomNumber = generateRandomNumber();

    const rows = document.querySelectorAll('.grid-row');
    const submitButton = document.querySelector('.submit-button');
    const numberButtons = document.querySelectorAll('.number-box');

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
        if (isRowComplete(activeRow)) {
            disableEditingForRow(activeRow);
            const nextRow = activeRow.nextElementSibling || rows[0];
            updateBoxColors(activeRow, randomNumber);
            enableEditingForRow(nextRow);
            const firstBox = nextRow.querySelector('.box');
            firstBox.focus();
            // For iOS devices, explicitly set the input mode to numeric for the first box
            if (/iPad|iPhone|iPod/.test(navigator.platform)) {
                firstBox.setAttribute('inputmode', 'numeric');
            }
        }
        else {
            return;
        }
    });

    document.addEventListener('keypress', function(event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.keyCode === 13) {
            // Trigger a click event on the submit button
            document.querySelector('.submit-button').click();
        }
    });

    // Initialize the game by enabling editing for the first row
    enableEditingForRow(rows[0]);
}

// Call the initializeGame function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);
