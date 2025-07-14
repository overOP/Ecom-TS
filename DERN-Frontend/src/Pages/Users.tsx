import React, { useEffect } from 'react';
import useFetch from '../Hook/UseFetch';
import { SyncLoader } from 'react-spinners';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface User {
  id: number;
  email: string;
  name: string;
}

const Users: React.FC = () => {
  const [users, loading, error] = useFetch<User[]>("http://localhost:3000/users/dataApi");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen p-8 text-[#3d3d3d] font-sans flex">
      <div className="flex flex-col items-center justify-center w-full">
        {loading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <SyncLoader color="#3b82f6" size={15} />
          </div>
        )}

        {error && <p className="text-red-500">{error.message}</p>}

        {!loading && !error && users && (
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full  border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    data-aos="fade-up"
                    data-aos-delay={`${index * 100}`}
                    className="border-t hover:bg-blue-500 transition text-white"
                  >
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
