'use client'

import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {Tracker} from "@/utils/models/tracker.model";
import {Log} from "@/utils/models/log.model";
import {useEffect, useState} from "react";




type graphProps =
    {

    //     logs: Log[]
    // trackers: Tracker[]

        data: any


}

export function Graph(props: graphProps) {
    const {data} = props

    // [
    //     { date: '2024-03-01', Sleep: 4, Mood: null },
    //     { date: '2024-03-02', Sleep: 4, Mood: null },
    //     { date: '2024-03-03', Sleep: null, Mood: 4 },
    //     { date: '2024-03-04', Sleep: null, Mood: 2 }
    // ]
    //








    // const data =
    //
    //     [
    //     {
    //         date: "2024-03-01", sleep: 3, mood: null
    //     },
    //     {
    //         date: "2024-03-02", sleep: 5, mood: 2
    //     },
    //     {
    //         date: "2024-03-03", sleep: 1, mood: null
    //     },
    //     {
    //         date: "2024-03-04", sleep: 3, mood: 3
    //     },
    //         {
    //             date: "2024-03-05", sleep: 3, mood: 4
    //         }
    // ];

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient === false) {
        return (
        <>
        loading...
        </>
        )
    }
    return (
        <>
            <div className="flex mx-auto flex-col">
                <h1 className="text-2xl text-center">Graph</h1>
                <div
                    suppressHydrationWarning={true}>

                    <LineChart width={600} height={300} data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="Mood" stroke="#8884d8"/>
                        <Line type="monotone" dataKey="Sleep" stroke="#FF0000"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <YAxis domain={[1, 2, 3, 4, 5]}/>
                        <XAxis dataKey="date"/>
                        <Tooltip/>
                        <Legend/>
                    </LineChart>
                </div>
            </div>
        </>
    )

}