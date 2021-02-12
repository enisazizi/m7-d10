import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <div className="App">
     <Router>
     <Route
       path="/"
        exact 
         render={(props)=> <Home {...props}/>} 
      />

     </Router>
    </div>
  );
}

export default App;
