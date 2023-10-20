import { Button, TextField } from "@mui/material";
import { useEffect, useReducer } from "react";
import MemoryIcon from '@mui/icons-material/Memory';

function Simulation(){

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

    const inputs = [ 
        <TextField id="max" name="max" key="max" label="Valor Maximo" 
        variant= "outlined"
        type="number" required={true} placeholder='Escriba aqui entre 10 y 19...' 
        error={(!formData.max.valid && formData.max.enable)}
        onBlur={()=>{dispatchFormData({type: 'ONBLUR', subtype: 'MAX'})}}
        helperText={`${(!formData.max.valid && formData.max.enable) 
            ? 'Debe ser un valor entre 10 y 19': ''}`} 
        size="small"  
        onChange={({target: {value}})=>{dispatchFormData({type: 'MAX', 
            value: value})}}
        value={formData.max.value}/>, 

        <TextField id="min" name="min" key="min" label="Valor Minimo" 
        variant= "outlined"
        type="number" required={true} placeholder='Escriba aqui entre 20 y 35...' 
        error={(!formData.min.valid && formData.min.enable)}
        onBlur={()=>{dispatchFormData({type: 'ONBLUR', subtype: 'MIN'})}}
        helperText={`${(!formData.min.valid && formData.min.enable) 
            ? 'Debe ser un valor entre 20 y 35': ''}`} 
        size="small"  
        onChange={({target: {value}})=>{dispatchFormData({type: 'MIN', 
            value: value})}}
        value={formData.min.value}/>
    ]

    return (
        <main className="min-h-screen w-full flex flex-col flex-nowrap 
            justify-center items-center gap-5">
            <h1>Simulacion</h1>
            <section className="flex flex-row flex-nowrap justify-center items-center 
            gap-5">
                {inputs.map((element)=>{return element})}
            </section>
            <Button variant="contained" 
            disabled={!formData.min.valid && !formData.max.valid}
            iconStart={<MemoryIcon style={{ fontSize: '3rem' }}/>}>
                Generar datos</Button>
        </main>
    )
}

export default Simulation;

