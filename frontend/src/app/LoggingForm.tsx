'use client'
import {Form, Formik, FormikHelpers} from "formik";
import {Session} from "@/utils/models/fetchSession";
import {useRouter} from "next/navigation";
import {Values, z} from "zod";
import {LogSchema} from "@/utils/models/log.model";

type LoggingFormProps = {
    session: Session | undefined
}

export function LoggingForm(props: LoggingFormProps) {
    const router = useRouter()
    const {session} = props
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
        let log = {"logProfileId": profile.profileId, "logId": null, "logTrackerId": null, "logAnswer": values.logAnswer, "logDatetime": null}
        let {setStatus, resetForm} = actions
        fetch('apis/log', {
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
            }
            setStatus({type: json, message: json.message})
        })
    }

    const {handleChange} = props

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <div>
                    <Form>
                        <div className='flex justify-center my-6 gap-4' role={"group"}>
                            <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={1} onChange={handleChange}/>1</label>
                            <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={2} onChange={handleChange}/>2</label>
                            <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={3} onChange={handleChange}/>3</label>
                            <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={4} onChange={handleChange}/>4</label>
                            <label className='btn btn-circle focus:bg-slate-400'><input type="radio" name={"logAnswer"} value={5} onChange={handleChange}/>5</label>
                        </div>
                    </Form>
                    <div className='flex justify-center gap-4 my-6'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </Formik>
        </>
    )
}