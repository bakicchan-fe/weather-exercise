import React, { memo, useCallback, useState, useMemo } from "react";
import { Divider, Image, Row, Col, message } from "antd";
import {
  ReloadOutlined,
  CloseOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { GetWeatherParams, WeatherInfo } from "../types";
import "./WeatherInfoRow.styles.css";

interface WeatherInfoRowProps {
  weatherInfo: WeatherInfo;
  deleteRecord: (id: number) => void;
  editRecord: (params: GetWeatherParams) => void;
}

const WeatherInfoRow = memo(
  ({ weatherInfo, editRecord, deleteRecord }: WeatherInfoRowProps) => {
    const { value, id, weather, coord } = weatherInfo;

    const [spin, setSpin] = useState(false);

    const onReloadClick = useCallback(() => {
      editRecord({ coord, id, value });
      setSpin(true);

      setTimeout(() => {
        setSpin(false);
        if (weatherInfo.error) {
          message.warning(`Unable to reload data of ${value}`);
        } else {
          message.success("Reload complete!");
        }
      }, 1000);
    }, [coord, editRecord, id, value, weatherInfo.error]);

    const onDeleteClick = useCallback(() => {
      deleteRecord(id);
      message.success("City deleted!");
    }, [deleteRecord, id]);

    const renderWeatherInfo = useMemo(() => {
      if (weatherInfo.error) {
        return (
          <Col span={12}>
            <QuestionOutlined className="error-icon" />
            <p>Unable to fetch data</p>
          </Col>
        );
      } else {
        const { icon, description } = weather[0];
        return (
          <Col span={12}>
            <Image
              alt={description}
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              width={40}
              height={40}
              preview={false}
            />
            <p>{weather[0].description}</p>
          </Col>
        );
      }
    }, [weather, weatherInfo.error]);

    return (
      <Row align="middle" justify="space-between" key={id}>
        <Col span={4}>
          <h3>{value}</h3>
        </Col>

        {renderWeatherInfo}

        <Col>
          <ReloadOutlined
            spin={spin}
            className="icon margin-right-10"
            onClick={onReloadClick}
          />
          <CloseOutlined className="icon" onClick={onDeleteClick} />
        </Col>
        <Divider className="margin-top-10" dashed />
      </Row>
    );
  }
);

export default WeatherInfoRow;
