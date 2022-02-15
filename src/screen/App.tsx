import React, { useState, useCallback, useEffect, useMemo } from "react";
import "./App.css";
import { AutoComplete, Empty } from "antd";
import { lowerCaseText } from "../utils";
import { City, GetWeatherParams, WeatherInfo } from "../types";
import { connect } from "react-redux";
import { RootState } from "../app/store";
import { editRecord, deleteRecord, retrieveWeather } from "../app/actions";
import WeatherInfoRow from "../component/WeatherInfoRow";

interface AppProps {
  weatherData: Array<WeatherInfo>;
  deleteRecord: (id: number) => void;
  retrieveWeather: (params: GetWeatherParams) => void;
  editRecord: (params: GetWeatherParams) => void;
}

const App = ({
  weatherData,
  retrieveWeather,
  editRecord,
  deleteRecord,
}: AppProps) => {
  const cities = require("../data/cities.json");

  const [value, setValue] = useState<string>();
  const [cityOptions, setCityOptions] = useState<City[]>([]);

  useEffect(() => {
    if (weatherData.length > 0) {
      const filteredList = cities.filter((city: any) => {
        return !weatherData.find((data) => data.id === city.id);
      });
      setCityOptions(filteredList);
    } else {
      setCityOptions(cities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const { coord, id } = option;

      const params = { coord, id, value };

      retrieveWeather(params);
    },
    [retrieveWeather]
  );

  const renderList = useMemo(() => {
    if (weatherData.length === 0) {
      return <Empty className="margin-top-50" />;
    } else {
      return weatherData.map((weatherInfo: WeatherInfo) => (
        <div key={weatherInfo.id}>
          <WeatherInfoRow
            weatherInfo={weatherInfo}
            deleteRecord={deleteRecord}
            editRecord={editRecord}
          />
        </div>
      ));
    }
  }, [deleteRecord, editRecord, weatherData]);

  const disabledAutocomplete = useMemo(
    () => weatherData.length === cities.length,
    [cities.length, weatherData.length]
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Weather Info</h1>
      </header>
      <div className="options-container">
        <AutoComplete
          disabled={disabledAutocomplete}
          allowClear
          placeholder={
            disabledAutocomplete
              ? "No city available"
              : "Write or choose a city"
          }
          options={cityOptions}
          value={value}
          className="autocomplete"
          onSelect={(value: string, option: City) => {
            getWeatherData(value, option);
            setValue("");
          }}
          onChange={setValue}
          onSearch={onSearchText}
        />
        {renderList}
      </div>
    </div>
  );
};

const mapStateToProps = ({ weatherData }: RootState) => ({
  weatherData,
});

const mapDispatchToProps = { retrieveWeather, editRecord, deleteRecord };

export default connect(mapStateToProps, mapDispatchToProps)(App);
