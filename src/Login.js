import React from 'react';
import styles from './Login.css';

const Login =()=>{
return(
    <div class="container auth">
        <a class="logo">MacGuffin</a>
        <div class="card">
            <div class="header blue white-text center">
                <div class="card-content">LOGIN</div>
            </div>
            <div class="card-content">
                <div class="row">
                    
                    <div class="input-field col s12 username">
                        <label>Username</label>
                        <input
                        name="username"
                        type="text"
                        class="validate"/>
                    </div>
                    <div class="input-field col s12">
                        <label>Password</label>
                        <input
                        name="password"
                        type="password"
                        class="validate"/>
                    </div>
                    <a class="waves-effect waves-light btn">SUBMIT</a>
                </div>
            </div>
            
            
            <div class="footer">
                <div class="card-content">
                    <div class="right" >
                        New Here? <a>Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;