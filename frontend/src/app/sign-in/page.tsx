

export default function Signin() {
    return (
        <>
            <div className="container flex justify-center">
                <form className="max-w-96 justify-center grid grid-rows-2">
                    <h1 className="font-bold text-xl text-center mt-3"> Sign In</h1>
                    <p className="text-center mt-3">Please log in using the form below, or press "Create account"</p>
                    
                     <label className="py-3 my-3" htmlFor="email">Email: </label>
                     <input className="input input-bordered input-sm w-full max-w-xs" type="email"
                           placeholder="Enter Email" name="email" required/>

                     <label className="py-3 my-3" htmlFor="password">Password: </label>
                     <input className="input input-bordered input-sm w-full max-w-xs" type="password"
                           placeholder="Enter Password" name="password" required/>


                    <button className="btn btn-sm w-full my-4">Sign In</button>

                    <button className="btn btn-sm w-full my-4">Create account
                    </button>

                </form>
            </div>


        </>
    )
}