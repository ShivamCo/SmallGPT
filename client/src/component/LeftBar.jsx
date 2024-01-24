import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.webp';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { login, logout } from '../redux/authSlice';
import { useDispatch } from "react-redux";



const LeftBar = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [authanticated, setIsAuthanticated] = useState(false)
    const [show, setShow] = useState(false)
    let [menuClick, SetMenuClick] = useState(false)
    // const show = Cookies.get("token") 





    const handleLogout = () => {

        Cookies.remove('token', { path: "/" })
        Cookies.remove('user', { path: "/" })
        Cookies.remove('history', { path: "/" })

        setShow(false)

        dispatch(logout());
    };

    useEffect(() => {
        setShow(Cookies.get("token"))


    })



    return (
        <div>
            <div onClick={(e) => { SetMenuClick(menuClick = !menuClick) }} className= {`mt-36  sm:invisible opacity-80 fixed drop-shadow-lg px-4  bg-slate-400 rounded-r-full z-50 p-1 border  text-white border-gray-600 `}>

                {
                    menuClick ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                        </svg>

                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6  h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>

                }






            </div>
            <div className={`${menuClick ? 'visible' : 'invisible'} sm:visible bg-sky-500 sm:bg-LeftBar z-40  fixed h-full w-20 `}>


                <div className=' flex h-2/6 place-content-center pt-4' >
                    <a href='/' >
                        <img className=' sm:flex hidden w-12 h-12  ' src={Logo} />
                    </a>
                </div>

                <div className='flex flex-col items-center ' >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white my-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white my-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white my-2 font " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white my-2 font" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>

                    {show ?

                        <svg onClick={handleLogout} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-red-500 text-white my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        :
                        <svg onClick={(e) => navigate("/login")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-8 w-8 hover:text-sky-500 text-white my-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>


                    }





                </div>

            </div>
        </div>
    )


}

export default LeftBar