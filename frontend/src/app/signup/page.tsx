
export default function Signup() {
   return (
       <>
           <div className="container flex justify-center items-center h-screen">
           <form className="max-w-96 justify-center grid grid-rows-4">
               <h1 className="font-bold text-xl text-center pt-3"> App Name </h1>

               <h1 className="text-lg text-center pt-1">Sign Up</h1>
               <p className="text-center ">Please fill in this form to create an account.</p>

               <label className="py-2 my-3" htmlFor="email">Email: </label>
               <input className="py-2" type="email" placeholder="Enter Email" name="email" required/>

               <label className="py-3 my-3" htmlFor="password">Password: </label>
               <input className="py-1" type="password" placeholder="Enter New Password" name="password" required/>

               <label className="py-3 my-3" htmlFor="password">Re-enter Password: </label>
               <input className="py-1" type="password" placeholder="Re-enter Password" name="password" required></input>

               <button className="font-bold py-2 my-6 bg-slate-600 rounded-full w-full">Sign Up</button>

           </form>
           </div>


       </>
   )
}