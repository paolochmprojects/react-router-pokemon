import { NavLink } from "react-router-dom"
import personImg from "../assets/person.svg"
import personActiveImg from "../assets/person-fill.svg"
import searchImg from "../assets/search.svg"
import searchActiveImg from "../assets/search-fill.svg"
import starImg from "../assets/star.svg"
import starActiveImg from "../assets/star-fill.svg"



function NavBar() {
    return (
        <nav className="absolute z-10 bg-white right-0 left-0 bottom-0 h-16 border-t-4 border-[#b9b9b9]">
            <div className="flex justify-around h-full items-center">
                <NavLink to="/profile">
                    {({ isActive }) => isActive ? <img src={personActiveImg} alt="" /> : <img src={personImg} alt="" />}
                </NavLink>
                <NavLink to="/">
                    {({ isActive }) => isActive ? <img src={searchActiveImg} alt="" /> : <img src={searchImg} alt="" />}
                </NavLink>
                <NavLink to="/favorites">
                    {({ isActive }) => isActive ? <img src={starActiveImg} alt="" /> : <img src={starImg} alt="" />}
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar