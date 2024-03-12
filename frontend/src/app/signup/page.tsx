"use client";

import React from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";


export function SignUpForm() {

    const initialValues : SignUp = {
        profileName: '',
        profileEmail: '',
        profilePassword: '',
        profilePasswordConfirm: ''
    }

    const handleSubmit = (values: signUp, actions: FormikHelpers<SignUp>) => {
        const {setStatus, resetForm} = actions
        fetch('/apis/signup', {
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
                validationSchema={toFormikValidationSchema(SignUpSchema)}
            >
                {SignInFormContent}
            </Formik>
        </>
    )
}

export default function Signup(props: FormikProps<SignUp>) {

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
       <>
           <div className="flex justify-center items-center h-screen">
               <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                   <h1 className="text-3xl block text-center font-semi-bold pb-4">Register
                   </h1>
                     <p className="mb-4">Create your account. It's free and only takes a minute</p>
                        <hr className="mt-3"></hr>

                   <form onSubmit={handleSubmit}>
                           <div className="flex justify-between">
                               <label htmlFor="First name"></label>
                               <input placeholder="First name"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      // value={values.profileName}
                                      className="border border-gray-400 py-1 w-full rounded"
                                      type="text"
                                      name="firstName"
                                      id="firstName"
                               />
                               <DisplayError errors={errors} touched={touched} field={"profileName"} />
                       </div>

                         <div className="mt-5">
                             <label htmlFor="email"></label>
                             <input placeholder="Email" required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // value={values.profileEmail}
                                    className="border border-gray-400 py-1 px-2 w-full rounded"
                                    type="text"
                                    name="profileEmail"
                                    id="profileEmail"
                             />
                             <DisplayError errors={errors} touched={touched} field={"profileEmail"} />
                         </div>


                        <div className="mt-5 ">
                            <label htmlFor="password"></label>
                            <input type="password" className="border border-gray-400 py-1 px-2 w-full rounded"
                                                     placeholder="Password" required
                                   onBlur={handleBlur}
                                   onChange={handleChange}


                            />
                         </div>


                        <div className="mt-5 ">
                           <label htmlFor="confirm password"></label>
                           <input type="password" className="border border-gray-400 py-1 px-2 w-full rounded" placeholder="Confirm Password" required/>
                        </div>
                        <div className="mt-5">
                           <label htmlFor="checkbox"></label>
                           {/*<input type="checkbox" className="border border-gray-400 rounded"/>*/}
                           {/*  <span className="pl-2">*/}
                           {/*    I accept the <a href="#" className="text-purple-500 font-semibold">Terms of Use</a>*/}
                           {/*  </span>*/}
                        </div>
                       <div className="mt-5">
                           <button className="border-indigo-700 bg-indigo-700 text-white w-full py-3 rounded-md hover:bg-transparent hover:text-indigo-700 font-semi-bold">Register</button>
                       </div>
                   </form>
               </div>
           </div>

       </>
   )
}