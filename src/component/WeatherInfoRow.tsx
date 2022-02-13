import React, { memo, useCallback, useState } from "react";
import { Divider, Image, Row, Col, message } from "antd";
import { ReloadOutlined, CloseOutlined } from "@ant-design/icons";
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
    const { description, icon } = weather[0];

    const [spin, setSpin] = useState(false);

    const onReloadClick = useCallback(() => {
      editRecord({ coord, id });
      setSpin(true);

      setTimeout(() => {
        setSpin(false);
        message.success("Reload complete!");
      }, 1000);
    }, [coord, editRecord, id]);

    const onDeleteClick = useCallback(() => {
      deleteRecord(id);
      message.success("City deleted!");
    }, [deleteRecord, id]);

    return (
      <Row align="middle" justify="space-between" key={id}>
        <Col span={4}>
          <h3>{value}</h3>
        </Col>

        <Col span={12}>
          <Image
            alt={description}
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            width={40}
            height={40}
            preview={false}
          />
          <p>{description}</p>
        </Col>

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
