import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LogoutButton.css';




class LogoutButton extends Component {
 deleteSession = () => {
        axios.delete('/api/session')
        .then((response)=>{
            console.log(response)
        })
        console.log("로그아웃")
    }

    

    render(){
        return(
            <Link to ="/">
            <button className="BorderedButton" onClick={() => {
                axios.delete('/api/session')
                .then((response)=>{
                console.log(response)
                 })
                console.log("로그아웃")
                
                }}>
            로그아웃
             </button>
             </Link>
        )
    }
};

export default LogoutButton;