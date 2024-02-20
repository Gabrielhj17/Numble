// Function to enable editing for a row
function enableEditingForRow(row) {
    row.querySelectorAll('.box').forEach(box => {
        box.setAttribute('contenteditable', 'true');
    });
    row.classList.add('editable-row');
}

// Function to disable editing for a row
function disableEditingForRow(row) {
    row.querySelectorAll('.box').forEach(box => {
        box.setAttribute('contenteditable', 'false');
    });
    row.classList.remove('editable-row');
}