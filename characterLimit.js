// Only allow one character to be entered into each box
function limitCharacter(element, currentIndex, nextIndex) {
    if (element.textContent.length > 1) {
        element.textContent = element.textContent.slice(0, 1);
        element.dispatchEvent(new KeyboardEvent('keydown', {tabKey: true}))
    }
    moveCursor(element, nextIndex);
}