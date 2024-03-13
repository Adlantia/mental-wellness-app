"use client";

import React from "react";
import {SignIn, SignInSchema} from "@/utils/models/profile.model";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import {FormDebugger} from "@/app/components/formDebugger";


export default function SignInForm() {

    const initialValues : SignIn = {
        profileEmail: '',
        profilePassword: '',
    }

    const handleSubmit = (values: SignIn, actions: FormikHelpers<SignIn>) => {
        const {setStatus, resetForm} = actions
        fetch('apis/login', {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
            .then(json => {
                let type = 'alert alert-danger'
                if(json.status === 200) {
                    resetForm()
                    type = 'alert alert-success'
                }
                setStatus({type, message: json.message})
            })
    }

    return(
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(SignInSchema)}
                >
                {SignInFormContent}
            </Formik>

        </>
    )
}



export function SignInFormContent(props: FormikProps<SignIn>) {

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
                    <h1 className="text-3xl block text-center font-semi-bold"><i className="fa-solid fa-user"></i> Login</h1>
                    <hr className="mt-3"></hr>

                    <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input required
                               placeholder="Enter Email Here..."
                               className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                               onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.profileEmail}
                               type="text"
                               name="profileEmail"
                               id="profileEmail"
                        />
                        <DisplayError errors={errors} touched={touched} field={"profileEmail"} />
                    </div>


                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input required
                               placeholder="Enter Password Here..."
                               className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                               onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.profilePassword}
                               type="password"
                               name="profilePassword"
                               id="profilePassword"
                        />
                        <DisplayError errors={errors} touched={touched} field={"profilePassword"} />
                    </div>


                    {/*<div className="mt-3 flex justify-between items-center">*/}
                    {/*     <div>*/}
                    {/*        <a href="#" className="font-semi-bold text-indigo-900">Forgot Password?</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="mt-5">
                        <button type="submit" className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Login</button>
                    </div>
                        <DisplayStatus status={status} />
                    </form>
                    {/*<FormDebugger {...props}/>*/}

                </div>
            </div>


        </>
    )
}