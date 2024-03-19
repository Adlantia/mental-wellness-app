'use client'

import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {JournalSchema} from "@/utils/models/journal.model";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import React from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {Session} from "@/utils/models/fetchSession";

type JournalFormProps = {
    session: Session | undefined
}
export function JournalForm (props: JournalFormProps) {
    const router = useRouter()

    const {session} = props

    if(session === undefined) {
        return <> Please Login</>
    }

    const {profile, authorization} = session

    const initialValues  = {
        journalTitle: '',
        journalText: ''
    }
    const formSchema = JournalSchema.pick({journalTitle: true, journalText:true})
        type Values = z.infer<typeof formSchema>
    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        const journal = {journalProfileId:profile.profileId, journalId: null, journalDateTime:null, journalText: values.journalText, journalTitle: values.journalTitle}
        const {setStatus, resetForm} = actions
        fetch('/apis/journal', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(journal)
        }).then(response => response.json()).then(json => {
           let type = 'alert alter-danger'
            if (json.status === 200) {
                console.log(json.data)
                resetForm()
                router.refresh()
                window.location.href = '/journal'
            }
            setStatus({type:json, message: json.message})
        })
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(formSchema)}
            >
                {JournalLoginFormContent}
            </Formik>
        </>
    )
}
function JournalLoginFormContent (props: any) {
    const {
        status,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;

    return(
        <>
            <header style={{ fontSize: '24px', margin: '20px 0', textAlign: 'center' }}>
                Journal
            </header>


            <form id="journalForm" onSubmit = {handleSubmit} className="mb-10">
                <div>
                    <input
                        //onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.journalTitle}
                        className="input input-bordered w-full max"
                        type="text"
                        id="journalTitle"
                        name="journalTitle"
                        style={{
                            fontSize: '16px',
                            width: '100%',
                            padding: '10px 10px',
                            marginBottom: '10px',
                            color: '#444',
                        }
                        }
                        placeholder="Title"
                        required
                    />

                </div>

                <DisplayError errors={errors} touched={touched} field={"journalTitle"} />
                {/* <DisplayStatus status={status} />*/}
                <div>
                    <textarea
                        autoFocus
                        className = "textarea"
                        id="journalContent"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.journalText}
                        name="journalText"
                        style={{
                            fontSize: '16px',
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            color: '#555',
                            height: '300px'
                        }}
                        placeholder="Start your journal entry"
                        required
                    >
                    </textarea>
                </div>


                <div style={{textAlign: 'center'}}>
                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{
                            fontSize: '15px',
                            padding: '08px 15px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        Submit
                    </button>
                </div>
                <DisplayStatus status={status} />
            </form>
        </>
    )
}
