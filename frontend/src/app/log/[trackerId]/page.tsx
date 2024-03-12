'use client'
import {RatingScale} from "@/app/RatingScale";
import {SubmitButton} from "@/app/SubmitButton";
import {useParams} from "next/navigation";
import LoggingPage from "@/app/log/[trackerId]/LoggingPage";


export default function Tracker() {
     const {trackerId} = useParams<{ trackerId: string }>()
  //   console.log(params)
    return (
            <LoggingPage trackerId={trackerId}/>
    )
}
