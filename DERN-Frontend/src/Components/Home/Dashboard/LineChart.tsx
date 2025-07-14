import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sun', Revenue: 10, Sales: 9 },
  { name: 'Mon', Revenue: 15, Sales: 13 },
  { name: 'Tue', Revenue: 22, Sales: 20 },
  { name: 'Wed', Revenue: 30, Sales: 25 },
  { name: 'Thu', Revenue: 55, Sales: 45 },
  { name: 'Fri', Revenue: 65, Sales: 60 },
  { name: 'Sat', Revenue: 80, Sales: 70 },
];

export const RevenueLineChart: React.FC = () => {
  return (
    <div className="p-4 rounded shadow w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="Sales" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
