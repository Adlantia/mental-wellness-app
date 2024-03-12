"use client";

import React from "react";
import {SignIn, SignInSchema} from "@/utils/models/profile.model";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";


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
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semi-bold"><i className="fa-solid fa-user"></i> Login</h1>
                    <hr className="mt-3"></hr>

                    <form>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input type="email" id="email" name="email"
                               className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                               placeholder="Enter Email..." required/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input type="text" id="password" name="password"
                               className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                               placeholder="Enter Password..." required/>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                         <div>
                            <a href="#" className="font-semi-bold text-indigo-900">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Login</button>

                    </div>
                    </form>

                </div>
            </div>


        </>
    )
}