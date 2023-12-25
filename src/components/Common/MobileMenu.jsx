import React from "react";
import { Link } from "react-router-dom";

import { CalendarOutlined, TeamOutlined } from "@ant-design/icons";

const MobileNavigation = ({ stats }) => (
  <>
    <div className="ab-bottom-bar ab-page__ab-bottom-bar eb-calendar-page__bottom-bar">
      <Link
        to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}
        className="ab-icon-menu-item focus-outline nuxt-link-active ab-icon-menu-item--clip ab-icon-menu-item--active">
        <CalendarOutlined
          style={{ fontSize: "24px" }}
          className="ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip"
        />
        <span className="ab-icon-menu-item__text ab-icon-menu-item__text--highlight">
          Календарь
        </span>
      </Link>
      <Link
        to="clients"
        className="ab-icon-menu-item focus-outline ab-icon-menu-item--clip">
        <TeamOutlined
          style={{ fontSize: "24px" }}
          className="ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip"
        />
        <span className="ab-icon-menu-item__text ab-icon-menu-item__text--highlight">
          Клиенты
        </span>
      </Link>
    </div>
  </>
);

export default MobileNavigation;
