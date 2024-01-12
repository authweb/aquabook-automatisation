import React, { useState } from "react";
import { Statistic, Row, Col, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const AnalyticsHeader = ({
  onMonthChange,
  totalAppointments,
  totalCompleted,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    onMonthChange(
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    onMonthChange(
      currentMonth === 11 ? 0 : currentMonth + 1,
      currentMonth === 11 ? currentYear + 1 : currentYear
    );
  };

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Button onClick={handlePreviousMonth} icon={<LeftOutlined />} />
        </Col>
        <Col>
          <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        </Col>
        <Col>
          <Button onClick={handleNextMonth} icon={<RightOutlined />} />
        </Col>
        <Col>
          <Statistic
            title={<span style={{ color: "white" }}>Всего записей</span>}
            value={totalAppointments}
          />
        </Col>
        <Col>
          <Statistic
            title={<span style={{ color: "white" }}>Выполнено</span>}
            value={totalCompleted}
          />
        </Col>
      </Row>
    </>
  );
};

export default AnalyticsHeader;
