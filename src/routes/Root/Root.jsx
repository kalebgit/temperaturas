import { Outlet } from "react-router-dom";
import Navbar from "../../page/Navbar/Navbar";

function Root(){
    return (
        <>
            <Navbar/>
            <Outlet/>
            <div id="backdrop-effect"></div>
        </>
    )
}

export default Root;