'use client'
import {Field, Form, Formik, FormikHelpers} from "formik";
import {Session} from "@/utils/models/fetchSession";
import {useRouter} from "next/navigation";
import {Values} from "zod";
import {LogSchema} from "@/utils/models/log.model";


type LoggingFormProps = {
    session: Session | undefined
}

export function LoggingForm(props: LoggingFormProps) {
    const router = useRouter()
    //TODO: put the next five lines back when session issue sorted; solution found, need to find where to implement
    // const {session} = props
    // if (session === undefined) {
    //     return <></>
    // }
    // const {profile, authorization} = session
    const initialValues = {
        logAnswer: ''
    }
    const formSchema = LogSchema.pick({logAnswer: true})
    type Values = z.infer<typeof formSchema>
    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        let log = {"logProfileId": profile.profileId, "logId": null, "logTrackerId": null, "logAnswer": values.logAnswer, "logDatetime": null}
        let {setStatus, resetForm} = actions
        console.log(log)
        fetch('apis/log', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `${authorization}`
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

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <div>
                    <Form>
                        <div className='flex justify-center my-6 gap-4' role={"group"}>
                            <label className='btn btn-circle focus:bg-slate-400'><Field type="radio" name={"rating"} value={'1'}/>1</label>
                            <label className='btn btn-circle focus:bg-slate-400'><Field type="radio" name={"rating"} value={'2'}/>2</label>
                            <label className='btn btn-circle focus:bg-slate-400'><Field type="radio" name={"rating"} value={'3'}/>3</label>
                            <label className='btn btn-circle focus:bg-slate-400'><Field type="radio" name={"rating"} value={'4'}/>4</label>
                            <label className='btn btn-circle focus:bg-slate-400'><Field type="radio" name={"rating"} value={'5'}/>5</label>
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