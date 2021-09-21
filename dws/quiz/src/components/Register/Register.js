import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Register.css';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit= (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/registration/', {
            username: this.state.username,
            password2: this.state.password2,
            email: this.state.email,
            password1: this.state.password,
        
        }).then(res =>{
            alert('Registered success')
            window.location.href = "http://localhost:3000"
        }).catch(err =>{
            console.log(err)
        })
        
    }

    render(){
        return (
            <div class="register">
                <h1>Register</h1>

                <form onSubmit={this.handleSubmit}>
                    <input type="email" className="form-control" value={this.state.email} placeholder="email" name="email" onChange={this.handleChange} />
                    <br/>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleChange} value={this.state.username} />
                    <br/><input type="password" className="form-control" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <br/><input type="password" className="form-control" placeholder="password2" name="password2" onChange={this.handleChange} value={this.state.password2} />
                    <br/><input type="submit" value="Register" className="btn btn-primary" />
                </form>
                <br/>
                <p>Do have account. <Link to="/" className="btn btn-success">Login</Link></p>
            </div>
        )
    }
}