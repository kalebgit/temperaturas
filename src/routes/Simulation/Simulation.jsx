import { Button, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import MemoryIcon from '@mui/icons-material/Memory';
import Image from '../../assets/straygame.gif'

function Simulation(){

    //variables
    const [temperatures, setTemperatures] = useState([[[], [], [], [], []], 
            [[], [], [], [], []]])
    const [isReady, setIsReady] = useState(false);
    const [currentValues, setCurrentValues] = useState({max: 0, min: 0});
    const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", 
    "Sabado", "Domingo"]
    const [formData, dispatchFormData] = useReducer((state, action)=>{
        switch(action.type){
            case 'MAX': 
                return {...state, max: {...state.max, 
                    value: parseInt(action.value),
                    valid: (action.value >=20 && action.value <=30)}}
            case 'MIN':
                return {...state, min: {...state.min, 
                    value: parseInt(action.value),
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
            dispatchFormData({type: 'RESET_INPUTS'})
            setTemperatures((prevState)=>{
                return [[[], [], [], [], []], 
                [[], [], [], [], []]];
            })
            for(let semana = 0; semana <= 1; semana++){
                for(let dia = 0; dia < 5; dia++){
                    setTemperatures((prevState)=>{
                        let dayTemps = [];
                        dayTemps.push(generateTemp());
                        dayTemps.push(generateTemp());
                        prevState[semana][dia] = dayTemps;
                        return prevState;
                    })
                }
            }
            setIsReady(true);
        }

        const generateTemp = ()=>{
            let temperatura = Math.floor(Math.random() * ((currentValues.max + 2) - (currentValues.min -2)) + (currentValues.min -2));
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
        onChange={({target: {value}})=>{
            setCurrentValues((prevState)=>{
                return {...prevState, max: parseInt(value)}
            })
            dispatchFormData({type: 'MAX', 
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
        onChange={({target: {value}})=>{
            setCurrentValues((prevState)=>{
                return {...prevState, min: parseInt(value)}
            })
            dispatchFormData({type: 'MIN', 
            value: value})}}
        value={formData.min.value}/>
    ]

   

    const min = ()=>{
        let min = 35;
        temperatures.forEach((week)=>{
            week.forEach((day)=>{
                day.forEach((temp)=>{
                    min = min < temp ? min : temp;
                })
            })
        })
        console.log(min);
        return min
    }

    const max = ()=>{
        let max = 0;
        temperatures.forEach((week)=>{
            week.forEach((day)=>{
                day.forEach((temp)=>{
                    max = max > temp ? max : temp;
                })
            })
        })
        console.log(max);
        return max;
    }

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
            onClick={()=>{
                setCurrentValues({max: formData.max.value, min: formData.min.value})
                console.log("valores de form");
                console.log("maximo: " + formData.max.value + " y minimo: " + formData.min.value)
                console.log("valores de estado");
                console.log("maximo: " + currentValues.max+ " y minimo: " + currentValues.min)
                generateData()
            }}>
                Generar datos</Button>

            {isReady ? 
            <>
                <section className="flex flex-row flex-nowrap gap-10">
                    <span>Valor maximo: <strong>{currentValues.max} °C</strong></span>
                    <span>Valor minimo: <strong>{currentValues.min} °C</strong></span>
                </section>
                <table className="table-auto border-collapse">
                    <thead>
                        <tr><th className="py-2 px-4 bg-slate-200 border border-slate-600">Semanas</th>
                            <th className="py-2 px-4 bg-slate-200 border border-slate-600">Dias</th>
                            <th className="py-2 px-4 bg-slate-200 border border-slate-600">Temperatura 1 °C</th>
                            <th className="py-2 px-4 bg-slate-200 border border-slate-600">Temperatura 2 °C</th>
                            <th className="py-2 px-4 bg-slate-200 border border-slate-600">Media °C</th>
                            <th className="py-2 px-4 bg-slate-200 border border-slate-600">Excedió</th>
                        </tr>
                    </thead>
                    <tbody>
                        {temperatures.map((element, week)=>{
                                console.log(element)
                                return element.map((tempsDay, day)=>{
                                    console.log(tempsDay)
                                    return (
                                        <tr className=" 
                                            ">
                                            <td className="py-2 px-4 border
                                            border-slate-700">Semana {week + 1}</td>
                                            <td className="py-2 px-4 border
                                            border-slate-700">{diasSemana[day]}</td>
                                            <td className="py-2 px-4 border
                                            border-slate-700">{tempsDay[0]}</td>
                                            <td className="py-2 px-4 border
                                            border-slate-700">{tempsDay[1]}</td>
                                            <td className="py-2 px-4 border
                                            border-slate-700">{
                                                (tempsDay.reduce((acum, element)=>{
                                                return acum + element;
                                            }, 0))/tempsDay.length}</td>
                                            <td className="py-2 px-4 border
                                            border-slate-700">{tempsDay.some((element)=>{
                                                return (element < currentValues.min || element > currentValues.max)
                                            }) ? "SI" : 'NO'}</td>
                                        </tr>
                                    )
                                })
                            })}
                    </tbody>
                </table>
                <section className="flex flex-col flex-nowrap justify-start items-start gap-2">
                <h3 className="text-xl font-bold">Mas Info: </h3>
                {temperatures.map((days, index)=>{
                    let numberTemperatures = 0;
                    console.log(days)
                    return <span>Media Temperatures Semana {index + 1}: <span className="font-bold">
                            {(days.reduce((acum, element)=>{
                            return acum + element.reduce((acum, temp)=>{
                                numberTemperatures++;
                                return acum + temp
                            }, 0);
                        }, 0)) / numberTemperatures} °C</span> </span>
                })}
                
                <span>Temperatura Maxima: <span className="font-bold">{max()} °C</span></span>
                <span>Temperatura Minima: <span className="font-bold">{min()} °C</span> </span>
                </section>
                
            </> : 
            <>
            <img src={Image} alt="esperando datos"/>
            <p className="text-xl">Esperando datos...</p>
            </>}
        </main>
    )
}

export default Simulation;

