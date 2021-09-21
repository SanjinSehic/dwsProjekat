import React, { Component } from 'react'

export default function Score(props) {
    console.log(props)
    return (
        <div>
            <h1>Your score is: {props.match.params.points}/{props.match.params.num}</h1>
            <button className="btn btn-danger" onClick={() => window.location.href="http://localhost:3000/quiz"}>Play again</button>
        </div>
    )
}