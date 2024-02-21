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