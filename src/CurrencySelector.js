import React from 'react';
import PropTypes from 'prop-types';

const CurrencySelector = ({ fromCurrency, toCurrency, period, onFromChange, onToChange, onPeriodChange }) => {
  return (
    <div>
      <label>From: </label>
      <input
        type="text"
        value={fromCurrency}
        onChange={(e) => onFromChange(e.target.value.toUpperCase())}
      />

      <label>To: </label>
      <input
        type="text"
        value={toCurrency}
        onChange={(e) => onToChange(e.target.value.toUpperCase())}
      />

      <label>Period: </label>
      <select value={period} onChange={(e) => onPeriodChange(e.target.value)}>
        <option value="1M">1 Month</option>
        <option value="3M">3 Months</option>
        <option value="6M">6 Months</option>
      </select>
    </div>
  );
};

CurrencySelector.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  onFromChange: PropTypes.func.isRequired,
  onToChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired
};

export default CurrencySelector;
