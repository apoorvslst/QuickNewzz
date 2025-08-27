import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { Component } from 'react';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color="red"
        progress={this.state.progress}
      />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="general" country="us" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key="business" country="us" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" country="us" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={this.setProgress} key="general2" country="us" category="general" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} key="health" country="us" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} key="science" country="us" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" country="us" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
