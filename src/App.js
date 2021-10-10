import React, { useState, useEffect } from "react";
import "./App.css";
import { countriesApi, cityApi, statesApi } from "./ApiEndPoints";
//import getData from './GetData';
import axios from "axios";
import { Select } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [filterState, setFilterState] = useState([]);
  const [filterCity, setFilterCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedCity, setSelectedCity] = useState();

  useEffect(() => {
    setLoading(true);
    const getDataCountries = (ApiEndPoint) => {
      axios.get(ApiEndPoint).then((data) => {
        setCountries(data.data);
      });
    };
    const getDataState = (ApiEndPoint) => {
      axios.get(ApiEndPoint).then((data) => {
        setStates(data.data);
      });
    };
    const getDataCity = (ApiEndPoint) => {
      axios.get(ApiEndPoint).then((data) => {
        setCities(data.data);
      });
    };
    getDataCountries(countriesApi);
    getDataCity(cityApi);
    getDataState(statesApi);
    setLoading(false);
  }, []);

  const onCountryChange = (value) => {
    const data = selectedCountryId(value);
    const countryId = data.length > 0 ? data[0].id : null;
    countryId != null
      ? setSelectedCountry({ Country: value, Id: countryId })
      : setSelectedCountry({});
    filterStateFun(countryId); 
  };

  const onStateChange = (value) => {
    const data = selectedStateId(value);
    const stateId = data.length > 0 ? data[0].id : null;
    stateId != null
      ? setSelectedState({ State: value, Id: stateId })
      : setSelectedState({});
    filterCityFun(stateId);
  };

  const onCityChange = (value) => {
    setSelectedCity(value);
    console.log(value);
  };

  const filterCityFun = (stateId) => {
    const filterCityData = cities.filter((d) => d.state_id === stateId);
    setFilterCity(filterCityData);
  };

  const filterStateFun = (countryId) => {
    const filterStateData = states.filter((d) => d.country_id === countryId);
    setFilterState(filterStateData);
  };

  const selectedCountryId = (value) => countries.filter((d) => d.name === value);
  const selectedStateId = (value) => states.filter((d) => d.name === value); 

  const onFocus = (value) => console.log(value);
  const onBlur = (value) => console.log(value);

  return (
    <div className="App">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="App">
          <Select
            showSearch
            style={{ width: 600 }}
            placeholder="Select a country"
            onSearch={onCountryChange}
            onChange={onCountryChange}
            onFocus={onFocus}
            onBlur={onBlur}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {countries.map(function (country, i) {
              return (
                <Option value={country.name} key={country.id} id={country.id}>
                  {country.name}
                </Option>
              );
            })}
          </Select>
          {filterState.length > 0 && (
            <Select
              showSearch
              style={{ width: 600 }}
              placeholder="Select a State"
              onSearch={onStateChange}
              onChange={onStateChange}
              onFocus={onFocus}
              onBlur={onBlur}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {filterState.map(function (state, i) {
                return (
                  <Option value={state.name} key={state.id}>
                    {state.name}
                  </Option>
                );
              })}
            </Select>
          )}
          {filterCity.length > 0 && (
            <Select
              showSearch
              style={{ width: 600 }}
              placeholder="Select a City"
              onSearch={onCityChange}
              onChange={onCityChange}
              onFocus={onFocus}
              onBlur={onBlur}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {filterCity.map(function (state, i) {
                return (
                  <Option value={state.name} key={state.id}>
                    {state.name}
                  </Option>
                );
              })}
            </Select>
          )}
          {filterCity.length > 0 ? (
            <span>
              Selected Country: {selectedCountry.Country} <br /> Selected State: 
               {selectedState.State} <br />
              Selected City: {selectedCity}
            </span>
          ) : (
            <span></span>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
