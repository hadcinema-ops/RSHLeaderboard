import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SHEET_ID, CURRENT_GID, PAST_GID } from '../config';

export default function Leaderboard({ onBack }) {
  const [rows, setRows] = useState([]);
  const [usePast, setUsePast] = useState(false);

  useEffect(() => {
    const gid = usePast ? PAST_GID : CURRENT_GID;
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (result) => {
        const parsed = result.data.map((r, i) => ({
          rank: i + 1,
          user: maskUsername(r.Username || ''),
          wager: r.Wagered || '',
        }));
        setRows(parsed);
      },
    });
  }, [usePast]);

  const maskUsername = (name) => {
    if (name.length <= 4) return name;
    return name.slice(0,2) + '***' + name.slice(-2);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setUsePast(false)} className={`px-4 py-2 rounded ${!usePast ? 'bg-purple-700' : 'bg-gray-700'}`}>Current Month</button>
        <button onClick={() => setUsePast(true)} className={`px-4 py-2 rounded ${usePast ? 'bg-purple-700' : 'bg-gray-700'}`}>Past Month</button>
      </div>
      <table className="w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-purple-900">
          <tr>
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Wagered</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className={idx < 3 ? 'bg-gradient-to-r from-purple-700 to-black font-bold' : 'hover:bg-gray-700'}>
              <td className="py-2 px-4">{row.rank}</td>
              <td className="py-2 px-4">{row.user}</td>
              <td className="py-2 px-4">{row.wager}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBack} className="mt-6 px-4 py-2 bg-gray-700 rounded">Back</button>
    </div>
  );
}
