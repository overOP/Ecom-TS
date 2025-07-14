import React from 'react';
import useFetch from '../Hook/UseFetch';
import { StatCard } from '@/Components/Home/Dashboard/StatCard';
import { RevenueLineChart } from '@/Components/Home/Dashboard/LineChart';
import { SalesBarChart } from '@/Components/Home/Dashboard/BarChart';
import { SyncLoader } from 'react-spinners';

interface User {
  id: number;
  email: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [users, loading, error] = useFetch<User[]>("http://localhost:3000/users/dataApi");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#10b981" size={15} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen space-y-6">
      {/* Stat Cards */}
      <div className="flex flex-wrap gap-4 items-center">
        <StatCard title="Total Order" value="1" percentage="100%" isPositive />
        <StatCard title="Total Product" value="1" percentage="2.59%" isPositive />

        <StatCard
          title="Total Users"
          value={`${users?.length ?? 0}`}
          percentage="0.95%"
          isPositive
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueLineChart />
        <SalesBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
