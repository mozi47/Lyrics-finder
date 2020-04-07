import React,{useState, createContext,useEffect} from 'react'
import Axios from "axios"

export const Context= createContext()
export const Provider = ({children}) => {
    let intialState = {
        track_list: [],
        heading: "",
    }
    
    const [state, setState] = useState(intialState)
    
    useEffect(() => {
        Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?
        chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res=>{
            //console.log(res.data)
            setState({
                track_list:res.data.message.body.track_list,
                heading:"Top 10 Tracks"
            })
        })
        .catch(err=>console.log(err))
    }, [])

    return (
        <Context.Provider value={[state,setState]}>
            {children}
        </Context.Provider>
    )
}
