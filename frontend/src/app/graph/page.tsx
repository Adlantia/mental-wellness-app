
'use client'
import {LineChart, Line, CartesianGrid, Tooltip, YAxis} from 'recharts';



const data = [
    {
        date: '2/21/24', sleep: 3, mood: 5
    },
    {
        date: 'test', sleep: null, mood: 2
    },
    {
        date: 'test', sleep: 1, mood: null
    },
    {
        date: 'test', sleep: 3, mood: 3
    }
];

const renderLineChart = (
    <>
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line connectNulls type="monotone" dataKey="mood" stroke="#8884d8" />
      <Line connectNulls type="monotone" dataKey="sleep" stroke="#FF0000" />
    <Line type="monotone" dataKey="mood" stroke="#8884d8" />
      <Line type="monotone" dataKey="sleep" stroke="#FF0000" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <YAxis />
    <Tooltip />
  </LineChart>
    </>
);
export default function Graph () {
    return (
        <div className="mx-auto flex flex-col">
            <div className="container">
                <h1 className="">Graph</h1>
                <div className="">
                    {renderLineChart}
                </div>
            </div>
        <div className="flex mx-auto flex-col">
            <h1 className="text-2xl text-center">Graph</h1>
            <div>
            {renderLineChart}
            </div>
        </div>
        </div>
    )
}