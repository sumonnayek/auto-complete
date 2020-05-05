import React, { Component } from "react";
import {DebounceInput} from 'react-debounce-input';
export class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      filteredCountries: [],
      showCountry: false,
      enteredValue: ""
    };
  }

  onChange = e => {
    const enteredValue = e.currentTarget.value;
    let countryList = [];

    if(enteredValue) {
      fetch(`https://restcountries.eu/rest/v2/name/${enteredValue}`)
      .then(response => response.json())
      .then(data => {
        let countries = data.map( (obj, index)=> {
          countryList[index] = obj.name;
          return countryList;
        })
        console.log(countries)
        // const filteredCountries = countries[0].filter(
        //   country =>
        //     country.toLowerCase().indexOf(enteredValue.toLowerCase()) !== -1
        // );
        this.setState({
          filteredCountries: countries[0],
          // enteredValue,
          showCountry: true
        });
        // console.log(filteredCountries)
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

  render() {
    const { filteredCountries, enteredValue, showCountry } = this.state;
    let countryList;

    if (filteredCountries && showCountry && enteredValue) {
      countryList = (
        <ul className="listContainer">
          {filteredCountries.map((country, index) => {
            return (
              <li key={index} onClick={this.onClick}>
                {country}
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <>
        <div className="search-container">
          <input
            ref={this.inputRef}
            onChange={this.onChange}
            className="search-box1"
            type="text"
            value={enteredValue}
          />
        </div>
        {countryList}
      </>
    );
  }
}

export default AutoComplete;
