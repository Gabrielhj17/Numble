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

