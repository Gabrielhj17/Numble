// Function to check if all boxes in a row have a number
function isRowComplete(row) {
    let complete = true;
    row.querySelectorAll('.box').forEach(box => {
        if (!box.textContent.trim()) {
            complete = false;
        }
    });
    return complete;
}