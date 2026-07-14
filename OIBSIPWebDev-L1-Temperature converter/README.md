# Temperature Converter Website

Interactive temperature converter built with HTML5, CSS3, and vanilla JavaScript for Temperature converter.

## Features

- Numeric input validation with inline error feedback
- Celsius, Fahrenheit, and Kelvin support
- Input unit selector and output display mode selector
- Convert button-based calculation
- Absolute zero edge-case handling
- Centered responsive UI

## Files

- `ShivamKumar_Task3.html` - main app page
- `ShivamKumar.css` - layout and styling
- `ShivamKumar_Task3.js` - validation and conversion logic

## Conversion Rules

- Celsius to Fahrenheit: $(C \times 9/5) + 32$
- Fahrenheit to Celsius: $(F - 32) \times 5/9$
- Celsius to Kelvin: $C + 273.15$
- Kelvin to Celsius: $K - 273.15$

## How To Run

1. Open `ShivamKumar_Task3.html` in a browser.
2. Enter a numeric value.
3. Choose the input unit.
4. Click Convert to see the result.

## Submission Details

- GitHub repository link: add your repository URL here.
- Live demo: add the deployed link here if available.

## Notes

The project uses native HTML validation patterns and JavaScript-side checks to reject empty, non-numeric, and below-absolute-zero inputs.