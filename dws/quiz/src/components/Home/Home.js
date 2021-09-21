import React from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'

import './Home.css';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit= (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login/', { 
            username:this.state.username, password:this.state.password
        }).then(res =>{ 
            localStorage.setItem('token', res.data.key)
            window.location.href ="http://localhost:3000/quiz"
        }).catch(err =>{
            console.log(err)
        })
        
    }

    render(){
        return (
            <div class="login">
                <h1>Login</h1>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleChange} value={this.state.username} />
                    <br />
                    <input type="password" className="form-control" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <br/>
                    <input type="submit" value="Login" className="btn btn-primary" />
                </form>
                <br/>
                <p>Don't have account. <Link to="/register" className="btn btn-success">Register</Link></p>
                
                <a href="http://localhost:8000/admin" className="btn btn-danger">Go to admin</a>
            </div>
        )
    }
}