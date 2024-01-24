
import HistoryBar from "./HistoryBar";
import ChatBox from "./ChatBox";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../redux/authSlice.js'

const MainBody = () => {

    const { isAuthenticated, token } = useSelector(selectAuth);
    const [hisoryOrNew, setHistoryOrNew] = useState('new')

    const handleShow = (e) => {
        setHistoryOrNew(e.target.value)

    }

    return (
        <div className=" sm:pl-20 flex w-full flex-col h-screen bg-MainBody pt-2 " >

            <div className=" flex mt-4 sm:hidden z-20 text-white justify-center  w-full ">
                <div className="  " >
                    <button onClick={handleShow} value={"history"} className="mx-2 bg-sky-600  p-2 px-4 rounded-2xl" >History</button>
                </div>
                <div>
                    <button onClick={handleShow} value={"new"} className="mx-2 bg-cyan-600  p-2 px-4 rounded-2xl" >Ask New Question ?</button>
                </div>
            </div>


            <div className=" sm:flex h-full sm:h-3/4  sm:mt-10 w-full justify-center  " >

               
                        <div className={` ${ hisoryOrNew === 'history' ? 'flex' : 'hidden' } ${ isAuthenticated ? 'sm:flex': "hidden" }  sm:w-3/12`}>
                            <HistoryBar />
                        </div>
                        
                        <div className={` ${ hisoryOrNew === 'new' ? 'flex' : 'hidden' } ${ isAuthenticated ? 'sm:w-7/12' : 'sm:w-3/12'} h-5/6 sm:flex `} >
                        <ChatBox />
                        </div>
                








            </div>


        </div>
    )

}

export default MainBody;