import React,{useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import { Fab } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const Specificlist = () => {

    const { name } = useParams();


    const [lists, setList] = useState([]);

    const [input, setinput] = useState("");

    const [show, setshow] = useState(false);

    const [showWarning, setWarning] = useState(false);

    const url = "https://damp-lowlands-61238.herokuapp.com/"+ name;


    useEffect(() => {
        async function fetch(){
            await axios.get(url)
            .then(res => {
                console.log("i got specific list: ",res.status)
                setList(res.data.content)
            }, (error) => {
                console.log(error)
            })
        }
        fetch()
        setshow(false)
    },[url, show]);
    

    function changehandler(event){
        setinput(event.target.value)
    }

    function clickhandler(){

        const data = {
            item: input
        }

        axios.post(url, data)
        .then(res => {
            console.log("i posted to specific list" + res.status)
            
        }, (error) => {
            console.log(error)
        })
        setinput("");
        setshow(true);
    
    }
    
    function itemclick(event){
        const id = event.target.id;
        const title = event.target.title;

        if (lists.length === 1){
            setWarning(true)
        }else{
        
            axios.delete(`https://damp-lowlands-61238.herokuapp.com/${title}/${id}`)
            .then(res => {
                console.log("i got specific list: ",res.status)
            }, (error) => {
                console.log(error)
            })

            setshow(true);
        }
    }

    function okhandle(){
        setWarning(false)
    }


    return (
        <div className="listbody">
            <Zoom in={true}>
                <div className="listbox">
                    <Link to="/">
                        <Fab className="backButton" >
                            <ArrowBackIosIcon/>
                        </Fab>
                    </Link>
                    <h2><strong>{name}</strong></h2>
                    {lists.map((list) => (
                        <ul key={list._id} id={list._id}>
                            <li>
                                <h5 key={list._id} id={list._id} title={name} onClick={itemclick}>{list.item}</h5>
                            </li>
                        </ul>
                    ))}

                    <div className="inputfield">
                        <div>
                            <TextField className="textfield" id="standard-basic" autoComplete="off" onChange={changehandler} name="additem" value={input} type="text" placeholder="Add item"/>
                        </div>
                        <div >
                            <button className="addbutton" onClick={clickhandler} type="button" >Add</button>
                        </div>
                        
                    </div>

                    
                </div>
            </Zoom>
            <Zoom in={showWarning}>
                
                <div className="warning-para">
                    <p>Please, go back and<br></br>tap "X" button<br></br>in each todolist card to<br></br>Delete each list.</p>
                    <button className="okbutton" type="button" onClick={okhandle}>OK</button>
                </div>
                
            </Zoom>
        </div>
    )
}

export default Specificlist;