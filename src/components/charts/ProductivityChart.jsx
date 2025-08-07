import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProductivityChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Daily Productivity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#82ca9d" name="Completed Tasks" />
          <Bar dataKey="pending" fill="#8884d8" name="Pending Tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

ProductivityChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    completed: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
  })).isRequired,
};

export default ProductivityChart;
