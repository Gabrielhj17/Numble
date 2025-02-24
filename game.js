// Global variables
let targetNumber; // The 4-digit number to guess
let isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Function to initialize the game
function initializeGame() {
    // Generate a random 4-digit number
    targetNumber = generateRandomNumber();
    console.log("Secret number:", targetNumber); // For debugging
    
    const rows = document.querySelectorAll('.grid-row');
    const submitButton = document.querySelector('.submit-button');
    const numberButtons = document.querySelectorAll('.number-box');
    
    // Debug button order
    debugNumberButtons();
    
    // Disable all rows initially
    rows.forEach(row => {
        row.querySelectorAll('.box').forEach(box => {
            if (!isMobileDevice) {
                box.setAttribute('contenteditable', 'false');
            } else {
                // For mobile: make boxes non-editable to prevent keyboard
                box.setAttribute('contenteditable', 'false');
            }
        });
        row.classList.remove('editable-row');
    });
    
    // Mobile-specific setup
    if (isMobileDevice) {
        // Add click handlers to boxes for mobile
        rows.forEach(row => {
            row.querySelectorAll('.box').forEach(box => {
                box.addEventListener('click', function() {
                    // Only allow clicking in editable row
                    if (!box.parentElement.classList.contains('editable-row')) {
                        return;
                    }
                    
                    // Remove focused class from all boxes
                    document.querySelectorAll('.box').forEach(b => {
                        b.classList.remove('focused');
                    });
                    
                    // Add focused class to this box
                    this.classList.add('focused');
                });
            });
        });
    }
    
    // Set up number button functionality
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.textContent.trim();
            const activeRow = document.querySelector('.grid-row.editable-row');
            
            if (activeRow) {
                if (isMobileDevice) {
                    // Mobile handling - use focused class
                    let targetBox = document.querySelector('.grid-row.editable-row .box.focused');
                    
                    // If no box is focused, focus the first empty box
                    if (!targetBox) {
                        const emptyBoxes = Array.from(activeRow.querySelectorAll('.box'))
                            .filter(box => !box.textContent.trim());
                        
                        if (emptyBoxes.length > 0) {
                            targetBox = emptyBoxes[0];
                            document.querySelectorAll('.box').forEach(b => {
                                b.classList.remove('focused');
                            });
                            targetBox.classList.add('focused');
                        } else {
                            // If no empty box, focus the first box
                            targetBox = activeRow.querySelector('.box');
                            document.querySelectorAll('.box').forEach(b => {
                                b.classList.remove('focused');
                            });
                            targetBox.classList.add('focused');
                        }
                    }
                    
                    if (targetBox) {
                        targetBox.textContent = number;
                        
                        // Find the next box to focus
                        const boxes = Array.from(activeRow.querySelectorAll('.box'));
                        const currentIndex = boxes.indexOf(targetBox);
                        
                        if (currentIndex < boxes.length - 1) {
                            targetBox.classList.remove('focused');
                            boxes[currentIndex + 1].classList.add('focused');
                        }
                        
                        // Update submit button state
                        updateSubmitButton();
                    }
                } else {
                    // Desktop handling - use contenteditable
                    // Find the first empty box or the first box if all are filled
                    let targetBox = null;
                    const boxes = activeRow.querySelectorAll('.box');
                    for (let i = 0; i < boxes.length; i++) {
                        if (!boxes[i].textContent.trim()) {
                            targetBox = boxes[i];
                            break;
                        }
                    }
                    
                    // If no empty box found, select the first box
                    if (!targetBox && boxes.length > 0) {
                        targetBox = boxes[0];
                    }
                    
                    if (targetBox) {
                        targetBox.textContent = number;
                        
                        // Find the index for moving cursor
                        const boxIndex = Array.from(boxes).indexOf(targetBox);
                        if (boxIndex < boxes.length - 1) {
                            moveCursor(targetBox, boxIndex + 1);
                        }
                        
                        // Check if row is complete to enable submit button
                        updateSubmitButton();
                    }
                }
            }
        });
    });
    
    // Function to handle submit button click
    submitButton.addEventListener('click', () => {
        const activeRow = document.querySelector('.grid-row.editable-row');
        if (activeRow && isRowComplete(activeRow)) {
            // Mark row as submitted
            activeRow.classList.add('submitted-row');
            
            // Get the guessed number
            let guessedNumber = '';
            activeRow.querySelectorAll('.box').forEach(box => {
                guessedNumber += box.textContent.trim();
            });
            
            // Update colors based on guess
            updateBoxColors(activeRow, targetNumber);
            
            // Check if player won
            if (guessedNumber === targetNumber) {
                // Player won!
                setTimeout(() => {
                    alert("Congratulations! You guessed the correct number: " + targetNumber);
                    disableAllRows();
                }, 500);
                return;
            }
            
            // Disable current row and enable next row
            disableEditingForRow(activeRow);
            const nextRow = activeRow.nextElementSibling;
            
            if (nextRow) {
                enableEditingForRow(nextRow);
                
                // Focus on first box of next row (desktop only)
                if (!isMobileDevice) {
                    const firstBox = nextRow.querySelector('.box');
                    if (firstBox) firstBox.focus();
                }
            } else {
                // Game over - no more rows
                setTimeout(() => {
                    alert("Game over! The correct number was: " + targetNumber);
                    disableAllRows();
                }, 500);
            }
            
            // Update submit button state
            updateSubmitButton();
        }
    });
    
    // Add keyboard support for Enter key
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });
    
    // Initialize the game by enabling editing for the first row
    enableEditingForRow(rows[0]);
    updateSubmitButton();
}

