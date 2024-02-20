// Function to enable or disable the submit button based on row completion
function updateSubmitButton() {
    const activeRow = document.querySelector('.grid-row.editable-row');
    submitButton.disabled = !isRowComplete(activeRow);
}