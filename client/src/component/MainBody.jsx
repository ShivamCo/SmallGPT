
import HistoryBar from "./HistoryBar";
import ChatBox from "./ChatBox";

const MainBody = () => {

    return (
        <div className="flex -mt-10 h-screen justify-center items-center w-full bg-MainBody "  >
            <HistoryBar />
            <div className=" flex z-50  h-4/5 justify-center items-end w-full text-white  bg-red">
                <ChatBox />
                
                
            </div>
        </div>
    )

}

export default MainBody;