// Debug function to check number button order
function debugNumberButtons() {
    const numberButtons = document.querySelectorAll('.number-box');
    console.log("Number of buttons found:", numberButtons.length);
    
    numberButtons.forEach((button, index) => {
        console.log(`Button ${index} text:`, button.textContent.trim());
    });
}

// Function to disable all rows (end of game)
function disableAllRows() {
    const rows = document.querySelectorAll('.grid-row');
    rows.forEach(row => {
        disableEditingForRow(row);
    });
    
    // Remove all focused boxes
    document.querySelectorAll('.box').forEach(box => {
        box.classList.remove('focused');
    });
    
    // Disable submit button
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) submitButton.disabled = true;
}

// Only allow one character to be entered into each box and move to next box
function limitCharacter(element, currentIndex, nextIndex) {
    // Ensure only digits are entered
    const content = element.textContent.trim();
    if (!/^\d*$/.test(content)) {
        element.textContent = '';
        return;
    }
    
    // Limit to 1 character
    if (element.textContent.length > 1) {
        element.textContent = element.textContent.slice(0, 1);
    }
    
    // Move cursor to next box if possible
    if (!isMobileDevice) {
        moveCursor(element, nextIndex);
    }
    
    // Update submit button state
    updateSubmitButton();
    
    // Prevent keyboard from showing on mobile
    if (isMobileDevice) {
        element.blur(); // Remove focus to hide keyboard
    }
}

