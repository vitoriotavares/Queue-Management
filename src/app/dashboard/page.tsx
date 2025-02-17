'use client';

import { Card } from '@tremor/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const mockData = {
  stats: {
    totalVisits: { value: 16, change: 3, trend: 'up' },
    averageVisitTime: { value: 14, unit: 'min', change: 2, trend: 'down' },
    averageUserAge: { value: 49, change: 4, trend: 'up' },
    canceledVisits: { value: 4, change: 2, trend: 'down' },
  },
  ageGender: [
    { age: '18-24', male: 3.3, female: 0 },
    { age: '25-34', male: 12.7, female: 0 },
    { age: '35-44', male: 15.2, female: 0 },
    { age: '45-54', male: 25.3, female: 0 },
    { age: '65+', male: 33.5, female: 0 },
  ],
  hourlyVisits: [
    { hour: '8:00', male: 2, female: 1 },
    { hour: '10:00', male: 3, female: 1 },
    { hour: '12:00', male: 1, female: 1 },
    { hour: '14:00', male: 2, female: 3 },
    { hour: '16:00', male: 2, female: 1 },
  ],
  visits: [
    { name: 'Sandra Andrews', time: '8:05 pm', duration: '15 min', condition: 'Asthma', status: 'Complete' },
    { name: 'Kurt Caldwell', time: '8:20 pm', duration: '12 min', condition: 'Type 1 Diabetes', status: 'Complete' },
    { name: 'Javi Elizondo', time: '8:36 pm', duration: '17 min', condition: 'Headache', status: 'Complete' },
  ],
};

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Queue #102 Summary</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
              Continue
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(mockData.stats).map(([key, stat]) => (
            <Card key={key} className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-semibold text-gray-900">
                    {stat.value}{stat.unit ? ` ${stat.unit}` : ''}
                  </span>
                  <span className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Age and gender</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.ageGender} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="age" type="category" />
                  <Tooltip />
                  <Bar dataKey="male" fill="#3b82f6" name="Male" />
                  <Bar dataKey="female" fill="#ec4899" name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Total visits</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.hourlyVisits}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="male" fill="#3b82f6" name="Male" stackId="stack" />
                  <Bar dataKey="female" fill="#ec4899" name="Female" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">All visits</h2>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
                Show archived (5)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
                Show canceled (2)
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit time</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit duration</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockData.visits.map((visit, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{visit.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{visit.time}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{visit.duration}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{visit.condition}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        {visit.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-500">•••</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
