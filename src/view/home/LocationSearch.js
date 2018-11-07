import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest";

const MY_API_KEY = "AIzaSyDivy6ra4Ga9bQFI-ntdl1YYtT9Og4Bf7k"

export default class Welcome extends React.Component{
  constructor(props){
    super(props);
    this.state={
      search: "",
      value: "",
      rectangle: null,
    }
  }
   
  handleInputChange = e => {
    this.setState({search: e.target.value, value: e.target.value})
  }

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    const { j, l } = geocodedPrediction.geometry.viewport;
    const rectangle = {
      "topLeft": {
        "lat": l.l,
        "long": j.l
     },
     "bottomRight": {
        "lat": l.j,
        "long": j.j
     }}
    this.setState({search: "", value: geocodedPrediction.formatted_address, rectangle: rectangle }, () =>{
        const { onSearch } = this.props;
        const { rectangle, value } = this.state;
        const searchPayload = {
        bounds: { rectangle },
        searchString: value,
    }
    onSearch(searchPayload);
    })
  }
  handleSearch =() => {
    // const { onSearch } = this.props;
    // const { geometry, value } = this.state;
    // const searchPayload = {
    //     geometry,
    //     searchString: value,
    // }
    // onSearch(searchPayload);
  }
  render(){
  const { search, value } = this.state;

  return(

        <GoogleMapLoader
        params={{
            key: MY_API_KEY,
            libraries: "places,geocode",
        }}
        render={googleMaps => {

            return googleMaps && (
                <GooglePlacesSuggest
                    className="locationDropDown"
                    googleMaps={googleMaps}
                    autocompletionRequest={{
                        input: search,
                        // Optional options
                        // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                    }}
                    // Optional props
                    onSelectSuggest={(pre, org) => this.handleSelectSuggest(pre, org)}
                    textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                    customRender={prediction => (
                        <div className="customWrapper">
                            {prediction
                                ? prediction.description
                                : "please try nearby location"}
                        </div>
                    )}
                > 
                    <input
                        type="text"
                        value={value}
                        onBlur={this.handleSearch}
                        placeholder="Where ?"
                        onChange={this.handleInputChange}
                    />
                </GooglePlacesSuggest>
            )}
        }
          />
  )
        }
}
Welcome.propTypes= {
  onSearch: PropTypes.func.isRequired
}
