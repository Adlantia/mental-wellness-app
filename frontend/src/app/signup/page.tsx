"use client";

import React from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {SignUp, SignUpSchema} from "@/utils/models/profile.model";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import {FormDebugger} from "@/app/components/formDebugger";


export default function SignUpForm() {

    const initialValues: SignUp = {
        profileId: null,
        profileName: '',
        profileEmail: '',
        profilePassword: '',
        profilePasswordConfirm: ''
    }

    const handleSubmit = (values: SignUp, actions: FormikHelpers<SignUp>) => {
        const {setStatus, resetForm} = actions
        fetch('/apis/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
            .then(json => {
                let type = 'alert alert-danger'
                if (json.status === 200) {
                    resetForm()
                    type = 'alert alert-success'
                }
                setStatus({type, message: json.message})
            })
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(SignUpSchema)}
            >
                {SignupFormContent}
            </Formik>
        </>
    )
}

function SignupFormContent(props: FormikProps<SignUp>) {

    const {
        status,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,

    } = props;

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semi-bold pb-4">Register
                    </h1>
                    <p className="mb-4">Create your account. It's free and only takes a minute</p>
                    <hr className="mt-3"></hr>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-5">
                            <label htmlFor="profileName"></label>
                            <input placeholder="Name"
                                   className="border border-gray-400 py-1 px-2 w-full rounded"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.profileName}
                                   type="text"
                                   name="profileName"
                                   id="profileName"
                            />
                            <DisplayError errors={errors} touched={touched} field={"profileName"}/>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="email"></label>
                            <input placeholder="Email" required
                                   className="border border-gray-400 py-1 px-2 w-full rounded"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.profileEmail}
                                   type="text"
                                   name="profileEmail"
                                   id="profileEmail"
                            />
                            <DisplayError errors={errors} touched={touched} field={"profileEmail"}/>
                        </div>


                        <div className="mt-5 ">
                            <label htmlFor="password"></label>
                            <input
                                placeholder="Password" required
                                className="border border-gray-400 py-1 px-2 w-full rounded"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.profilePassword}
                                type="password"
                                name="profilePassword"
                                id="password"
                            />
                            <DisplayError errors={errors} touched={touched} field={"profilePassword"}/>
                        </div>

                        <div className="mt-5 ">
                            <label htmlFor="confirm password"></label>
                            <input placeholder="Confirm Password" required
                                   className="border border-gray-400 py-1 px-2 w-full rounded"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.profilePasswordConfirm}
                                   type="password"
                                   name="profilePasswordConfirm"
                                   id="passwordConfirm"
                            />
                            <DisplayError errors={errors} touched={touched} field={"profilePasswordConfirm"}/>
                        </div>

                        <div className="mt-5">
                            <button type="submit"
                                    className="btn btn-success border-indigo-700 bg-indigo-700 text-white w-full py-3 rounded-md hover:bg-transparent hover:text-indigo-700 font-semi-bold">Register
                            </button>
                        </div>
                        <DisplayStatus status={status}/>
                    </form>
                    {/*<FormDebugger  {...props}/>*/}

                </div>
            </div>

        </>
    )
}