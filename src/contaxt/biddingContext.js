import React,{ useState } from "react";

export const BiddingContext=React.createContext();


function SettingsProvider (props){
    const [product, setProduct] = useState({});
    const[timer,setTimer]= useState(90)
    const [lastPrice,setLastPrice]=useState(0)
    const[greeting,setGreeting]=useState('')
    
    const state = {
        product,
		setProduct,
        timer,
        setTimer,
        lastPrice,
        setLastPrice,
        greeting,
        setGreeting

    }
    return <BiddingContext.Provider value={state}>{props.children}</BiddingContext.Provider>

}

export default SettingsProvider;