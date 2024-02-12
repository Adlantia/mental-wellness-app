
export default function Signup() {
   return (
       <>

       <h1 className="font-bold text-xl text-center py-8"> App Name </h1>
       <form className="items-center text-center px-6 grid grid-rows-4">
           <h1 className="text-lg text-center pt-2">Sign Up</h1>
           <p className="text-center py-1">Please fill in this form to create an account.</p>

           <label className="py-3" htmlFor="email">Email: </label>
           <input type="email" placeholder="Enter Email" name="email" required/>

           <label className="py-3" htmlFor="password">Password: </label>
           <input type="password" placeholder="Enter New Password" name="password" required/>

           <label className="py-3" htmlFor="password">Re-enter Password: </label>
           <input type="password" placeholder="Re-enter Password" name="password" required></input>

           <button className="justify-items-center font-bold py-2 my-6 bg-slate-600 rounded-full">Sign Up</button>


       </form>


       </>
   )
}