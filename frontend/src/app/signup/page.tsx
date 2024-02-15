import React from "react";

export default function Signup() {
   return (
       <>
           <div className="flex justify-center items-center h-screen">
               <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                   <h1 className="text-3xl block text-center font-semi-bold pb-4">Register
                   </h1>
                   <p className="mb-4">Create your account. It's free and only takes a minute</p>
                   <hr className="mt-3"></hr>

                   <form>
                       <div className="grid grid-cols-2 gap-5">
                           <input type="text" className="border border-gray-400 py-1 px-2" placeholder="First name"/>
                           <input type="text" className="border border-gray-400 py-1 px-2" placeholder="Last name"/>
                       </div>
                       <div className="mt-5 "><input type="email" className="border border-gray-400 py-1 px-2 w-full"
                                                     placeholder="Email" required/>
                       </div>
                       <div className="mt-5 "><input type="password" className="border border-gray-400 py-1 px-2 w-full"
                                                     placeholder="Password" required/>
                       </div>
                       <div className="mt-5 "><input type="password" className="border border-gray-400 py-1 px-2 w-full"
                                                     placeholder="Confirm Password" required/>
                       </div>
                       <div className="mt-5">
                           <input type="checkbox" className="border border-gray-400"/>
                           <span className="pl-2">
                               I accept the <a href="#" className="text-purple-500 font-semibold">Terms of Use</a>
                           </span>
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