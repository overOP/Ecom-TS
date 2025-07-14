import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'M', Sales: 45, Revenue: 15 },
  { name: 'T', Sales: 55, Revenue: 22 },
  { name: 'W', Sales: 40, Revenue: 25 },
  { name: 'T', Sales: 65, Revenue: 10 },
  { name: 'F', Sales: 20, Revenue: 18 },
  { name: 'S', Sales: 42, Revenue: 28 },
  { name: 'S', Sales: 30, Revenue: 25 },
];

export const SalesBarChart: React.FC = () => {
  return (
    <div className="p-4 rounded shadow w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Sales" fill="#10b981" />
          <Bar dataKey="Revenue" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
