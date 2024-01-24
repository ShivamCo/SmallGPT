import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HistoryBar from "./HistoryBar";

import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../redux/authSlice.js'



const ChatBox = () => {

    const { isAuthenticated, token } = useSelector(selectAuth);
    const [question, setQuestion] = useState('Question')
    const [answer, setAnswer] = useState('')
    const [thisAnswer, setThisAnswer] = useState(0)
    const [para, setPara] = useState("")
    const [history, setHistory] = useState({})
    const [show, setShow] = useState(Cookies.get("token"))
    const [sesionQuestion, setSessionQuestion] = useState([])

    const [processing, setProcessing] = useState(false)
    // const show = Cookies.get("token")
    const user_ID = Cookies.get("user")

    let session = []

    const handleSubmit = async (event) => {
        event.preventDefault()

        setProcessing(true)

        try {

            const response = await axios.post("https://smallgpt.onrender.com/openai", { "question": question })

            setAnswer(response.data.choices[0].message.content)
            setSessionQuestion(sesionQuestion.concat({ "question": question, "answer": answer }))
            setProcessing(false)

            await axios.post("https://smallgpt.onrender.com/history/add", { "question": question, "answer": response.data.choices[0].message.content, user_ID }, user_ID)



        } catch (error) {
            console.error('Error sending message to OpenAI:', error);
        }



    }


    const handleChange = (e) => {
        setQuestion(e.target.value)
        setAnswer('')
    }


    const saveHistory = async () => {
        setHistory({
            UserID: user_ID,
            question: question,
            answer: answer
        })
        try {

            const response = await axios.post("https://smallgpt.onrender.com/history/add", { history });
            
        } catch (error) {
            console.error("Unable To save the response to DB", error)
        }





    }

    useEffect(() => {

        if (thisAnswer < answer.length) {
            setTimeout(() => {
                setPara(answer.slice(0, thisAnswer))

                setThisAnswer(thisAnswer + 1)
            }, 10)
        }


    })




    useEffect(() => {
        setShow(Cookies.get("token"))
    }, [])


    

    return (

        <div className={`z-0  mt-10 m-2 flex flex-col w-full h-full  border p-2 border-slate-200 border-opacity-40  bg-LeftBar rounded-2xl sm:h-full`} >

            {isAuthenticated ?

                <>
                    <div className=" flex-1 overflow-auto h-full flex-col p-4
            
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar]:p-2
                    [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-900
                        [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-400
        

            " >


                        {processing ?
                            <div className="  flex  justify-center items-center ">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin text-white h-8 w-8 mr-3 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                                <span className="text-slate-400 text-2xl " >  Processing...</span>

                            </div> :
                            <p className={` text-3xl ${answer ? "hidden" : "flex" } text-center text-slate-300 font-bold `} >
                                How can I help you today?
                            </p>
                        }

                        

                        {answer ?
                            <div>
                                

                                <div className=" p-4 m-2 border border-slate-200 rounded-2xl border-opacity-40 " >
                                    <p className="mb-2 border-b text-slate-200 pb-2 font-semibold text-xl" >{question}</p>
                                    <p className="text-slate-200" >{para}</p>
                                </div>
                            </div>
                            : null
                        }


                    </div>

                    <div className=" flex  " >
                        <div className="flex w-full  justify-center items-end" >

                            <div className="flex w-full justify-center items-center " >
                                {/* {answer ? <p> {answer} </p> : null} */}

                                <form className="w-full" onSubmit={handleSubmit} >
                                    <div className="flex justify-center items-center " >
                                        <input onChange={handleChange} className="pl-4 text-xl text-white font-thin w-3/4 m-2 h-12 border border-slate-200 border-opacity-30 bg-white bg-opacity-10 rounded-full" >
                                        </input>
                                        <input type="submit" className=" bg-sky-500 font-semibold hover:cursor-pointer text-white p-2 h-min px-4 rounded-2xl " />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </>

                : <div className=" flex flex-col justify-center items-center h-full " >

                    <span className=" text-white font-semibold text-3xl " >
                        Please Login
                    </span>
                    <a href="/login" className=" p-2 text-white px-4 font-semibold shadow-sm shadow-white bg-sky-500 rounded-xl m-2 hover:bg-slate-500 hover:cursor-pointer " >
                        Log In Now
                    </a>

                </div>
            }
        </div>



    )

}




export default ChatBox