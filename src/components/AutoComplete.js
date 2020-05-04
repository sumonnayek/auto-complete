import React, { Component } from "react";

export class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredCountries: [],
      showCountry: false,
      enteredValue: ""
    };
  }

  onChange = e => {
    console.log("onChange");
    const enteredValue = e.currentTarget.value;
    console.log(enteredValue);

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

  render() {
    const { filteredCountries } = this.state;
    let countryList;

    if (filteredCountries) {
      countryList = (
        <ul className="listContainer">
          {filteredCountries.map(country => {
            return <li key={country}>{country}</li>;
          })}
        </ul>
      );
    }

    return (
      <>
        <div className="search-container">
          <input onChange={this.onChange} className="search-box1" type="text" />
        </div>
        {countryList}
      </>
    );
  }
}

export default AutoComplete;
