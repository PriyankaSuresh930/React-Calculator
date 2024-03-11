import React, { useState } from 'react';
import logo from '../../images/Calculator_512.webp';
import { calculatorKeypad } from '../../utilis/CalculatorData';
import DarkMode from '../layeredComponents/darkMode/DarkMode';

const BasicCalculator = ({ setShowCalc }) => {
  const [value, setValues] = useState("");
  const [result, setResult] = useState("");
  const operators = ['+', '-', '*', '/', '%', '.']

  const resetClickHandler = () => {
    setValues('');
    setResult('');
  }

  const deleteClickHandler = () => {
    setValues(value.toString().slice(0, -1));
  }

  const resultClickHandler = () => {
    // Try to check for error
    try {
      setValues(eval(value.toString()));
    }
    // Catch to handle error message
    catch (error) {
      alert("Invalid!!! " + error);
    }

  }

  const handleCalculator = getValue => {
    if (operators.includes(getValue) && value === '' ||
      operators.includes(getValue) && operators.includes(value.toString().slice(-1))) {
      return;
    }
    setValues(value + getValue);
    if (!operators.includes(getValue)) {
      setResult(eval(value + getValue).toString())
    }
  }

  return (
    <main className='calculator-wrapper shadow' id="calculator-app">
      <header className='calculator-title'>
        <div>
          <img src={logo} alt="Logo image" className='logo-img' />
          <span className='heading'>Calculator</span>
        </div>
        <div>
          <button type="button" onClick={() => setShowCalc('close')}>X</button>
        </div>
      </header>

      <div className='darktheme-wrapper'>
        <span className='f-sm'>Theme</span>
        <DarkMode />
      </div>

      <div className='display calc_screen'>
        {result ? <span className='result'>({result})</span> : ""}&nbsp;{value || '0'}
      </div>

      <div className='keypad'>
        {
          calculatorKeypad && calculatorKeypad.map((data, index) => {
            const { name, bgcolor, color } = data;

            return (
              <input
                key={index}
                type="button"
                value={name}
                className='calc_keys'
                style={name === '=' ? { backgroundColor: bgcolor, color: color } : {}}
                onClick={name === "AC"
                  ? resetClickHandler
                  : name === "DEL"
                    ? deleteClickHandler
                    : name === "="
                      ? resultClickHandler
                      : name === "+" || name === "-" || name === "*" || name === "/" || name === "%" || name === "."
                        ? (e) => handleCalculator(e.target.value)
                        : (e) => handleCalculator(e.target.value.toString())}
              />
            )
          })
        }
      </div>
    </main>
  )
}

export default BasicCalculator