import { useState } from 'react';
import './styles/calculator.scss';
import BasicCalculator from './components/pageComponents/BasicCalculator';

function App() {
  const [showCalc, setShowCalc] = useState('open');

  return (
    <div className="App">
      { showCalc === 'open' ? 
        <BasicCalculator setShowCalc={setShowCalc}/> :
        <button type="button" className='view_calculator' onClick={() => setShowCalc('open')}>
          View Calculator
        </button>
      }
    </div>
  );
}

export default App;
