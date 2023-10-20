import { useState } from "react";

//material ui icons
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';


import { Button, ButtonGroup, IconButton, List } from "@mui/material";


//styles
import './Navbar.scss'
import { Link } from "react-router-dom";
function Navbar(){
    const [isShown, setIsShown] = useState(false);


    return (
        <header className="sticky w-40 ">
            <section>
                <IconButton size="large" onClick={()=>{
                    setIsShown((prevState)=>{
                        return !prevState;
                    })
                }}>
                    <ListIcon fontSize="large"/>
                </IconButton>
                
            </section>
            <nav className="relative w-full">
                <section className={`flex flex-col flex-nowrap justify-start 
                items-start nav ${isShown ? "nav__appear" : "nav__disappear"}`}>
                    <Link to="/" className="w-full"
                            >
                        <Button startIcon={<HomeIcon fontSize="large"/>}
                                className="w-full"
                            >
                                Home
                            </Button>
                    </Link>        
                    <Link to="/simulation" className="w-full">
                        <Button startIcon={<ScienceRoundedIcon fontSize="large"/>}
                            className="w-full"
                            >
                            Simulacion
                        </Button>
                    </Link>
                </section>
            </nav>
        </header>
    )
}

export default Navbar;