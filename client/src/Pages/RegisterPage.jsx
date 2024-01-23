import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const handleSubmit = async () => {



        try {
            const response = await axios.post('https://minismallgpt.ap-1.evennode.com/register', { email, password });
            
            alert(response.data.message)
            navigate("/login")
        } catch (error) {
            alert(error.response.data.message);
        }
    }


    

    return (
        <div className=" bg-MainBody h-screen " >

            <div className="min-h-screen bg-MainBody py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Register</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input onChange={(e) => setEmail(e.target.value)} autoComplete="off" id="email" name="email" type="email" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <input onChange={(e) => setPassword(e.target.value)} autoComplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <button onClick={handleSubmit} className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                    <span className="mt-8" >Already have an account <a href="/login" className=" text-blue-600 hover:underline " >SIGN IN</a> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default RegisterPage