import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Home from './Home/Home'
import highpackages from './HignPackages/highpackages'
import toprepo from './TopRepos/toprepo'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
      <Route exact path="/" component={Home}/>
      <Route path="/top_packages" component={highpackages}/>
      <Route path="/top_repos" component={toprepo}/>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
