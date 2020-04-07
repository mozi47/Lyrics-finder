import React,{useContext,useState,useEffect} from 'react'
import {Context} from "../../context"
import Axios from "axios"

const Search = () => {
    const [state,setState]=useContext(Context)
    const[title,setTitle]=useState("")
    const[input,setInput]=useState("")

    useEffect(()=>{
    Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?
        q_track=${title}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res=>{
            setState({
                track_list:res.data.message.body.track_list,
                heading:"Search Results"
            })
        })
        .catch(err=>console.log(err))
    },[title])

    const findTrack=(e)=>{
        e.preventdefault()
        setTitle(input)
    }

    const onChange=(e)=>{
        setInput(e.target.value)
        //setTitle(e.target.value)
    }

    return (
        <div className="card my-4 py-3">
            <div className="card-body">
                <h1 className="text-center display-5">
                <i className="fas fa-music 3x"></i>
                &nbsp;Search For A Song</h1>
                <p className="lead text-center">Search for a song</p> 
                <form onSubmit={findTrack}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        placeholder="search a song title" 
                        className="form-control" 
                        name="input" 
                        value={input} 
                        onChange={onChange}/>
                    </div>
                    <button className="btn btn-dark btn-block" type="submit">Search Track Lyrics</button>
                </form>
            </div>
        </div>
    )
}

export default Search
