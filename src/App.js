import React, { useState, useEffect } from 'react';
import './App.css';
import LineChart from './LineChart';
import CurrencySelector from './CurrencySelector';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [period, setPeriod] = useState('1M');
  const [validCurrencies, setValidCurrencies] = useState(false);

  useEffect(() => {
    const isValid = fromCurrency.length === 3 && toCurrency.length === 3;
    setValidCurrencies(isValid);
  }, [fromCurrency, toCurrency]);

  return (
    <div className="App">
      <h2>Exchange Rate Line Chart</h2>
      <CurrencySelector
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        period={period}
        onFromChange={setFromCurrency}
        onToChange={setToCurrency}
        onPeriodChange={setPeriod}
      />
      {validCurrencies ? (
        <LineChart fromCurrency={fromCurrency} toCurrency={toCurrency} period={period} />
      ) : (
        <p>Please enter valid 3-letter currency codes.</p>
      )}
    </div>
  );
}

export default App;
