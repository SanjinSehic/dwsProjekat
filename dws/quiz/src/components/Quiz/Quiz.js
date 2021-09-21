import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: ["Prvo pitnaje", "dtrugo pitanje"],
            currentQ: 0,
            points: 0,
            ans: false,
            isDone: false
        }
    }

    nextQuestion = () => {

        if (this.state.currentQ + 1 >= this.state.questions.length) {
            alert("No more questions")
            this.setState({
                isDone: true,
            })
        } else {
            this.setState({
                currentQ: this.state.currentQ + 1
            })
        }
    }

    componentDidMount() {
        let self = this;
        axios.get("http://localhost:8000/quiz/getquestions", {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data.questions)
                self.setState({
                    questions: [...res.data.questions]
                })
            })
            .catch(err => {
                console.log(err)
                alert("Niste logovani")
                window.location.href ="http://localhost:3000/";
            })
    }

    handleRadioInput = (e) => {
        e.preventDefault();
        this.setState({
            ans: e.target.value
        })
    }

    handleAnswer = (e)=> {
        e.preventDefault()
        let a = this.state.questions[this.state.currentQ].question_answer
        console.log(this.state.ans, a.toString());
        if(this.state.ans == a.toString()) {
            this.setState({
                points: this.state.points + 1,
            }, () => this.nextQuestion());
        } else {
            this.nextQuestion()
        }
    } 

    render() {
        return (
            <div class = "quiz">
                {
                    this.state.isDone ? <Redirect to={`/score/${this.state.points}/${this.state.currentQ + 1}`} /> :
                <div>
                <h1>Quiz</h1>

                <h2>{this.state.questions[this.state.currentQ].question_text}</h2>
                <form onSubmit={this.handleAnswer}>
                    <label  style={{padding:"10px"}}>True</label>
                    <input type="radio" name="answer" value="true" onChange={this.handleRadioInput}/><br/>
                    <label  style={{padding:"10px"}}>False</label>
                    <input type="radio" name="answer" value="false" onChange={this.handleRadioInput} /><br/>
                    <input type="submit" value="Submit" className="btn btn-success" />
                </form>
                <br/>
                <button onClick={this.nextQuestion} className="btn btn-danger" >Next</button>
                </div>}
            </div>
        )
    }
}