import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../redux/authSlice.js'


const HistoryBar = () => {

    const [history, setHistory] = useState([])
    const [answerNo, setAnswerNo] = useState('')
    const [removeDetail, setRemoveDetail] = useState({})
    const [searchTerm, setSearchTerm] = useState('')
    

    const { isAuthenticated, token } = useSelector(selectAuth);
    const user_ID = Cookies.get("user")
    const date = new Date();

    const getHistory = async () => {

        if (user_ID) {

            try {

                const response = await axios.post("https://minismallgpt.ap-1.evennode.com/history/send", { user_ID, searchTerm });
                setHistory(response.data)
                console.log(response.data)


            } catch (error) {
                alert("Unable To Fetch History, Server Error", error)

            }
        } 
    }

    const removeHistory = async () => {
        
        if (removeDetail) {
            try {
                const response = await axios.post("https://minismallgpt.ap-1.evennode.com/history/remove", { removeDetail })
                
            } catch (error) {

                console.log(error)

            }
        }


    }

    const searchHandle = (e) => {
        setSearchTerm(e.target.value)
        
    }


    useEffect(() => {

        setTimeout(() => {
            getHistory()
            
        }, 2000) 
        
})

    useEffect(() => {
        removeHistory()
    }, [removeDetail])



    // setHistory( history.filter(i => (i.question).toUpperCase().includes(searchTerm.toUpperCase()))) 

    

   

    return (
        <>
        {isAuthenticated ?
            <div className={`flex-col justify-center w-3/12 ml-24 h-3/4 border-r border-slate-700 bg-MainBody `} >
                <p className=" text-slate-200 text-xl underline underline-offset-4 mb-2 font-semibold text-center " >History</p>

                <div className="flex w-full" >
                    <input onChange={searchHandle} placeholder="Search... " className=" text-slate-300 text-center h-8 w-full mx-10 my-4 bg-white bg-opacity-20 border border-opacity-10 border-red-white rounded-full " >
                    </input>
                </div>
                {/* <div className={` border  rounded-lg h-36 ${ searchResult.length > 0 ? "flex flex-col" : "hidden" } `} >
                    {
                        searchResult.map((i) => 
                        <div className=" w-full my-2 " >
                            <p className=" text-xl text-center hover:text-blue-400 cursor-pointer text-slate-200 " > {i.question} </p>
                        </div>)
                    }
                </div> */}

                <div className="  w-full overflow-auto text-white" >
                    {isAuthenticated
                        ? <div className=" flex z-50  flex-col w-full p-2 " >

                            {
                                (history.slice().reverse()).map((i) =>
                                    <div onMouseEnter={(e) => { setAnswerNo(i.question) }} onMouseLeave={(e) => { setAnswerNo('') }}
                                        className="flex flex-col justify-between hover:cursor-pointer hover:bg-slate-800 w-full border border-slate-400 my-1 p-1 rounded-md px-2 overflow-hidden " >
                                        <div className=" flex justify-between " >
                                            <div>
                                                <p
                                                    className=" text-slate-200 font-semibold underline decoration-slate-600 underline-offset-2 text-lg
                                    
                                    " key={Math.random() * 100} >{((i.question).slice(0, 20) + " ....").toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <svg onClick={() => { setRemoveDetail({ "user_ID": user_ID, "question": i.question }) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-slate-300 hover:text-red-500 w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>

                                            </div>
                                        </div>

                                        <div className={` h-48 overflow-auto 
                                    [&::-webkit-scrollbar]:w-1
                                    [&::-webkit-scrollbar]:p-2
                                    [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-900
                                    [&::-webkit-scrollbar-thumb]:rounded-full
                                    [&::-webkit-scrollbar-thumb]:bg-gray-400
                                    ${i.question === answerNo ? 'flex' : 'hidden'}`} >

                                            <p>{history ? i.answer : null}</p>


                                        </div>




                                    </div>
                                )
                            }


                        </div>
                        :
                        null
                    }


                </div>
            </div>:
            null}
        </>
    )

}

export default HistoryBar;