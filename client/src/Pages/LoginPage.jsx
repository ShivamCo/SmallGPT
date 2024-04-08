import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";


const LoginPage = () => {



    const [email, setEmail] = useState('test123@mail.com');
    const [password, setPassword] = useState('test123@mail.com');
    const [userDetails, setUserDetails] = useState()

    const [isLoading, setIsLoading] = useState(false)


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const saveCookies = () => {

        Cookies.set('user', userDetails.user._id)


    }

    const saveToken = () => {

        Cookies.set('token', userDetails.token)
        dispatch(login(userDetails.user._id));
        navigate('/')
    }



    const handleSubmit = async () => {

        try {
            setIsLoading(true)
            const response = await axios.post('https://smallgpt.onrender.com/login', { email, password })
            setUserDetails(response.data)
            setIsLoading(false)

            // Cookies.set('user', response.data.user._id )
            alert("Login Successful")
        } catch (error) {
            alert(error.response.data.message);
        }
    }


    useEffect(() => {

        if (userDetails) {

            saveCookies()
            saveToken()
            dispatch(login(userDetails.token));

        }


    }, [userDetails])





    return (
        <div className=" bg-MainBody h-screen " >{

            isLoading
                ?
                <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2">
                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">Loading...</span>
                </div>
                :
                <div className="min-h-screen p-4  bg-MainBody py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-2   rounded-lg sm:max-w-xl sm:mx-auto">
                        <div className="absolute inset-0   rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-4 py-10  rounded-xl bg-white shadow-lg sm:rounded-3xl sm:p-20">
                            <div className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Login</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                        </div>
                                        <div className="relative">
                                            <input required  value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                        </div>
                                        <div className="relative flex py-2">
                                            <button onClick={handleSubmit} className="bg-cyan-500 text-white rounded-md px-2 py-1">Login</button>
                                            <span className="justify-center items-center flex px-4" >
                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                                </svg>
                                             Click To Login
                                            </span>
                                        </div>
                                        <span className="mt-8" >Don't have an account <a href="/register" className=" text-blue-600 hover:underline " >SIGN UP</a> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

        </div>
    )

}

export default LoginPage