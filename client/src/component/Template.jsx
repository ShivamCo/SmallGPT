import LeftBar from "./LeftBar";
import TopBar from "./TopBar";
import HistoryBar from "./HistoryBar";
import MainBody from "./MainBody"

const Template = () => {
    return (
        <div className="flex " >
            {/* Left Side */}

            <div>
            <LeftBar />
            </div>
                
            

            
                <TopBar />
                


               

            

        </div>
    )
}

export default Template