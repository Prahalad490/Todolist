import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import Zoom from "@material-ui/core/Zoom"
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import Createlist from "./Createlist";
import CloseIcon from '@material-ui/icons/Close';
// import { Grow } from "@material-ui/core";


const Alllist = () => {

    const [lists, setList] = useState([]);
    const [listRender, setListRender] = useState(false);
    const [showCreator, setCreator] = useState(false);


    useEffect(() => {
        async function fetch(){
            await axios.get(`https://damp-lowlands-61238.herokuapp.com/`)
            .then(res => {
                console.log("i got the data: ",res.status)
                console.log("list: ", res)
                setList(res.data)
            }, (error) => {
                console.log(error)
            })
        }
        fetch()
        setListRender(false)
    },[listRender, setList]);


    function carddeletehandle(event){
        // console.log(event.target);
        const id = event.target.id
        axios.delete(`https://damp-lowlands-61238.herokuapp.com/${id}`)
        .then(res => {
            console.log("i got delete list: ",res.status)
        }, (error) => {
            console.log(error)
        })

        setListRender(true)

    }

    // function floatbutton(){
    //     setCreator(true)
    // }


    


    return (
        <div className="display-card">
            <div>
                {lists.map((list, index) => (
                    <Zoom key={list._id} id={list._id} in={true}>
                    <div className="card">
                    <div className="card-name">

                        <Link to="#" className="carddeletebutton" id={list._id} onClick={carddeletehandle}>
                            X
                        </Link>

                        <Link  id={list._id} className="list" to={"/" + list.name} key={index} >
                            <h3 key={index} id={index}><strong>{list.name}</strong></h3>
                            
                                <div>
                                    <ul>
                                        <li>
                                            <h5 key={list._id} id={list._id}>{list.content[0].item}</h5>
                                        </li>
                                    </ul>
                                    <p key={list._id} id={list._id}>Tap to open...</p>
                                </div>
                            
                        </Link>
                        </div>
                    </div>
                    </Zoom>
                ))}
            </div>

            {showCreator && <Createlist/>}
            
            {showCreator ? 
                <Fab className="addfloatbutton" onClick={() => {setCreator(false)}}>

                    <CloseIcon/>
                </Fab>
                :
                <Fab className="addfloatbutton" onClick={() => {setCreator(true)}}>
                    <AddIcon />
                </Fab>
            }
                
                
            
        </div>
    )
}

export default Alllist;