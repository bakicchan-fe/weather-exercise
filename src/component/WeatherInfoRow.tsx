import React, { memo } from "react";
import { Divider, Image, Row, Col } from "antd";
import { ReloadOutlined, CloseOutlined } from "@ant-design/icons";
import { WeatherInfo } from "../types";
import "./WeatherInfoRow.styles.css";

interface WeatherInfoRowProps {
  weatherInfo: WeatherInfo;
  deleteRecord: (id: number) => void;
  //refreshRecord: (id: number) => void;
}

const WeatherInfoRow = memo(
  ({ weatherInfo, deleteRecord }: WeatherInfoRowProps) => {
    const { value, id, weather } = weatherInfo;
    const { description, icon } = weather[0];
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
          <ReloadOutlined className="icon margin-right-10" />
          <CloseOutlined className="icon" onClick={() => deleteRecord(id)} />
        </Col>
        <Divider className="margin-top-10" dashed />
      </Row>
    );
  }
);

export default WeatherInfoRow;
