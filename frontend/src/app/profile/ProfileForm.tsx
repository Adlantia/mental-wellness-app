'use client'

import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {ProfileSchema} from "@/utils/models/profile.model";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import React from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {Session} from "@/utils/models/fetchSession";
import {router} from "next/client";


type ProfileUpdateProps = {
    session: Session | undefined
}
export default function ProfileForm (props: ProfileUpdateProps) {
    const router = useRouter()

    const {session} = props

    if(session === undefined) {
        return <> Please Login</>
    }

    const {profile, authorization} = session

    const initialValues  = {
        profileName: profile.profileName,
        profileEmail: profile.profileEmail
    }

    const formSchema = ProfileSchema.pick({profileName: true, profileEmail:true})
    type Values = z.infer<typeof formSchema>


    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        const journal = {profileName:profile.profileName, profileId: null, profileEmail: profile.profileEmail}
        const {setStatus, resetForm} = actions
        fetch('/apis/profile/:profileId', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(profile)
        }).then(response => response.json()).then(json => {
            let type = 'alert alter-danger'
            if (json.status === 200) {
                console.log(json.data)
                resetForm()
                router.refresh()
                window.location.href = '/profile/:profileId'
            }
            setStatus({type:json, message: json.message})
        })
    }
    return(
        <>
            <h1>Profile</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(formSchema)}
            >
                {ProfileUpdateFormContent}
            </Formik>

        </>

    )
}

function ProfileUpdateFormContent (props: any) {
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
        <div className="container">
            <form id="profileForm" onSubmit={handleSubmit} className="mb-10">
                <div>
                    <input
                        //onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileName}
                        className="input input-bordered w-full max"
                        type="text"
                        id="profileName"
                        name="profileName"
                        style={{
                            fontSize: '16px',
                            width: '100%',
                            padding: '10px 10px',
                            marginBottom: '10px',
                            color: '#444',
                        }
                        }
                        // placeholder={profile.profileName}
                        required
                    />

                </div>

                <DisplayError errors={errors} touched={touched} field={"profileName"}/>
                <h2
                    style={{
                        fontSize: '16px',
                        width: '100%',
                        padding: '10px 10px',
                        marginBottom: '10px',
                        color: '#444',
                    }
                    }>{values.profileEmail}</h2>
                <div>
                    <input
                        //onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profilePassword}
                        className="input input-bordered w-full max"
                        type="text"
                        id="profilePassword"
                        name="profilePassword"
                        style={{
                            fontSize: '16px',
                            width: '100%',
                            padding: '10px 10px',
                            marginBottom: '10px',
                            color: '#444',
                        }
                        }
                        placeholder="Enter new password"
                        required
                    />

                </div>
                <div>
                    <input
                        //onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profilePasswordConfirm}
                        className="input input-bordered w-full max"
                        type="text"
                        id="profilePasswordConfirm"
                        name="profilePasswordConfirm"
                        style={{
                            fontSize: '16px',
                            width: '100%',
                            padding: '10px 10px',
                            marginBottom: '10px',
                            color: '#444',
                        }
                        }
                        placeholder="Confirm new password"
                        required
                    />

                </div>

                <DisplayError errors={errors} touched={touched} field={"profileName"}/>

                <DisplayError errors={errors} touched={touched} field={"profileName"}/>
                {/* <DisplayStatus status={status} />*/}

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
                <DisplayStatus status={status}/>
            </form>
        </div>
    )
}