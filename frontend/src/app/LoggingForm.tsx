'use client'
import {Form, Formik, FormikHelpers} from "formik";
import {Session} from "@/utils/models/fetchSession";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {LogSchema} from "@/utils/models/log.model";
import {FormDebugger} from "@/app/components/formDebugger";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";

type LoggingFormProps = {
    session: Session,
    trackerId: string,
    trackerCategory: string
}

export function LoggingForm(props: LoggingFormProps) {
    const router = useRouter()
    const {session, trackerId, trackerCategory} = props
    // console.log("session", session)
    if (session === undefined) {
        return <></>
    }

    const {profile, authorization} = session
    const initialValues = {
        logAnswer: 0
    }
    const formSchema = LogSchema.pick({logAnswer: true})
    type Values = z.infer<typeof formSchema>
    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        let log = {
            "logProfileId": profile.profileId,
            "logId": null,
            "logTrackerId": trackerId,
            "logAnswer": Number(values.logAnswer),
            "logDatetime": null
        }
        // console.log(log)
        let {setStatus, resetForm} = actions
        fetch('/apis/log', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(log)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
                router.refresh()
                //redirect to dashboard after successful recording; too quick - is there a way to add a delay
                // window.location.href = '/dashboard'
            }
            setStatus({type: json, message: trackerCategory + " " + json.message})
        })
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {LoggingFormContent}
            </Formik>
        </>
    )
}

function LoggingFormContent(props: any) {
    const {status, handleChange, handleSubmit} = props;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className='flex justify-center my-6 gap-4' role={"group"}>
                    <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={1} onChange={handleChange}/>1</label>
                    <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={2} onChange={handleChange}/>2</label>
                    <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={3} onChange={handleChange}/>3</label>
                    <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={4} onChange={handleChange}/>4</label>
                    <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={5} onChange={handleChange}/>5</label>
                </div>
                {/*<DisplayError errors={errors} touched={touched} field={"logAnswer"} />*/}
                <div className='flex justify-center gap-4 my-6'>
                    <DisplayStatus status={status}/>
                </div>
                    <div className='flex justify-center gap-4 my-6'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

            </Form>
            {/*<FormDebugger {...props} />*/}
        </>
    )
}