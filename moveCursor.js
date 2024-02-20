function moveCursor(element, nextIndex) {
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