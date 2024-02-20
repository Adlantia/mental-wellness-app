
'use client'
import {LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';



const data = [
    {
        date: 'test', sleep: 3, mood: 5
    },
    {
        date: 'test', sleep: 5, mood: 2
    },
    {
        date: 'test', sleep: 1, mood: null
    },
    {
        date: 'test', sleep: 3, mood: 3
    }
];

for (let i = 0; i < data.length; i++) {
    if ( i !== 0 && i !== data.length - 1 && data[i].mood === null) {
        data[i].mood = (data[i - 1].mood + data[i + 1].mood) / 2
    }
}

const renderLineChart = (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="mood" stroke="#8884d8" />
      <Line type="monotone" dataKey="sleep" stroke="#FFFFFF" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
  </LineChart>
);
export default function Graph () {
    return (
        <div>
            <h1>Graph</h1>
            {renderLineChart}
        </div>
    )
}