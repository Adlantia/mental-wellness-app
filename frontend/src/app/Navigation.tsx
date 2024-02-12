import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export function Navigation () {
    return (
        <div className="navbar bg-neutral">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost color-primary">
                    <FontAwesomeIcon className="w-8 h-8" icon={faHouse} />
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Mental Wellness App</a>
            </div>
            <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    )
}