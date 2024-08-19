import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const LineChart = ({ fromCurrency, toCurrency, period }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestRef = useRef(false);

  const fetchData = async () => {
    if (requestRef.current) return;
    requestRef.current = true;
    setLoading(true);
    setError(null);
    try {
      console.log('API URL:', process.env.API_BASE_URL);    // Not being picked up sadly
      const response = await axios.post('https://vance-backend.onrender.com/api/forex_data', null, {
        params: { from: fromCurrency, to: toCurrency, period }
      });
      const forexData = response.data;
      console.log(forexData);

      const labels = forexData.map(item => item.date);
      const data = forexData.map(item => item.close);
  
      setChartData({
        labels: labels || [],
        datasets: [
          {
            label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
            data: data || [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      requestRef.current = false;
    }
  };

  useEffect(() => {
    if (fromCurrency.length === 3 && toCurrency.length === 3) {
      fetchData();
    }
  }, [fromCurrency, toCurrency, period]);

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <Line data={chartData} />;
};

LineChart.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired
};

export default LineChart;
