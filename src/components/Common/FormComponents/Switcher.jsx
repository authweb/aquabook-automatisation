import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";

const Switcher = ({field_label}) => {
  return (
    <div className="ab-switch-field is-switcher fb-field ab-switch-field--md">
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
      />
      <label className="ab-switch-field__label">{field_label}</label>
    </div>
  );
};

export default Switcher;
