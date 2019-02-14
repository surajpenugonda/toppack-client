import Autosuggest from 'react-autosuggest';

import React, { Component } from 'react';
import Axios from 'axios';

var languages = []

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  var url = 'http://localhost:3000/search/'+inputValue
    Axios.get(url).then((response)=>{
            languages = response.data;
    })
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.package_name.toLowerCase().slice(0, inputLength) === inputValue
  );
};


const getSuggestionValue = suggestion => suggestion.package_name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.package_name}
  </div>
);

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a reponame',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default SearchBar