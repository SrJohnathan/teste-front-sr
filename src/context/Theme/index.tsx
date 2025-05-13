"use client"


import "beercss"
import "material-dynamic-colors";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import "../../app/globals.css";





interface ThemeProps {
    isDark: boolean
    toggleTheme?: () => void
    setColor: (color: string) => void
}

export const ThameContext = createContext<ThemeProps>({isDark: false, setColor: color => "none"})


const Theme = ({children}: { children: ReactNode }) => {


    const [isDark, setDark] = useState(false)


    const toggleTheme = () => {
        setDark((prevTheme) => {
            const newTheme = !prevTheme ? "dark" : "light";
            // @ts-ignore
            ui("mode", newTheme);
            localStorage.setItem("theme", newTheme);
            return !prevTheme;
        });
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")  ||  ui("mode") ;
        setDark(savedTheme === "dark");
        // @ts-ignore
        ui("mode", savedTheme as "light" | "dark");
    }, []);


    const setColor = async (color: string) => {
        const theme = await ui("theme", color);

    }


    return (
        <ThameContext.Provider value={{isDark, toggleTheme, setColor}}>


            {children}


        </ThameContext.Provider>
    )
}



const ColorButtonTheme = () => {

    const {setColor} = useContext(ThameContext)
    const [color, setColorLocal] = useState('#000000');
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [isCounting, setIsCounting] = useState(false);


    const guardarColorAPI = (color: string) => {
        // Lógica para salvar a cor na API
        console.log('Cor salva na API:', color);
    };


    const handleColorChange = (event: any) => {
        const newColor = event.target.value;
        setColorLocal(newColor);

        if (timeoutId) clearTimeout(timeoutId);

        setIsCounting(true);
        const newTimeoutId = setTimeout(() => {
            setColor(newColor);
            guardarColorAPI(newColor);
            setIsCounting(false);
        }, 3000);

        setTimeoutId(newTimeoutId);
    };

    return (
        <>
            {isCounting ? (<progress className="circle small"></progress>) : (<button className="circle">
                <i>palette</i>
                <input onChange={handleColorChange} type="color"/>
            </button>)}
        </>
    )

}


export {Theme, ColorButtonTheme}