// Function to update the colors of the boxes in both grids
function updateBoxColors(row, randomNumber) {
    const randomDigits = randomNumber.toString().split('').map(Number); // Convert the random number to an array of digits
    row.querySelectorAll('.box').forEach((box, index) => {
        const boxNumber = parseInt(box.textContent.trim(), 10);
        if (!isNaN(boxNumber)) {
            const randomNumberDigit = randomDigits[index]; // Get the corresponding digit from the random number
            if (boxNumber === randomNumberDigit) {
                updateNumberBox(boxNumber, 'green');
                box.style.backgroundColor = 'green'; // Matched in the same position
            } else if (randomDigits.includes(boxNumber)) {
                updateNumberBox(boxNumber, 'orange');
                box.style.backgroundColor = 'orange'; // Matched but not in the same position
            } else {
                updateNumberBox(boxNumber, 'red');
                box.style.backgroundColor = 'red'; // Not matched
            }
            box.style.opacity = 1;
        }
    });
}
