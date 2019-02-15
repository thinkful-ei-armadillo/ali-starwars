import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      htmlSearch: ''
    }
  }

  handleSearch = () => {
    debugger;
    const url = `https://swapi.co/api/people/?search=${this.state.searchTerm}`;
    fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else throw new Error('something went wrong') })
    .then(data => this.displayResults(data));
  }

  displayResults = (responseJson) => {
    let matchElements = '';
    for (let i = 0; i < responseJson.results.length; i++) {
    matchElements +=`<section className="result">${responseJson.results[i].name}</section>`
    }
    console.log(matchElements);
    this.setState({htmlSearch: matchElements})
    
}

  render() {
    return (
      <div className="App">
        <header className="swHeader">The Star Wars API Search</header>
          <form action="submit">
            <label htmlFor="swSearch">Enter Character Search Term</label>
            <input type="text" className="searchBox" name="swSearch" onChange={(e) => this.setState({searchTerm: e})} />
            <button type="submit" onSubmit={this.handleSearch} >Search Characters</button>
          </form>
          <div id="charResults">{this.state.htmlSearch}</div>
      </div>
    );
  }
}

export default App;
