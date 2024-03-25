import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { menu } from "../sidebar/sidebar.component";
import Logo from "../logo/logo.component";
import User from "../user/user.component";
import Search from "../search/search.component";
import { setSearch } from "../../redux/client/filters.slice";

const Template = () => {
    let { totalQuantity, cartStatus } = useSelector(state => state.carts);
    const dispatch = useDispatch()
    const handleNavigate = () => {
        dispatch(setSearch(''));
    }

    return (
        <div>
            <header className="sticky top-0 z-50 bg-white shadow-lg shadow-gray-200/50">
                <nav className="flex mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">

                    <div className="flex">
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex">
                        <ul className="font-medium text-lg flex space-x-8 mt-0 border-0 bg-white">
                            {
                                menu.map(menu => (
                                    <li key={menu.id}>
                                        <NavLink
                                            to={menu.link}
                                            onClick={handleNavigate}
                                            className={({ isActive }) => isActive ? "flex items-center p-2 space-x-3 rounded-md bg-gray-200 w-full" : "flex items-center p-2 space-x-3"}
                                        >                                           
                                            {menu.label}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="flex">
                        {/* search */}
                        <div className="mr-2">
                            <Search />
                        </div>
                        {/* cart */}
                        <div className="mr-4">
                            <NavLink
                                to='/cart'
                                onClick={handleNavigate}
                                className={({ isActive }) => isActive ? "relative before:content-[''] before:absolute before:w-10 before:h-10 before:transform before:translate-x-[-0.2rem] before:translate-y-[-0.2rem] before:bg-gray-200 before:rounded-lg" : ""}
                            >
                                <div className={`relative flex ${cartStatus ? 'animate-[wiggle_0.5s]' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-1 transform w-9 h-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-5 h-4 top right p-0 m-0 text-white font-mono text-xs  leading-tight text-center">{totalQuantity}
                                    </span>
                                </div>
                            </NavLink>
                        </div>
                        {/* users */}
                        <div>
                            <User />
                        </div>
                    </div>
                </nav>
                {/*  */}
            </header>
            <div>
                <Outlet />
            </div>
            <footer className="bg-white rounded-lg shadow m-4">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">© 2023 <Link to="https://www.facebook.com/hcahtcogn" className="hover:underline">ngocthach™</Link>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                        <li>
                            <Link to={''} className="mr-4 hover:underline md:mr-6 ">About</Link>
                        </li>
                        <li>
                            <Link to={''} className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to={''} className="mr-4 hover:underline md:mr-6">Licensing</Link>
                        </li>
                        <li>
                            <Link to={''} className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Template;