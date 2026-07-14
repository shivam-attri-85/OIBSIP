const form = document.getElementById('converter-form');
const temperatureInput = document.getElementById('temperature-input');
const inputUnit = document.getElementById('input-unit');
const outputMode = document.getElementById('output-mode');
const inputError = document.getElementById('input-error');
const statusMessage = document.getElementById('status-message');
const resultsGrid = document.getElementById('results-grid');
const celsiusResult = document.getElementById('celsius-result');
const fahrenheitResult = document.getElementById('fahrenheit-result');
const kelvinResult = document.getElementById('kelvin-result');

const ABSOLUTE_ZERO = -273.15;

function roundValue(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, '');
}

function setResults(celsius, fahrenheit, kelvin, mode) {
  celsiusResult.textContent = `${roundValue(celsius)} °C`;
  fahrenheitResult.textContent = `${roundValue(fahrenheit)} °F`;
  kelvinResult.textContent = `${roundValue(kelvin)} K`;

  resultsGrid.querySelectorAll('.result-tile').forEach((tile) => tile.classList.remove('hidden', 'single-result'));

  if (mode === 'single') {
    const selectedUnit = inputUnit.value;
    const tiles = {
      celsius: celsiusResult.closest('.result-tile'),
      fahrenheit: fahrenheitResult.closest('.result-tile'),
      kelvin: kelvinResult.closest('.result-tile')
    };

    Object.entries(tiles).forEach(([unit, tile]) => {
      if (unit !== selectedUnit) {
        tile.classList.add('hidden');
      } else {
        tile.classList.add('single-result');
      }
    });
  }
}

function convertTemperature(value, unit) {
  let celsius;

  if (unit === 'celsius') {
    celsius = value;
  } else if (unit === 'fahrenheit') {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;

  return { celsius, fahrenheit, kelvin };
}

function validateInput() {
  const rawValue = temperatureInput.value.trim();

  if (rawValue === '') {
    inputError.textContent = 'Please enter a temperature value.';
    return { valid: false };
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    inputError.textContent = 'Enter a valid numeric temperature.';
    return { valid: false };
  }

  let celsiusEquivalent;

  if (inputUnit.value === 'celsius') {
    celsiusEquivalent = value;
  } else if (inputUnit.value === 'fahrenheit') {
    celsiusEquivalent = (value - 32) * 5 / 9;
  } else {
    celsiusEquivalent = value - 273.15;
  }

  if (celsiusEquivalent < ABSOLUTE_ZERO) {
    inputError.textContent = 'Value is below absolute zero. Enter a temperature at or above -273.15 °C equivalent.';
    return { valid: false };
  }

  inputError.textContent = '';
  return { valid: true, value };
}

function performConversion() {
  const validation = validateInput();

  if (!validation.valid) {
    statusMessage.textContent = 'Fix the input before converting.';
    return;
  }

  const converted = convertTemperature(validation.value, inputUnit.value);

  setResults(converted.celsius, converted.fahrenheit, converted.kelvin, outputMode.value);
  statusMessage.textContent = 'Conversion complete.';
}

temperatureInput.addEventListener('input', () => {
  validateInput();
});

inputUnit.addEventListener('change', () => {
  if (temperatureInput.value.trim() !== '') {
    performConversion();
  }
});

outputMode.addEventListener('change', () => {
  if (temperatureInput.value.trim() !== '') {
    performConversion();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  performConversion();
});