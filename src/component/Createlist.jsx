import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Fab, Grow, TextField, Zoom } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';


const Createlist = () => {

    const [input, setInput] = useState({
        title:"",
        item:""
    });

    const [done, setDone] = useState(false);


    function changedata(event){

        const {name , value} = event.target
        
        setInput(prevalue => {
            return{
                ...prevalue,
                [name]: value
            } 
        })

    }
    
    

    function onadd(event){
        event.preventDefault();


        const data = {
            name: input.title,
            item: input.item

        }

        console.log(data);

        

        axios.post(`https://damp-lowlands-61238.herokuapp.com/create`, data)
        .then(res => {
                console.log("i got the data: ",res.status)
                console.log(res)
        }, (error) => {
            console.log(error)
        })

        setDone(true);
        

    }

    // 1.content[0]._id
    // console.log(input.item)

    return(
        <div>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
                >
                <div className="create-list">
                    <h1><strong>Create List</strong></h1>

                    <div className="text-field">
                        <label>Title</label><br></br>
                        <TextField onChange={changedata} autoComplete="off" type="text" name="title" value={input.title}></TextField><br></br>
                    </div>
                    
                    <div className="text-field">
                        <label>Add Item</label><br></br>
                        <TextField onChange={changedata} autoComplete="off" type="text" placeholder="Add least one item." name="item" value={input.item}></TextField>
                    </div>

                    <button className="add" onClick={onadd} type="submit">Add</button>
                    <Zoom in={done}>
                        <Link to={"/" + input.title}>
                            <Fab className="donebutton">
                                <DoneIcon/>
                            </Fab>
                        </Link>
                    </Zoom>
                </div>
            </Grow>
            

        </div>
    )
}

export default Createlist;