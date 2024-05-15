import React from 'react';

export default function PlacementTable() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-3xl font-bold mb-8">PLACEMENT RECORDS</h1>
      <div className="flex justify-center">
        <table className="w-full max-w-4xl divide-y divide-gray-200">
          <thead className="bg-black">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">CTC</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date Of Joining</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Supporting Docs</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mark</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Otto</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">@mdo</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">@mdo</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}