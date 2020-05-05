import React, { Component } from "react";

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
    // console.log("onChange");
    const enteredValue = e.currentTarget.value;
    // console.log(enteredValue);

    const filteredCountries = this.props.countries.filter(
      country =>
        country.toLowerCase().indexOf(enteredValue.toLowerCase()) !== -1
    );

    this.setState({
      filteredCountries,
      enteredValue,
      showCountry: true
    });
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onClick = (e) => {
    this.setState({
      enteredValue: e.currentTarget.innerText,
      showCountry: false
    })
    // console.log(e.currentTarget.innerText)
  }

  render() {
    const { filteredCountries, enteredValue, showCountry } = this.state;
    let countryList;

    if (filteredCountries && enteredValue) {
      countryList = (
        <ul className="listContainer">
          {filteredCountries.map(country => {
            return <li key={country} onClick={this.onClick}>{country}</li>;
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
