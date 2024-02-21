// Select all number grid buttons
const numberButtons = document.querySelectorAll('.number-box');

// Select all boxes in the main grid
const mainGridBoxes = document.querySelectorAll('.main-grid .box');

// Add click event listeners to each number grid button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent.trim();
        const selectedBox = document.querySelector('.main-grid .box.selected');

        if (selectedBox) {
            selectedBox.textContent = number;
        }
    });
});

// Add click event listeners to each box in the main grid
mainGridBoxes.forEach(box => {
    box.addEventListener('click', () => {
        mainGridBoxes.forEach(box => box.classList.remove('selected'));
        box.classList.add('selected');
    });
});
