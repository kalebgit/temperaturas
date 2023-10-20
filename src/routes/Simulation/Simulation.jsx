import { Button, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import MemoryIcon from '@mui/icons-material/Memory';
import Image from '../../assets/straygame.gif'

function Simulation(){

    const [temperatures, setTemperatures] = useState([[], []])
    const [isReady, setIsReady] = useState(false);
    const [formData, dispatchFormData] = useReducer((state, action)=>{
        switch(action.type){
            case 'MAX': 
                return {...state, max: {...state.max, 
                    value: action.value,
                    valid: (action.value >=20 && action.value <=30)}}
            case 'MIN':
                return {...state, min: {...state.min, 
                    value: action.value,
                    valid: (action.value >=10 && action.value < 20)}}
            case 'ONBLUR': 
                switch(action.subtype){
                    case "MAX": 
                        return {...state, max: {...state.max, enable: true}}
                    case "MIN": 
                    return {...state, min: {...state.min, enable: true}}
                }
            case 'RESET_INPUTS': 
                return {max: {value: 0, valid: false, enable: false}, 
                min: {value: 0, valid: false, enable: false}}
        }
    }, {max: {value: 0, valid: false, enable: false}, 
        min: {value: 0, valid: false, enable: false}})

        useEffect(()=>{
            dispatchFormData({type: 'RESET_INPUTS'})
        }, [])

        const generateData = ()=>{
            setIsReady(false);
            for(let semana = 0; semana <= 1; semana++){
                for(let dia = 0; dia < 5; dia++){
                    setTemperatures((prevState)=>{
                        prevState[semana][dia].push(generateTemp());
                        return prevState;
                    })
                }
            }
            setIsReady(true);
        }

        const generateTemp = ()=>{
            let temperatura = Math.floor(Math.random() * (32 - 8) + 8);
            return temperatura;
        }

    const inputs = [ 
        <TextField id="max" name="max" key="max" label="Valor Maximo" 
        variant= "outlined"
        type="number" required={true} placeholder='Escriba aqui entre 20 y 30...' 
        error={(!formData.max.valid && formData.max.enable)}
        onBlur={()=>{dispatchFormData({type: 'ONBLUR', subtype: 'MAX'})}}
        helperText={`${(!formData.max.valid && formData.max.enable) 
            ? 'Debe ser un valor entre 20 y 30': ''}`} 
        size="small"  
        onChange={({target: {value}})=>{dispatchFormData({type: 'MAX', 
            value: value})}}
        value={formData.max.value}/>, 

        <TextField id="min" name="min" key="min" label="Valor Minimo" 
        variant= "outlined"
        type="number" required={true} placeholder='Escriba aqui entre 10 y 19...' 
        error={(!formData.min.valid && formData.min.enable)}
        onBlur={()=>{dispatchFormData({type: 'ONBLUR', subtype: 'MIN'})}}
        helperText={`${(!formData.min.valid && formData.min.enable) 
            ? 'Debe ser un valor entre 10 y 19': ''}`} 
        size="small"  
        onChange={({target: {value}})=>{dispatchFormData({type: 'MIN', 
            value: value})}}
        value={formData.min.value}/>
    ]

    return (
        <main className="min-h-screen w-full flex flex-col flex-nowrap 
            justify-center items-center gap-5">
            <h1 className="text-3xl font-bold">Simulacion</h1>
            <section className="flex flex-row flex-nowrap justify-center items-center 
            gap-5">
                {inputs.map((element)=>{return element})}
            </section>
            <Button variant="contained" 
            disabled={!formData.min.valid || !formData.max.valid}
            iconStart={<MemoryIcon style={{ fontSize: '3rem' }}/>}
            onClick={generateData}>
                Generar datos</Button>

            {isReady ? 
            <>
            </> : 
            <>
            <img src={Image} alt="esperando datos"/>
            <p className="text-xl">Esperando datos...</p>
            </>}
        </main>
    )
}

export default Simulation;

