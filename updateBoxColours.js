// Function to update the colors of the boxes in a row
function updateBoxColors(row) {
    row.querySelectorAll('.box').forEach(box => {
        const number = parseInt(box.textContent.trim(), 10);
        if (!isNaN(number)) {
            box.style.backgroundColor = number % 2 === 0 ? 'green' : 'red';
            box.style.opacity = 1;
        }
    });
}