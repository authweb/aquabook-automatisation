import React from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import InputMask from 'react-input-mask';

const ModalForm = ({
  visible,
  onCancel,
  onOk,
  clientName,
  setClientName,
  email,
  setEmail,
  phone,
  setPhone,
  service,
  setService,
  categories,
  services,
  date,
  setDate,
  timeRange,
  setTimeRange,
  notes,
  setNotes,
}) => {
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk}>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
        style={{ padding: '30px' }}>
        <Form.Item label="Имя">
          <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Почта">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Телефон">
          <InputMask
            mask="+7 999 999 99 99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}>
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>
        <Form.Item label="Услуга">
          <Select value={service} onChange={(value) => setService(value)}>
            {categories.map((category) => (
              <Select.OptGroup label={category.name} key={category.id}>
                {services[category.id] &&
                  services[category.id].map((serviceItem) => (
                    <Select.Option key={serviceItem.id} value={serviceItem.name}>
                      {serviceItem.name}
                    </Select.Option>
                  ))}
              </Select.OptGroup>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Дата">
          <DatePicker value={date} onChange={(value) => setDate(value)} />
        </Form.Item>
        <Form.Item label="Время записи">
          <TimePicker.RangePicker
            format="HH:mm"
            minuteStep={15}
            value={timeRange}
            onChange={(value) => setTimeRange(value)}
          />
        </Form.Item>
        <Form.Item label="Примечания">
          <Input.TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
