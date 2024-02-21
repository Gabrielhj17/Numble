// Function to update the color of a number box in the number grid
function updateNumberBox(number, color) {
    const numberBoxes = document.querySelectorAll('.number-box');
    for (const box of numberBoxes) {
        if (box.textContent.trim() === number.toString()) {
            box.style.backgroundColor = color;
            break; // Exit loop once the box is found
        }
    }
}