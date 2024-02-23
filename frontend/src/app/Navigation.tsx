import { metadata} from "@/app/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const user = {
    profileName: "Watermelon",
}

export function Navigation () {
    return (
        <div className="navbar bg-base-300 justify-between">
            <div className="flex-none">
                <button className="btn btn-circle btn-ghost color-primary">
                    <a><FontAwesomeIcon className="w-5 h-5" icon={faHouse}/></a>
                </button>
            </div>
            <div>
                <a className="btn btn-ghost text-xl">Mental Wellness App</a>
            </div>
            <div className="flex-none">
                <div className="avatar">
                    <p>Hello, {user.profileName}</p>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     className="inline-block w-5 h-5 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
                        <li><a>Mood</a></li>
                        <li><a>Sleep</a></li>
                        <li><a>Journal</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}