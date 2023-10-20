import { useState } from "react";

//material ui icons
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';


import { Button, ButtonGroup, IconButton, List } from "@mui/material";


//styles
import './Navbar.scss'
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Effect from "../Effect/Effect";
function Navbar(){
    const [isShown, setIsShown] = useState(false);

    const onChange = ()=>{
        setIsShown((prevState)=>{
            return !prevState;
        })
    }

    return (
        <header className="sticky w-40 p-2">
            <section>
                <IconButton size="large" onClick={onChange}>
                    <ListIcon style={{ fontSize: '3rem' }}/>
                </IconButton>
                
            </section>
            <nav className="relative w-full">
                <section className={`flex flex-col flex-nowrap justify-start 
                items-start nav ${isShown ? "nav__appear" : "nav__disappear"}`}>
                    <Link to="/" className="w-full"
                            >
                        <Button startIcon={<HomeIcon style={{ fontSize: '2rem' }}/>}
                                className="w-full"
                            onClick={onChange}>
                                Home
                            </Button>
                    </Link>        
                    <Link to="/simulation" className="w-full">
                        <Button startIcon={<ScienceRoundedIcon 
                        style={{ fontSize: '2rem' }}/>}
                            className="w-full"
                            onClick={onChange}>
                            Simulacion
                        </Button>
                    </Link>
                </section>
            </nav>
            {isShown ? 
                createPortal(<Effect blur/>, document.getElementById("backdrop-effect")): 
                <></>}
        </header>
    )
}

export default Navbar;