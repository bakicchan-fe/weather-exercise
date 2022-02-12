import React, { useState, useCallback } from "react";
import "./App.css";
import { AutoComplete, Input } from "antd";
import { lowerCaseText, makeUrl } from "../utils";
import { City, WeatherInfo } from "../types";
import { ReloadOutlined, CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { deleteRecord, storeWeather } from "../app/actions";

interface AppProps {
  weatherData: Array<WeatherInfo>;
  storeWeather: (payload: any) => void;
  deleteRecord: (id: number) => void;
}

const App = ({ weatherData, storeWeather, deleteRecord }: AppProps) => {
  const cities = require("../data/cities.json");

  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cityOptions, setCityOptions] = useState(cities);

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
    async (value: string, option: City) => {
      const { coord } = option;

      return await axios
        .get(makeUrl(coord.lat, coord.lon))
        .then((res) => {
          const { id, coord, name } = res.data;
          storeWeather({ id, coord, name });
        })
        .catch((e) => console.log(e));
    },
    [storeWeather]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
      </header>
      <div className="options-container">
        <AutoComplete
          allowClear
          placeholder="Choose a city"
          options={cityOptions}
          value={value}
          style={{ width: 200 }}
          onSelect={getWeatherData}
          onChange={setValue}
          onSearch={onSearchText}
        />
        {weatherData.map((weatherCity: WeatherInfo) => (
          <Input
            value={weatherCity.name}
            suffix={
              <>
                <ReloadOutlined
                  spin={loading}
                  onClick={() => setLoading(!loading)}
                />
                <CloseOutlined onClick={() => deleteRecord(weatherCity.id)} />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ weatherData }: RootState) => ({
  weatherData,
});

const mapDispatchToProps = { storeWeather, deleteRecord };

export default connect(mapStateToProps, mapDispatchToProps)(App);
