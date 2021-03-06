import React, { Component } from 'react';
// import throttle from "lodash";
import throttle  from 'lodash.throttle';

var classNames = require("classnames");


export class AutoComplete1 extends Component {

   constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      filteredCountries: [],
      showCountry: false,
      enteredValue: ""
    };
    this.fetchCountries = throttle(this.fetchCountries.bind(this), 2000);
  }

  onChange = e => {
    console.log(e);
    const enteredValue = e.currentTarget.value;
    this.setState(
      {
        filteredCountries:'',
        enteredValue
      },
      this.fetchCountries
    );
  };

  fetchCountries() {
    console.log('throttle')
    const { enteredValue } = this.state;
    if (!enteredValue) return;
    const url = `https://restcountries.eu/rest/v2/name/${enteredValue}`;
    console.info(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          filteredCountries: data.map(obj => obj.name),
          showCountry: true
        });
      })
      .catch(console.log);
  }

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

  eraseData = () => {
      this.setState({
          enteredValue: ''
      })
  }

  hideList = () => {
    this.setState({ showCountry: false });
  };

  render() {
    const { filteredCountries, enteredValue, showCountry } = this.state;
    let countryList;
    let listClass = classNames('dropdown-menu',  {'show' : showCountry});

    if (filteredCountries.length && enteredValue) {
      countryList = (
        <ul className={listClass}>
          {filteredCountries.map((country, index) => (
            <li key={index} onClick={this.onClick} className="dropdown-item">
              {country}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="search-container dropdown">
        <input
          ref={this.inputRef}
          // onChange={this.debounceEvent(this.onChange)}
          onChange={this.onChange}
          // onChange={e => this.onChange(e.currentTarget.value)}
          className="form-control"
          type="text"
          value={enteredValue}
          onBlur={this.hideList}
        />
        <button className='eraseButton' onClick={this.eraseData}>X</button>
        {countryList}
      </div>
    );
  }

}

export default AutoComplete1
