import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { AutoComplete } from "antd";
import { lowerCaseText } from "../utils";
import { City, WeatherInfo } from "../types";
import { connect } from "react-redux";
import { RootState } from "../app/store";
import { deleteRecord, retrieveWeather, storeWeather } from "../app/actions";
import WeatherInfoRow from "../component/WeatherInfoRow";
import { WeatherIcon } from "weather-react-icons";

interface AppProps {
  weatherData: Array<WeatherInfo>;
  storeWeather: (payload: any) => void;
  deleteRecord: (id: number) => void;
  retrieveWeather: (params: any) => void;
}

const App = ({ weatherData, retrieveWeather, deleteRecord }: AppProps) => {
  const cities = require("../data/cities.json");

  const [value, setValue] = useState<string>();
  const [cityOptions, setCityOptions] = useState(cities);

  useEffect(() => {
    // TODO: eliminare qui dall'array di città quelle già selezionate
    setCityOptions(cities);
  }, [weatherData]);

  const onSearchText = useCallback(
    (text: string) => {
      const filteredCities = cities.filter((city: City) =>
        lowerCaseText(city.value).startsWith(lowerCaseText(text))
      );

      setCityOptions(filteredCities);
    },
    [cities]
  );

  const getWeatherData = useCallback(
    (value: string, option: City) => {
      const { coord } = option;

      retrieveWeather(coord);
    },
    [retrieveWeather]
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Weather Info</h1>
        <WeatherIcon iconId={711} name="owm" />
      </header>
      <div className="options-container">
        <AutoComplete
          allowClear
          placeholder="Write or choose a city"
          options={cityOptions}
          value={value}
          className="margin-autocomplete"
          onSelect={(value: string, option: City) => {
            getWeatherData(value, option);
            setValue("");
          }}
          onChange={setValue}
          onSearch={onSearchText}
        />
        {weatherData.map((weatherInfo: WeatherInfo) => (
          <>
            <WeatherInfoRow
              weatherInfo={weatherInfo}
              deleteRecord={deleteRecord}
            />
          </>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ weatherData }: RootState) => ({
  weatherData,
});

const mapDispatchToProps = { retrieveWeather, storeWeather, deleteRecord };

export default connect(mapStateToProps, mapDispatchToProps)(App);
