
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './Home.scss'

function Home(){
    return (
        <main className="flex flex-col flex-nowrap justify-center items-center 
            min-h-screen gap-5">
            <h1 className="text-4xl font-bold">Emiliano Kaleb Jiménez Rivera</h1>
            <a href="https://github.com/kalebgit">
                <IconButton>
                    <GitHubIcon style={{ fontSize: '4rem' }}/>
                </IconButton>
            </a>
            
            <div className=" options-alert ">
                <Button startIcon={<ArrowBackIosIcon style={{ fontSize: '2rem' }}/>}
                    variant="contained" disabled >
                    <span className="text-2xl">Opciones</span>
                </Button>    
            </div>
            

        </main>
    )
}

export default Home;