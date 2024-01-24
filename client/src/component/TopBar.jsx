import Logo from '../assets/Logo.webp';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {

    const navigate = useNavigate()

    return (

        <div className=" z-40 sm:z-0 p-2 bg-TopBar justify-center items-center w-full h-16  sm:h-24  " >
            <div className="flex justify-between items-center  h-full  place-content-center " >

                <div className=' sm:flex sm:flex-1 ' >

                </div>

                <div className="flex flex-1 justify-center items-center  " >

                    

                    <input placeholder="Search... " className=" text-slate-300 text-center w-3/4 px-4 h-8   sm:w-1/2 bg-white bg-opacity-20 border border-opacity-10 border-red-white rounded-full " >
                    </input>
                </div>


                <div className="flex sm:flex-1 justify-end sm:pr-24" >

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:flex hidden text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <div className='flex px-4 sm:pl-12  place-self-center' >

                        <button onClick={(e) => { navigate('/') }}>
                            <img src={Logo} className='w-8  h-8' ></img>
                        </button>
                    </div>


                </div>


            </div>
        </div>

    )
}

export default TopBar