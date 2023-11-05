import React from 'react';
import HeaderDashboard from '../Common/HeaderDashboard';
import CardEdit from '../Common/CardEdit';
import { Layout } from 'antd';
const { Sider } = Layout;
const AddAppointments = ({
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   // Собираем данные из состояния
    //   const profileData = {
    //     gender: currentValues.selectedValue,
    //     first_name: currentValues.firstName,
    //     last_name: currentValues.lastName,
    //     email: currentValues.email,
    //     phone: currentValues.phone,
    //     position: currentValues.position,
    //   };

    //   // Отправляем данные на сервер
    //   console.log(profileData);
    //   const response = await axios.put(
    //     `http://localhost:3001/api/profile/${users?.id}`,
    //     profileData,
    //   );

    //   // Обновляем информацию профиля пользователя
    //   updateProfileInfo(profileData);

    //   console.log('Profile updated successfully:', response.data);
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    // }
  };
  return (
    <div className="ab-page">
      <HeaderDashboard showBack title="Новая запись" containerSmall />
      <div className="ab-page__content">
        <div className="container-small">
          <form className="grid grid-cols-1 gap-8 items-start" onSubmit={handleSubmit}>
            <CardEdit general="Услуга" cardCalendar addService="Добавить услугу"></CardEdit>
            <CardEdit general="Клиент" cardClient addClient="Создать нового"></CardEdit>
          </form>
        </div>
      </div>
      <Sider className="eb-page-aside__aside" style={{ maxWidth: '375px' }}>
        <div className="eb-page-aside__content">
          <div className="grid grid-cols-1 gap-4 items-start">
            <div className="eb-booking-invoice">
              <h3 className="ab-headline">Итого</h3>
              <dl className="eb-booking-invoice__list">
                <dt>Сумма к оплате</dt>
                <dd>0 ₽</dd>
              </dl>
            </div>
            <div className="eb-booking-comlete mb-6">
              <span className="eb-booking-complete__icon eb-booking-complete__icon--default"></span>
              <div className="-mt-2">
                <button className="ab-sub-headline"></button>
              </div>
            </div>
          </div>
        </div>
        <div className="eb-page-aside__buttons"></div>
        {/* <CalendarNavigator /> */}
      </Sider>
    </div>
  );
};

export default AddAppointments;