// Function to move cursor to the next box
function moveCursor(element, nextIndex) {
    // Move cursor to the next adjacent box
    if (element.textContent.length === 1 && nextIndex < element.parentElement.children.length) {
        const nextBox = element.parentElement.children[nextIndex];
        if (nextBox) {
            if (isMobileDevice) {
                // For mobile: update visual focus without triggering keyboard
                element.classList.remove('focused');
                nextBox.classList.add('focused');
            } else {
                // For desktop: actually focus the element
                nextBox.focus();
                
                // Place cursor at the end of content in the next box
                if (document.createRange && window.getSelection) {
                    const range = document.createRange();
                    const sel = window.getSelection();
                    
                    // Try to position at the end of any content
                    if (nextBox.childNodes.length > 0) {
                        const lastNode = nextBox.childNodes[nextBox.childNodes.length - 1];
                        range.setStartAfter(lastNode);
                    } else {
                        range.selectNodeContents(nextBox);
                    }
                    
                    range.collapse(false); // false means collapse to end
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }
    
    // Special handling for iOS devices
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        element.setAttribute('inputmode', 'numeric');
    }
}

// Function to check if all boxes in a row have a number
function isRowComplete(row) {
    if (!row) return false;
    
    let complete = true;
    row.querySelectorAll('.box').forEach(box => {
        if (!box.textContent.trim()) {
            complete = false;
        }
    });
    return complete;
}

// Function to enable editing for a row
function enableEditingForRow(row) {
    if (!row) return;
    
    row.querySelectorAll('.box').forEach(box => {
        if (!isMobileDevice) {
            box.setAttribute('contenteditable', 'true');
        }
        // We don't make boxes contenteditable on mobile to prevent keyboard
    });
    row.classList.add('editable-row');
    
    // For mobile, add focused class to first box
    if (isMobileDevice) {
        const firstBox = row.querySelector('.box');
        if (firstBox) {
            document.querySelectorAll('.box').forEach(b => {
                b.classList.remove('focused');
            });
            firstBox.classList.add('focused');
        }
    }
}

// Function to disable editing for a row
function disableEditingForRow(row) {
    if (!row) return;
    
    row.querySelectorAll('.box').forEach(box => {
        box.setAttribute('contenteditable', 'false');
        box.classList.remove('focused');
    });
    row.classList.remove('editable-row');
}

// Function to enable or disable the submit button based on row completion
function updateSubmitButton() {
    const submitButton = document.querySelector('.submit-button');
    const activeRow = document.querySelector('.grid-row.editable-row');
    
    if (submitButton) {
        submitButton.disabled = !isRowComplete(activeRow);
        
        // Visual indication
        if (submitButton.disabled) {
            submitButton.style.opacity = '0.5';
        } else {
            submitButton.style.opacity = '1';
        }
    }
}

// Function to update the colors of the boxes in the grid
function updateBoxColors(row, targetNumber) {
    if (!row || !targetNumber) return;
    
    const targetDigits = targetNumber.toString().split('').map(Number);
    const boxes = row.querySelectorAll('.box');
    const userDigits = Array.from(boxes).map(box => parseInt(box.textContent.trim(), 10));
    
    // Create a copy of targetDigits that we can modify to track used digits
    const remainingTargetDigits = [...targetDigits];
    
    // First pass: Mark exact matches (green)
    boxes.forEach((box, index) => {
        const userDigit = userDigits[index];
        
        if (userDigit === targetDigits[index]) {
            // Exact match - mark green
            box.style.backgroundColor = 'green';
            box.style.color = 'white';
            
            // Mark this position as used
            remainingTargetDigits[index] = null;
            
            // Update number pad
            updateNumberBoxByValue(userDigit, 'green');
        }
    });
    
    // Second pass: Mark partial matches (orange) or misses (gray)
    boxes.forEach((box, index) => {
        const userDigit = userDigits[index];
        
        // Skip already processed boxes (green ones)
        if (box.style.backgroundColor !== 'green') {
            const digitPosition = remainingTargetDigits.indexOf(userDigit);
            
            if (digitPosition !== -1) {
                // Partial match - right number, wrong position
                box.style.backgroundColor = 'orange';
                box.style.color = 'white';
                
                // Mark this digit as used
                remainingTargetDigits[digitPosition] = null;
                
                // Update number pad - only if not already green
                updateNumberBoxByValue(userDigit, 'orange');
            } else {
                // No match
                box.style.backgroundColor = 'gray';
                box.style.color = 'white';
                
                // Update number pad - only if not already green or orange
                updateNumberBoxByValue(userDigit, 'gray');
            }
        }
    });
}

// Function to update the color of a number box by its value
function updateNumberBoxByValue(number, color) {
    const numberButtons = document.querySelectorAll('.number-box');
    
    for (const button of numberButtons) {
        if (button.textContent.trim() === number.toString()) {
            // Only update if the current color isn't green (we want to keep correct guesses green)
            if (color === 'green' || 
               (color === 'orange' && button.style.backgroundColor !== 'green') ||
               (color === 'gray' && button.style.backgroundColor !== 'green' && 
                                    button.style.backgroundColor !== 'orange')) {
                button.style.backgroundColor = color;
            }
            break;
        }
    }
}

// Function to generate a random number with no repeated digits
function generateRandomNumber() {
    // Create an array of digits from 0 to 9
    const digits = Array.from({length: 10}, (_, i) => i);
    
    // Shuffle the array of digits
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    
    // Select the first four digits from the shuffled array to form the number
    const randomNumber = digits.slice(0, 4).join('');
    return randomNumber;
}

// Call the initializeGame function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);