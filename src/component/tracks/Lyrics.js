import React,{useState,useEffect,useContext} from 'react'
import Axios from "axios"
import Spinner from '../layouts/Spinner'
import {Link} from "react-router-dom"
import Moment from "react-moment"
import { Context } from '../../context'

const Lyrics = (props) => {
    const[track,setTrack]=useState({})
    const [lyrics, setLyrics] = useState({})
    
    useEffect(() => {
        Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?
        track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res=>{
            setLyrics({lyrics:res.data.message.body.lyrics})
            return Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?
            track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res=>{
                setTrack({track:res.data.message.body.track})
            })
        })
        .catch(err=>console.log(err))
    }, [props.match.params.id])

    if(track===undefined || lyrics===undefined || Object.keys(track).length===0 || Object.keys(lyrics).length===0){
        return <Spinner/>
    }else{
    return (
        <div className="container">
            <Link to="/" className="btn btn-dark my-4">GO BACK</Link>
            <div className="card">
                <div className="card-header">
                    <h5 className="text-uppercase">{track.track.track_name}<span className="text-secondary text-uppercase">&nbsp;by&nbsp;{track.track.artist_name}</span></h5>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Lyrics:</h4>
                    <p className="card-text content-justify">{lyrics.lyrics.lyrics_body}</p>
                </div>
            </div>
            <ul className="list-group my-3">
                    <li className="list-group-item">
                        <strong>Album Name:&nbsp;</strong>{track.track.album_name}
                    </li>
                    <li className="list-group-item">
                        <strong>Song Genre:&nbsp;</strong>
                        {track.track.primary_genres.music_genre_list.length!==0?track.track.primary_genres.music_genre_list[0].music_genre.music_genre_name:"N/A"}
                    </li>
                    <li className="list-group-item">
                        <strong>Song Rating:&nbsp;</strong>{track.track.track_rating}
                    </li>
                    <li className="list-group-item">
                        <strong>Lyrics Copyright:&nbsp;</strong>{lyrics.lyrics.lyrics_copyright.substring(18, 36)}
                    </li>
                    <li className="list-group-item">
                        <strong>Release Date:&nbsp;</strong><Moment format="DD/MM/YYYY">{lyrics.lyrics.updated_time}</Moment>
                    </li>
                </ul>
        </div>
    )}
}

export default Lyrics