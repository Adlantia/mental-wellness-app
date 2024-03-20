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
import {FormDebugger} from "@/app/components/formDebugger";


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
        profileId: profile.profileId,
        profileName: profile.profileName,
        profileEmail: profile.profileEmail,
        profilePassword: "",
        profilePasswordConfirm: ""
    }

    const formSchema = ProfileSchema.pick({profileName: true, profileEmail:true, profileId: true, profilePassword: true, profilePasswordConfirm: true})
        .extend({
            profileId: z.string({
                required_error: 'profileId is required',
                invalid_type_error: 'Please provide a valid profileId'
            })
                .uuid({message: 'please provide a valid profileId'}).nullable(),
            profileName: z
                .string({required_error: "Profile Name is required"})
                .min(1, {message: 'please provide a valid profile name (min 1 characters'})
                .max(32, {message: 'please provide a valid profile name (max 32 characters'}),
            // profilePassword: z
            //     .string({required_error: "profile password is required", invalid_type_error: "please provide a valid password"})
            //     // .min(8, {message: 'please provide a valid password (min 8 characters)'})
            //     .max(32, {message: 'please provide a valid password (max 32 characters)'}).nullable(),
            // profilePasswordConfirm: z
            //     .string({required_error: "profile password is required", invalid_type_error: "please provide a valid password"})
            //     // .min(8, {message: 'please provide a valid password (min 8 characters)'})
            //     .max(32, {message: 'please provide a valid password (max 32 characters)'}).nullable()
        })
    type Values = z.infer<typeof formSchema>


    const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
        values.profilePasswordConfirm = values.profilePasswordConfirm === "" ? null : values.profilePasswordConfirm
        values.profilePassword = values.profilePassword === "" ? null : values.profilePassword

        const {setStatus, resetForm} = actions
        fetch(`/api/profile/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            let type = 'alert alter-danger'
            if (json.status === 200) {
                console.log(json)
                resetForm()
                router.refresh()
            }
            setStatus({type:json, message: json.message})
        })
    }
    return(
        <>
            <h1 className="text-2xl text-center mt-4 mb-4">Profile</h1>
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

function ProfileUpdateFormContent(props: any) {
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

    return (
        <div className="flex justify-center">
            <form id="profileForm" onSubmit={handleSubmit} className="w-1/2">
                <div className="mb-4">
                    <label className="block font-semibold mb-4">Name</label>
                    <input
                        onChange={handleChange}
                        value={values.profileName}
                        className="input input-bordered w-1/2"
                        type="text"
                        id="profileName"
                        name="profileName"
                        required
                    />
                    <DisplayError errors={errors} touched={touched} field={"profileName"} />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Email</label>
                    <h2 className="p-3 mt-4 mb-4 bg-base-200 text-neutral-content rounded-md w-1/2">{values.profileEmail}</h2>
                </div>

                <div className="mb-4">
                    <label className="block mb-4 font-semibold">New Password</label>
                    <input
                        onChange={handleChange}
                        value={values.profilePassword}
                        className="input input-bordered w-1/2"
                        type="password"
                        id="profilePassword"
                        name="profilePassword"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-4 font-semibold">Confirm New Password</label>
                    <input
                        onChange={handleChange}
                        value={values.profilePasswordConfirm}
                        className="input input-bordered w-1/2"
                        type="password"
                        id="profilePasswordConfirm"
                        name="profilePasswordConfirm"
                        placeholder="Confirm new password"
                    />
                    <DisplayError errors={errors} touched={touched} field={"profilePasswordConfirm"} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <DisplayStatus status={status} />
            </form>
            <FormDebugger {...props} />
        </div>
    )
}
