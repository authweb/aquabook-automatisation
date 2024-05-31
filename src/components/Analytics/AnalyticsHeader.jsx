import React, { useState } from "react";
import { Statistic, Button } from "antd";
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
    <div className="grid grid-cols-1 md:grid-cols-3 items-center py-4">
      <div className="flex items-center justify-center md:justify-start space-x-2">
        <Button onClick={handlePreviousMonth} icon={<LeftOutlined />} />
        <h2 className="text-lg md:text-xl text-center md:text-left">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <Button onClick={handleNextMonth} icon={<RightOutlined />} />
      </div>
      <div className="col-span-2 flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
        <Statistic
          title={<span className="text-white">Всего записей</span>}
          value={totalAppointments}
          className="text-center"
        />
        <Statistic
          title={<span className="text-white">Выполнено</span>}
          value={totalCompleted}
          className="text-center"
        />
      </div>
    </div>
  );
};

export default AnalyticsHeader;
