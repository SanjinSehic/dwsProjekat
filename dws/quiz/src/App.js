import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import Register from './components/Register/Register';
import Score from './components/Score/Score';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/score/:points/:num" component={Score} />
      </Router>
      <br/><br/>
      {
        localStorage.getItem('token') ? <button onClick={() => {
          localStorage.clear()
          window.location.href = "http://localhost:3000/"
          }} className="btn btn-danger">Logout</button> : null
      }
    </div>
  );
}

export default App;
