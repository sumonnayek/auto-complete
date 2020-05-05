import React, { Component } from "react";
export class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      filteredCountries: [],
      showCountry: false,
      enteredValue: ''
    };
  }
  
  onChange = e => {
    const enteredValue = e.currentTarget.value;
    if(enteredValue) {
      fetch(`https://restcountries.eu/rest/v2/name/${enteredValue}`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              filteredCountries: data.map(obj => obj.name),
              showCountry: true
            });
          })
          .catch(console.log);
      
    }
    
    this.setState({
      // filteredCountries,
      enteredValue,
      // showCountry: true
    });
  };
  
  componentDidMount() {
    this.inputRef.current.focus();
  }
  
  onClick = e => {
    this.setState({
      enteredValue: e.currentTarget.innerText,
      showCountry: false
    });
    // console.log(e.currentTarget.innerText)
  };
  
  hideList = () => {
    this.setState({showCountry: false});
  };
  
  render() {
    const { filteredCountries, enteredValue, showCountry } = this.state;
    let countryList;
    
    if (filteredCountries.length && enteredValue) {
      countryList = (
          <ul className={`dropdown-menu ${showCountry ? 'show' : ''}`}>
            {filteredCountries.map((country, index) => <li key={index} onClick={this.onClick} className="dropdown-item">{country}</li>)}
          </ul>
      );
    }
    
    return (
        <div className="search-container dropdown">
          <input
              ref={this.inputRef}
              onChange={this.onChange}
              className="form-control"
              type="text"
              value={enteredValue}/>
          {countryList}
        </div>
    );
  }
}

export default AutoComplete;
