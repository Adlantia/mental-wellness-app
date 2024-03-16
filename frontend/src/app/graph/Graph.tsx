'use client'

import {CartesianGrid, Line, LineChart, Tooltip, YAxis} from "recharts";

export function Graph() {
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
    return (
        <>
            <div className="flex mx-auto flex-col">
                <h1 className="text-2xl text-center">Graph</h1>
                <div>
                    <LineChart width={600} height={300} data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="mood" stroke="#8884d8"/>
                        <Line type="monotone" dataKey="sleep" stroke="#FF0000"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
        </>
    )

}