'use client'
import {RatingScale} from "@/app/RatingScale";
import {SubmitButton} from "@/app/SubmitButton";
import {Formik, FormikHelpers} from "formik";
import { Session } from "@/utils/models/fetchSession";
import {useRouter} from "next/navigation";
import {json} from "node:stream/consumers";

type LoggingFormProps = {
    session: Session | undefined
}

export function LoggingForm(props: LoggingFormProps) {
    const router = useRouter()
    //TODO: put the next five lines back when session issue sorted
    // const {session} = props
    // if (session === undefined) {
    //     return <></>
    // }
    // const {profile, authorization} = session
    const  initialValues = {
        logAnswer: ''
    }
    // here there be formSchema, related to LogSchema, which I have not yet made
    // here there be type for Values, which is dependent on formSchema
    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        let log = {logAnswer: values.logAnswer}
        let {setStatus, resetForm} = actions
        fetch('apis/log', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(log) //or should we be passing ratingOption here?
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
                router.refresh()
            }
            setStatus({type: json, message: json.message})
        })
    }

    // Does the Formik tag wrap the RatingScale and submit button in the following return?
    return (
        <>
        <RatingScale />
        <div className = 'flex justify-center gap-4 my-6'>
            <SubmitButton buttonName = 'Submit' />
        </div>
        </>
    )
}