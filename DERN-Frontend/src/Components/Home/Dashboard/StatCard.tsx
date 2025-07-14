import React from 'react';

type StatCardProps = {
  title: string;
  value: React.ReactNode;
  percentage: string;
  isPositive: boolean;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  isPositive,
}) => {
  return (
    <div className="bg-slate-800 text-white p-4 rounded shadow w-full sm:w-1/4 grid place-items-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-sm">{title}</div>
      <div className={`text-xs mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {percentage} {isPositive ? '↑' : '↓'}
      </div>
    </div>
  );
};
