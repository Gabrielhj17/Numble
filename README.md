# Numble

Numble is a number-guessing game inspired by Wordle. Players attempt to guess a 4-digit number through deductive reasoning and feedback on each guess.

## How to Play

1. The game randomly generates a 4-digit number with no repeated digits
2. You have 5 attempts to guess the correct number
3. After each guess, the game provides feedback:
   - Green: Correct digit in the correct position
   - Orange: Correct digit in the wrong position
   - Gray: Digit not in the target number
4. Use the number pad to input your guesses and click "Submit" when ready

## Features

- Visual color-coded feedback system
- On-screen number pad
- Automatic cursor movement between boxes
- Mobile-friendly design
- Visual hints on the number pad to track your progress

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/numble.git
   ```
2. Open `index.html` in your web browser

No additional dependencies or installation required!

## Technical Details

Numble is built with vanilla JavaScript, HTML5, and CSS3. The game features:

- DOM manipulation for game state
- Event-driven programming for user interactions
- CSS Grid for responsive layouts
- Custom color feedback system

## Project Structure

- `index.html` - Main game HTML structure
- `game.css` - Styling for the game
- `game.js` - Main game logic and functionality

## Browser Compatibility

Numble works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Future Improvements

- Adding a timer
- Score tracking and statistics
- Custom difficulty levels
- Daily challenges
- Dark mode

## License

[MIT License](LICENSE)

## Acknowledgments

- Inspired by Wordle
- Built as a learning project for JavaScript and DOM manipulation