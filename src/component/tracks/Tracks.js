import React, { useContext,Fragment} from 'react'
import { Context } from '../../context'
import Spinner from "../layouts/Spinner"
import Track from "./Track"

const Tracks = () => {
    const [value]=useContext(Context)
    const {track_list,heading}=value

    if(track_list===undefined || track_list.length===0){
        return <Spinner/>
    }else{
    return (
    <Fragment>
        <h3 className="text-center my-5">{heading}</h3>
        <div className="row">
            {track_list.map(item=>(
                <Track key={item.track.track_id} track={item.track}/>       
            ))}
        </div>   
    </Fragment>
    )} 
}

export default Tracks