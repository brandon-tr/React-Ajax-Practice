import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      nameError: "",
      valid: false,
      name: ""
    };
  }
  handleValidation = e => {
    this.setState({
      name: e.target.value
    });
    if (this.state.name === "") {
      this.setState({
        valid: false,
        nameError: "Name is required"
      });
    } else {
      this.setState({
        valid: true,
        nameError: ""
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .get(`http://www.omdbapi.com/?t=${this.state.name}&apikey=cd575159`)
      .then(data => {
        this.setState({ info: data }, () => {
          console.log(this.state.info);
        });
      })
      .catch(err => {
        this.setState({
          info: err
        });
      });
  };
  render() {
    const info = Object.keys(this.state.info).map((value, idx) => {
      return this.state.info[value].Response === "True" ? (
        <div key={idx}>
          <p>{this.state.info[value].Title}</p>
          <p>{this.state.info[value].Year}</p>
          <p>{this.state.info[value].Rated}</p>
          <p>{this.state.info[value].Released}</p>
        </div>
      ) : (
        <div key={idx}>
          <p>{this.state.info[value].Error}</p>
        </div>
      );
    });
    return (
      <div className="App">
        <p>Movie Name:</p>
        <form onChange={this.handleValidation} onSubmit={this.handleSubmit}>
          <input name="name" type="text" required value={this.state.name} />
          <button type="submit" disabled={!this.state.valid}>
            Submit
          </button>
        </form>
        <div>{info} </div>
      </div>
    );
  }
}

export default App;
